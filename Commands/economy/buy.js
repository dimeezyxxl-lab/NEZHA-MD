/**
 * Buy — Acquire items from the Celestial Emporium.
 */
const { economy, CURRENCY, SYMBOL } = require('../../utils/economyManager');

module.exports = {
    name: 'buy',
    aliases: ['purchase'],
    description: 'Purchase an artifact from the shop',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const itemId = (args[0] || '').toLowerCase();
        
        if (!itemId) {
            return reply(
                `❌ *Celestial Emporium*\n\n` +
                `Usage: \`.buy <item_id>\`\n` +
                `Check \`.shop\` to see what the Lotus Prince has in stock!`
            );
        }
        
        const r = economy.buyItem(sender, itemId);
        
        if (!r.success) {
            return reply(`❌ A disturbance: ${r.reason}`);
        }
        
        reply(
            `✅ *ARTIFACT ACQUIRED!*\n\n` +
            `*Item:* ${r.item.name}\n` +
            `${SYMBOL} -*${r.item.price.toLocaleString()} ${CURRENCY}*\n\n` +
            `👛 Remaining Wallet: *${r.remaining.toLocaleString()}*\n\n` +
            `_Invoke it with \`.use ${itemId}\` when you are prepared._`
        );
    }
};
