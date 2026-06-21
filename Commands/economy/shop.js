/**
 * Shop — Browse the Celestial Market of rare artifacts.
 */
const { economy, CURRENCY, SYMBOL, SHOP_ITEMS } = require('../../utils/economyManager');

module.exports = {
    name: 'shop',
    aliases: ['store', 'market', 'emporium'],
    description: 'Browse the Celestial Market for rare artifacts',
    category: 'economy',
    async execute({ reply, sender }) {
        let text = `🛒 *C E L E S T I A L   M A R K E T* 🛒\n\n`;
        let i = 1;
        
        for (const [id, item] of Object.entries(SHOP_ITEMS)) {
            text += `*${i}.* ${item.name}\n   ${SYMBOL} Price: *${item.price.toLocaleString()}*\n   📝 ${item.description}\n   🔑 ID: \`${id}\`\n\n`;
            i++;
        }
        
        text += `━━━━━━━━━━━━━━━━━━━━━\n👛 Your Wallet: *${economy.getBalance(sender).wallet.toLocaleString()} ${CURRENCY}*\n\n_Use \`.buy <item_id>\` to acquire these artifacts!_`;
        reply(text);
    }
};
