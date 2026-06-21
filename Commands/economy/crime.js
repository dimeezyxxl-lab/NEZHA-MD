/**
 * Crime — Risk your karma for celestial gains.
 */
const cloud = require('../../utils/cloudEconomy');
const { renderCrimeCard } = require('../../utils/canvasRender');

module.exports = {
    name: 'crime',
    aliases: ['felony', 'risk'],
    description: 'Perform a risky act for potential rewards (canvas card)',
    category: 'economy',
    async execute({ sock, msg, sender, reply, args }) {
        const id = (args[0] || '').toLowerCase();
        
        if (!id) {
            let msg = `🔪 *CELESTIAL RISKS — Choose your path*\n\n`;
            for (const [k, c] of Object.entries(cloud.CRIMES)) {
                const rate = Math.round(c.successRate * 100);
                const cdMin = Math.round((c.cooldownMs || c.cooldownMin * 60000) / 60000);
                msg += `${c.emoji} *${c.name}* (\`${k}\`)\nReward: ${c.minPayout.toLocaleString()}–${c.maxPayout.toLocaleString()} | Penalty: ${c.fine.toLocaleString()} | ${rate}% • CD ${cdMin}m\n\n`;
            }
            return reply(msg);
        }
        
        const crime = cloud.CRIMES[id];
        if (!crime) return reply(`❌ That path does not exist.`);
        
        const linked = await cloud.requireLinked(sender, reply);
        if (!linked) return;

        const cdMs = crime.cooldownMs || crime.cooldownMin * 60000;
        const cds = await cloud.getCooldowns(linked.uid);
        const last = cds[`crime_${id}`];
        
        if (last && Date.now() - last < cdMs) {
            const left = Math.ceil((cdMs - (Date.now() - last)) / 60000);
            return reply(`⏳ Awaiting celestial judgment: ${left}m remaining.`);
        }

        const ps = await cloud.getPlayerState(linked.uid);
        const inVoid = ps.location === 'void'; // Rebranded from 'malevolent'
        const success = Math.random() < crime.successRate;
        const w = await cloud.getWallet(linked.uid);

        let payout = 0, fine = 0, walletAfter = w.wallet;
        
        if (success) {
            payout = Math.floor(crime.minPayout + Math.random() * (crime.maxPayout - crime.minPayout));
            if (inVoid) payout *= 2;
            walletAfter = w.wallet + payout;
            await cloud.updateWallet(linked.uid, { wallet: walletAfter, total_earned: w.total_earned + payout });
        } else {
            fine = inVoid ? Math.floor(crime.fine * 1.5) : crime.fine;
            const lost = Math.min(fine, w.wallet);
            fine = lost;
            walletAfter = w.wallet - lost;
            await cloud.updateWallet(linked.uid, { wallet: walletAfter });
        }

        await cloud.logCrime(linked.uid, id, success, payout, success ? 0 : fine);
        await cloud.setCooldown(linked.uid, `crime_${id}`);
        await cloud.logTx(linked.uid, `crime_${id}_${success ? 'win' : 'fail'}`, success ? payout : -fine, { crime: id });

        try {
            const buf = await renderCrimeCard({
                name: crime.name,
                emoji: crime.emoji,
                success,
                payout,
                fine,
                walletAfter,
            });
            await sock.sendMessage(msg.key.remoteJid, {
                image: buf,
                caption: success
                    ? `${crime.emoji} *${crime.name}* — *The heavens favor you!*\n+${cloud.SYMBOL} ${payout.toLocaleString()}`
                    : `🚔 *${crime.name}* — *Caught by the celestial guards!*\n-${cloud.SYMBOL} ${fine.toLocaleString()}`,
            }, { quoted: msg });
        } catch (e) {
            reply(success
                ? `${crime.emoji} *Success! Divine favor granted.*\n+${cloud.SYMBOL} ${payout.toLocaleString()}`
                : `🚔 *Caught! You must answer for your trespass.*\n-${cloud.SYMBOL} ${fine.toLocaleString()}`);
        }
    },
};
