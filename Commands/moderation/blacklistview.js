/**
 * BlacklistView — Consult the Scroll of Forbidden Echoes
 * Usage: .blacklistview
 */
const database = require('../../utils/database');

module.exports = {
    name: 'blacklistview',
    aliases: ['viewblacklist', 'listblacklist', 'scroll', 'forbidden'],
    description: 'Consult the Scroll of Forbidden Echoes to see what is banished.',
    category: 'moderation',
    async execute({ reply, from, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        const list = database.getGroupData(from, 'blacklist') || [];
        if (!list.length) {
            return reply(
                '📜 *SCROLL OF FORBIDDEN ECHOES*\n\n' +
                '_The scroll is empty; no words are currently banished from the sanctuary._\n\n' +
                'Invoke the Profanity Seal with: `.blacklist <word>`'
            );
        }
        
        const words = list.map((w,i) => `${i+1}. \`${w}\``).join('\n');
        
        reply(
            `📜 *FORBIDDEN ECHOES* (${list.length})\n\n` +
            `${words}\n\n` +
            `_To release a word from the seal: .unblacklist <word>_\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
