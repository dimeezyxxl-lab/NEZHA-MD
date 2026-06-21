/**
 * Link — Open a Celestial Gateway
 * Usage: .link (admin only)
 */

module.exports = {
    name: 'link',
    aliases: ['grouplink', 'invitelink', 'gateway', 'invite'],
    description: 'Open a celestial gateway to the sanctuary (admin only).',
    category: 'group',
    async execute({ sock, msg, from, reply, isGroup, isAdmin }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        if (!isAdmin) {
            return reply('🛑 *Restriction:* Only Guardians may open the Celestial Gateway.');
        }

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const inviteCode = await sock.groupInviteCode(from);
            const groupName = groupMetadata.subject;

            reply(
                `🔗 *Celestial Gateway Manifested*\n\n` +
                `📌 Sanctuary: *${groupName}*\n` +
                `🔗 Path: https://chat.whatsapp.com/${inviteCode}\n\n` +
                `⚠️ *Guardian’s Decree:* Share this path with wisdom, for only those you deem worthy should enter.`
            );
        } catch (err) {
            reply('❌ *Manifestation failed:* Could not forge the Celestial Gateway.');
        }
    }
};
