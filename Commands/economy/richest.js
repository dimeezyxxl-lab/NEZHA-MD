/**
 * Richest — Display the Celestial Rankings of mortal wealth.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'richest',
    aliases: ['rich', 'top', 'rankings'],
    description: 'View the 10 wealthiest mortals in the celestial realm',
    category: 'economy',
    async execute({ sock, msg, from, reply }) {
        const lb = economy.getLeaderboard(10);
        if (!lb.length) {
            return reply(
                `🏆 *Celestial Rankings*\n\n` +
                `_The heavens are still quiet. None have yet accumulated ${CURRENCY} tribute._`
            );
        }
        
        const medals = ['🥇', '🥈', '🥉'];
        const mentions = lb.map(e => `${e.id.split('@')[0]}@s.whatsapp.net`);
        
        let text = `🏆 *CELESTIAL RANKINGS* 🏆\n━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        lb.forEach((e, i) => {
            const medal = medals[i] || `#${i + 1}`;
            const num   = e.id.split('@')[0];
            text += `${medal} @${num} — *${e.total.toLocaleString()} ${CURRENCY}*\n`;
        });
        
        text += `\n━━━━━━━━━━━━━━━━━━━━━\n_Continue your cultivation to ascend the rankings!_ 💪`;
        
        await sock.sendMessage(from, { text, mentions }, { quoted: msg });
    }
};
