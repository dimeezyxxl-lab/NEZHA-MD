/**
 * Work — Perform celestial labor to earn essence.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');
const cloud = require('../../utils/cloudEconomy');
const { renderEarningsCard } = require('../../utils/canvasRender');

const JOBS = [
    { title: '👨‍🍳 Celestial Chef', msg: 'You prepared a feast for the immortals' },
    { title: '💻 Divine Architect', msg: 'You re-coded the fabric of reality' },
    { title: '🧹 Spirit Janitor', msg: 'You purified the sacred halls' },
    { title: '🎨 Cosmic Artist', msg: 'You painted the stars in the void' },
    { title: '🚗 Cloud Carriage Driver', msg: 'You ferried spirits across the firmament' },
    { title: '📦 Astral Delivery', msg: 'You transported artifacts through dimensions' },
    { title: '🎤 Celestial Bard', msg: 'You sang a melody that shook the heavens' },
    { title: '🧑‍🔬 Alchemist', msg: 'You synthesized a rare elixir' },
    { title: '🎬 Spirit Actor', msg: 'You performed a drama for the Jade Emperor' },
    { title: '🏗️ Celestial Builder', msg: 'You raised a palace in the clouds' },
    { title: '🧑‍🚀 Star Voyager', msg: 'You navigated the celestial currents' },
    { title: '🎮 Immortal Streamer', msg: 'Your exploits were broadcast across all realms' },
    { title: '🍕 Ambrosia Delivery', msg: 'You delivered nectar in record time' },
    { title: '💈 Celestial Barber', msg: 'You trimmed the beards of ancient sages' },
];

module.exports = {
    name: 'work',
    aliases: ['job', 'labor', 'toil'],
    description: 'Perform celestial labor to earn credits',
    category: 'economy',
    async execute({ sock, m, sender, reply }) {
        const cd = economy.checkCooldown(sender, 'work');
        if (cd.onCooldown) {
            return reply(`⏰ *Divine Fatigue*\n\nYou are weary from your toil. Rest for *${formatTime(cd.remaining)}* before serving again.`);
        }

        const job = JOBS[Math.floor(Math.random() * JOBS.length)];
        let amount = Math.floor(Math.random() * 1301) + 200;
        if (economy.hasActiveEffect(sender, 'xpbooster')) amount *= 2;

        // Update local economy
        economy.addWallet(sender, amount);
        economy.setCooldown(sender, 'work');

        // Mirror to cloud if linked
        let walletAfter = economy.getBalance(sender).wallet;
        try {
            const uid = await cloud.getUserIdByWa(cloud.waNumber(sender));
            if (uid) {
                const w = await cloud.getWallet(uid);
                const next = w.wallet + amount;
                await cloud.updateWallet(uid, { wallet: next, total_earned: w.total_earned + amount });
                await cloud.logTx(uid, 'work', amount, { job: job.title });
                walletAfter = next;
            }
        } catch (_) {}

        try {
            const buf = await renderEarningsCard({
                title:    `LABOR · ${job.title.replace(/[^\w\s]/g, '').trim().toUpperCase()}`,
                subtitle: job.msg,
                amount,
                walletAfter,
                accent: '#eab308',
            });
            await sock.sendMessage(m.key.remoteJid, {
                image: buf,
                caption: `${job.title}\n${job.msg} — *+${amount.toLocaleString()} ${CURRENCY}* ${SYMBOL}`,
            }, { quoted: m });
        } catch (e) {
            reply(`${job.title}\n\n${job.msg} and earned *${amount.toLocaleString()} ${CURRENCY}*! ${SYMBOL}\n\n👛 Wallet: *${walletAfter.toLocaleString()}*`);
        }
    },
};
