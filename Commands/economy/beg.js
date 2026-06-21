/**
 * Beg — Plead for celestial favor.
 */
const { economy, CURRENCY, SYMBOL, formatTime } = require('../../utils/economyManager');
const cloud = require('../../utils/cloudEconomy');
const { renderEarningsCard } = require('../../utils/canvasRender');

const RESPONSES = [
    { giver: 'A celestial traveler',   msg: 'cast a blessing upon you' },
    { giver: 'A divine spirit',        msg: 'bestowed a small favor' },
    { giver: 'The Lotus Prince',       msg: 'noticed your dedication' },
    { giver: 'A guardian deity',       msg: 'tossed a golden petal' },
    { giver: 'A wandering monk',       msg: 'shared his alms' },
    { giver: 'The heavens',            msg: 'ignored your plea… you got nothing' },
    { giver: 'A mythical creature',    msg: 'dropped a treasure' },
    { giver: 'The Nezha Bot',          msg: 'took pity on your plight' },
];

module.exports = {
    name: 'beg',
    aliases: ['plead'],
    description: 'Plead for spare Celestial Credits',
    category: 'economy',
    async execute({ sock, msg, sender, reply }) {
        const cd = economy.checkCooldown(sender, 'beg');
        if (cd.onCooldown) {
            return reply(`⏰ *Patience, Mortal!*\n\n⏳ The celestial gates open again in *${formatTime(cd.remaining)}*`);
        }
        
        const resp = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
        economy.setCooldown(sender, 'beg');

        const amount = resp.giver === 'The heavens' ? 0 : Math.floor(Math.random() * 451) + 50;
        if (amount > 0) economy.addWallet(sender, amount);

        let walletAfter = economy.getBalance(sender).wallet;
        try {
            const uid = await cloud.getUserIdByWa(cloud.waNumber(sender));
            if (uid && amount > 0) {
                const w = await cloud.getWallet(uid);
                const next = w.wallet + amount;
                await cloud.updateWallet(uid, { wallet: next, total_earned: w.total_earned + amount });
                await cloud.logTx(uid, 'beg', amount, { giver: resp.giver });
                walletAfter = next;
            }
        } catch (_) {}

        const remoteJid = msg.key.remoteJid;
        try {
            const buf = await renderEarningsCard({
                title:    'PLEADING',
                subtitle: `${resp.giver} ${resp.msg}`,
                amount,
                walletAfter,
                accent: amount > 0 ? '#f59e0b' : '#6b7280',
            });
            await sock.sendMessage(remoteJid, {
                image: buf,
                caption: `🙏 *${resp.giver}* ${resp.msg}${amount > 0 ? `\n${SYMBOL} +${amount.toLocaleString()} ${CURRENCY}` : ''}`,
            }, { quoted: msg });
        } catch (e) {
            reply(`🙏 *${resp.giver}* ${resp.msg}${amount > 0 ? `\n\n${SYMBOL} +*${amount.toLocaleString()} ${CURRENCY}*` : ''}`);
        }
    },
};
