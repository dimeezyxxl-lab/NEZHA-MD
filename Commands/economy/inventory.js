/**
 * Inventory — Behold the contents of your celestial satchel.
 */
const { economy, SHOP_ITEMS } = require('../../utils/economyManager');

module.exports = {
    name: 'inventory',
    aliases: ['inv', 'items', 'backpack', 'satchel'],
    description: 'View the items held within your celestial satchel',
    category: 'economy',
    async execute({ reply, sender }) {
        const inv = economy.getInventory(sender);
        const entries = Object.entries(inv).filter(([,q]) => q > 0);
        
        if (entries.length === 0) {
            return reply(
                `🎒 *CELESTIAL SATCHEL*\n\n` +
                `_Your satchel is currently empty. Visit \`.shop\` to acquire divine artifacts._`
            );
        }
        
        let text = `🎒 *YOUR CELESTIAL SATCHEL*\n\n`;
        for (const [id, qty] of entries) {
            const item = SHOP_ITEMS[id];
            text += `${item ? item.name : id} — x${qty}\n`;
        }
        
        text += `\n_Use \`.use <item_id>\` to invoke an artifact's power!_`;
        reply(text);
    }
};
