/**
 * Leaderboard — The Pantheon of Celestial Wealth.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb', 'richlist', 'pantheon'],
    description: 'View the wealthiest mortals in the celestial realm',
    category: 'economy',
    async execute({ sock, msg, from, reply }) {
        try {
            const lb = economy.getLeaderboard(10);
            if (!lb.length) {
                return reply(
                    `💰 *Celestial Pantheon*\n\n` +
                    `The heavens remain empty. Start earning your tribute with \`.daily\`, \`.work\`, or \`.fish\`!`
                );
            }
            
            const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
            const mentions = lb.map(e => `${e.id.split('@')[0]}@s.whatsapp.net`);
            
            const list = lb.map((p, i) => {
                const num = p.id.split('@')[0];
                return `${medals[i]} @${num}\n   ${SYMBOL} ${p.total.toLocaleString()} ${CURRENCY}`;
            }).join('\n\n');
            
            await sock.sendMessage(from, {
                text: `🏆 *The Celestial Pantheon*\n\n${list}\n\n_Rankings represent total wealth (Wallet + Vault)._`,
                mentions,
            }, { quoted: msg });
            
        } catch (e) {
            console.error('[leaderboard]', e.message);
            reply(`💰 *Pantheon*\n\nThe celestial records are currently being compiled. Use \`.balance\` to view your own standing!`);
        }
    }
};
