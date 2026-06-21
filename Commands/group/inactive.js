/**
 * Inactive — Observe Celestial Presence
 * Usage: .inactive
 */

module.exports = {
    name: 'inactive',
    aliases: ['lurkers', 'silent', 'presence'],
    description: 'Observe the celestial presence of members within the sanctuary.',
    category: 'group',
    async execute({ sock, from, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        
        try {
            const meta = await sock.groupMetadata(from);
            const nonAdmins = meta.participants.filter(p => !p.admin);
            
            reply(
                `👻 *Celestial Presence Report*\n\n` +
                `📊 Total souls in the sanctuary: *${meta.participants.length}*\n` +
                `👑 Guardians (Admins): *${meta.participants.filter(p => p.admin).length}*\n` +
                `👤 Common Practitioners: *${nonAdmins.length}*\n\n` +
                `📢 To those dwelling in silence—let your voice resonate within the sanctuary! 👋\n\n` +
                `_The purging of silent souls remains at the discretion of the Guardians._`
            );
        } catch { 
            reply('❌ *Celestial observation failed:* Could not manifest member data.'); 
        }
    }
};
