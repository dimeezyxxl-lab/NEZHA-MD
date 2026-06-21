/**
 * Report — Summon the Celestial Tribunal
 * Usage: Reply to a message + .report <reason>
 */

module.exports = {
    name: 'report',
    aliases: ['reportuser', 'flag', 'tribunal'],
    description: 'Summon the Celestial Tribunal to report a member to the Guardians.',
    category: 'group',

    async execute({ sock, msg, from, sender, args, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        const quoted      = msg.message?.extendedTextMessage?.contextInfo;
        const quotedSender = quoted?.participant || quoted?.remoteJid || null;
        const mentioned   = quoted?.mentionedJid?.[0] || null;
        const target      = quotedSender || mentioned || null;

        const reason = args.filter(a => !a.startsWith('@')).join(' ').trim()
            || 'No reason provided';

        if (!target) {
            return reply(
                '🚨 *Summon Celestial Tribunal*\n\n' +
                'Reply to a message and type:\n' +
                '`.report <reason>`\n\n' +
                'Or mention a user:\n' +
                '`.report @user <reason>`\n\n' +
                '_The Guardians will be notified in secret._'
            );
        }

        if (target === sender) return reply('❌ *Self-judgment is not permitted.*');

        let admins = [];
        try {
            const meta = await sock.groupMetadata(from);
            admins = meta.participants
                .filter(p => p.admin)
                .map(p => p.id);
        } catch (e) {
            return reply('❌ *Celestial link failed:* Could not summon the Guardians.');
        }

        if (!admins.length) return reply('❌ *No Guardians present:* The Tribunal cannot be formed.');

        const now       = new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' });
        const targetNum = target.split('@')[0];

        let groupName = from;
        try {
            const meta = await sock.groupMetadata(from);
            groupName  = meta.subject;
        } catch (_) {}

        const reportMsg =
            '⚖️ *The Celestial Tribunal has been Summoned*\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
            `📋 Sanctuary: *${groupName}*\n` +
            `👤 Accused: *+${targetNum}*\n` +
            `📝 Reason: *${reason}*\n` +
            `🕐 Temporal Marker: ${now}\n\n` +
            '_The identity of the accuser remains shielded by the heavens._\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '_Guardians, exercise your judgment for the purity of the sanctuary._';

        for (const adminJid of admins) {
            try {
                await sock.sendMessage(adminJid, { text: reportMsg });
            } catch (_) {}
        }

        reply(
            `✅ *Tribunal Summoned*\n\n` +
            `👤 Accused: @${targetNum}\n` +
            `📝 Reason: ${reason}\n\n` +
            `_The Guardians have been notified. Thank you for protecting the sanctuary’s sanctity!_`,
            { mentions: [target] }
        );
    }
};
