/**
 * promote command — supports reply, @mention, or phone number
 * Handles both JID (@s.whatsapp.net) and LID (@lid) participant formats
 */
const database = require('../../utils/database');

async function resolveTarget(sock, from, msg, args) {
    const ctx =
        msg.message?.extendedTextMessage?.contextInfo ||
        msg.message?.imageMessage?.contextInfo       ||
        msg.message?.videoMessage?.contextInfo       || null;

    if (ctx?.participant) return ctx.participant;
    if (ctx?.mentionedJid?.length) return ctx.mentionedJid[0];

    if (args[0]) {
        const num = args[0].replace(/[^0-9]/g, '');
        if (num.length >= 7) {
            try {
                const meta = await sock.groupMetadata(from);
                const match = meta.participants.find(p => {
                    const pNum = p.id.split('@')[0].split(':')[0].replace(/\D/g, '');
                    return pNum === num || pNum.slice(-9) === num.slice(-9);
                });
                if (match) return match.id;
            } catch (_) {}
            return `${num}@s.whatsapp.net`;
        }
    }
    return null;
}

module.exports = {
    name: 'promote',
    aliases: ['makeadmin'],
    description: 'Promote a group member to admin',
    category: 'admin',

    async execute({  sock, msg, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to elevate a member.');
        }

        const targetId = await resolveTarget(sock, from, msg, args);

        if (!targetId) {
            return reply(
                '🚩 *Whom shall the Lotus Prince elevate to a Celestial Guardian?*\n\n' +
                '• Reply to their message + `.promote`\n' +
                '• Mention them: `.promote @user`\n' +
                '• Type number: `.promote 2348012345678`'
            );
        }

        const displayNum = targetId.split('@')[0].split(':')[0].replace(/\D/g, '');

        try {
            await sock.groupParticipantsUpdate(from, [targetId], 'promote');
            await sock.sendMessage(from, {
                text: `⭐ @${displayNum} has been *elevated to Celestial Guardian* by the Lotus Prince!`,
                mentions: [targetId]
            });
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
