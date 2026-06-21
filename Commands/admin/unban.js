/**
 * Unban Command — Revoke a ban on a user
 */
const database = require('../../utils/database');

module.exports = {
    name: 'unban',
    aliases: ['unblockuser'],
    description: 'Unban a user',
    category: 'admin',
    async execute({ reply, args, isOwner }) {
        // Optional: Add owner-only gate if you prefer to restrict this to yourself
        if (!isOwner) return reply('🛡️ *Celestial Decree!*\n\n❌ Only the Supreme Master may revoke a ban.');

        if (!args[0]) return reply('❌ Usage: `.unban 2348012345678`');
        
        const target = args[0].replace(/[^0-9]/g, '');
        database.setBanned(target, false);
        
        reply(`🐦‍🔥 *Temporal Exile Revoked*\n\n✅ The soul *+${target}* has been cleansed of their restriction and may once again walk this realm.`);
    }
};
