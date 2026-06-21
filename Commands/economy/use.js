/**
 * Use — Invoke the power of a celestial artifact.
 */
const { economy } = require('../../utils/economyManager');

module.exports = {
    name: 'use',
    aliases: ['activate', 'invoke', 'channel'],
    description: 'Channel the power of an artifact from your inventory',
    category: 'economy',
    async execute({ reply, sender, args }) {
        const itemId = (args[0] || '').toLowerCase();
        
        if (!itemId) {
            return reply(
                `❌ *Celestial Invocation*\n\n` +
                `Usage: \`.use <item_id>\`\n\n` +
                `Consult your \`.inventory\` to see which artifacts are ready for use.`
            );
        }
        
        const r = economy.useItem(sender, itemId);
        if (!r.success) {
            return reply(`❌ *Invocation Failed:*\n${r.reason}`);
        }
        
        reply(
            `✅ *ARTIFACT INVOKED!*\n\n` +
            `*${r.item.name}*\n` +
            `📝 ${r.item.description}\n\n` +
            `${r.item.duration > 0 ? `⏱️ Divine blessing active for *${Math.round(r.item.duration / 60000)} minutes*` : '🎯 Effect materialized!'}`
        );
    }
};
