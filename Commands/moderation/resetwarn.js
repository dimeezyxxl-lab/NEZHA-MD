/**
 * ResetWarn — Invoke Karma Cleansing
 * Usage: .resetwarn @user or reply to user
 */

module.exports = {
    name: 'resetwarn',
    aliases: ['resetwarnings', 'clearwarns', 'karmacleansing', 'absolution'],
    description: 'Invoke Karma Cleansing to wipe a user’s record.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, args, isGroup, database }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        let targetUser = mentioned[0] || quotedParticipant;
        
        if (!targetUser && args.length > 0) {
            const input = args[0].replace(/[^0-9]/g, '');
            if (input) targetUser = input + '@s.whatsapp.net';
        }
        
        if (!targetUser) {
            return reply(
                `🔄 *KARMA CLEANSING*\n\n` +
                `_Wipe the record of a member who has strayed._\n\n` +
                `*Ritual Usage:*\n` +
                `• .resetwarn @user\n` +
                `• .resetwarn (reply to user)`
            );
        }

        database.resetWarnings(from, targetUser);
        const userNumber = targetUser.split('@')[0];

        reply(
            `✅ *KARMA CLEANSING COMPLETE*\n\n` +
            `👤 The transgressions of @${userNumber} have been wiped from the records. Their path is clear once more.\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            { mentions: [targetUser] }
        );
    }
};
