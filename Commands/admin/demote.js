/**
 * demote command — supports reply, @mention, or phone number
 * Handles both JID (@s.whatsapp.net) and LID (@lid) participant formats
 */
const database = require('../../utils/database');

async function resolveTarget(sock, from, msg, args) {
    const ctx =
        msg.message?.extendedTextMessage?.contextInfo ||
        msg.message?.imageMessage?.contextInfo       ||
        msg.message?.videoMessage?.contextInfo       || null;

    // 1. Quoted reply — ctx.participant is the most direct source; keep format (JID or LID)
    if (ctx?.participant) return ctx.participant;

    // 2. @mention — also keep as-is (could be JID or LID)
    if (ctx?.mentionedJid?.length) return ctx.mentionedJid[0];

    // 3. Plain number — look it up in group metadata to get the correct JID/LID
    if (args[0]) {
        const num = args[0].replace(/[^0-9]/g, '');
        if (num.length >= 7) {
            try {
                const meta = await sock.groupMetadata(from);
                // Search by trailing digits in case of country-code differences
                const match = meta.participants.find(p => {
                    const pNum = p.id.split('@')[0].split(':')[0].replace(/\D/g, '');
                    return pNum === num || pNum.slice(-9) === num.slice(-9);
                });
                if (match) return match.id;
            } catch (_) {}
            // Fallback: construct JID manually
            return `${num}@s.whatsapp.net`;
        }
    }

    return null;
}

module.exports = {
    name: 'demote',
    aliases: ['removeadmin'],
    description: 'Demote a group member (reply to message, @mention, or phone number)',
    category: 'admin',

    async execute({ sock, msg, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');
        }

        const targetId = await resolveTarget(sock, from, msg, args);

        if (!targetId) {
            return reply(
                '🚩 *Whom shall the Lotus Prince demote?*\n\n' +
                '• Reply to their message + `.demote`\n' +
                '• Mention them: `.demote @user`\n' +
                '• Type number: `.demote 2348012345678`'
            );
        }

        // Display number — strip suffix for readability
        const displayNum = targetId.split('@')[0].split(':')[0].replace(/\D/g, '');

        try {
            await sock.groupParticipantsUpdate(from, [targetId], 'demote');
            await sock.sendMessage(from, {
                text: `🔽 @${displayNum} has been stripped of administrative power by the Lotus Prince!`,
                mentions: [targetId]
            });
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
