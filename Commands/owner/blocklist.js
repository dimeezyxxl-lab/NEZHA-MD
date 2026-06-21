/**
 * Blocklist — Consult the Scroll of the Banished
 * Usage: .blocklist
 */
const database = require('../../utils/database');

module.exports = {
    name: 'blocklist',
    aliases: ['banned', 'bannedlist', 'scroll', 'banished'],
    description: 'Consult the Scroll of the Banished (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ reply }) {
        const banned = database.getBannedUsers ? database.getBannedUsers() : [];
        
        if (!banned || !banned.length) {
            return reply('📜 *SCROLL OF THE BANISHED*\n\n_The scroll is empty; no souls have been cast out from this sanctuary._');
        }
        
        const list = banned.map((u, i) => `${i+1}. +${u.replace('@s.whatsapp.net','')}`).join('\n');
        
        reply(
            `🚫 *SCROLL OF THE BANISHED*\n\n` +
            `${list}\n\n` +
            `Total souls cast out: *${banned.length}*\n\n` +
            `_Use .unban <number> to grant absolution._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
