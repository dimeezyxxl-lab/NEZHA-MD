/**
 * Taxes — View celestial fiscal guidance and cultivation tips.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'taxes',
    aliases: ['tax', 'taxtip', 'fiscal', 'guidance'],
    description: 'View your fiscal status and celestial cultivation tips',
    category: 'economy',
    async execute({ reply, sender }) {
        const bal = economy.getBalance(sender);
        const total = (bal.wallet || 0) + (bal.bank || 0);
        
        reply(
            `🏛️ *Celestial Fiscal Guidance*\n\n` +
            `💰 Your Net Essence: *${total.toLocaleString()} ${CURRENCY}*\n\n` +
            `📊 *Cultivation Tips*\n` +
            `• Secure your wealth in the 🏦 Vault to accumulate interest.\n` +
            `• Do not carry too much essence in your pocket — thieves lurk in the shadows.\n` +
            `• Cultivate daily via \`.daily\`, \`.work\`, \`.fish\`, \`.mine\`, and \`.hunt\`.\n` +
            `• Seek fortune at the \`.spin\` wheel every 4 hours.\n` +
            `• Test your destiny with \`.slots\` and the \`.roulette\` wheel.\n` +
            `• Use \`.deposit\` to safeguard your resources.\n\n` +
            `💡 *Celestial Tiers*\n` +
            `🥉 Mortal: 0 – 4,999\n` +
            `🔵 Ascendant: 5,000 – 19,999\n` +
            `🥈 Immortal Spirit: 20,000 – 49,999\n` +
            `🥇 Divine Archon: 50,000 – 99,999\n` +
            `💎 Celestial Sovereign: 100,000+`
        );
    }
};
