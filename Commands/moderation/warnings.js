/**
 * Warnings — Consult the Ledger of Decrees
 * Usage: .warnings @user
 */

module.exports = {
    name: 'warnings',
    aliases: ['warns', 'checkwarns', 'ledger', 'decreeledger'],
    description: 'Consult the Ledger of Decrees for a user.',
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
            targetUser = msg.key.participant || msg.key.remoteJid;
        }

        const warningCount = database.getWarnings(from, targetUser);
        const userNumber = targetUser.split('@')[0];

        // Map status to divine aesthetic
        const statusMap = {
            0: '✅ PURE',
            1: '⚠️ CAUTION',
            2: '🔴 STRAINED',
            3: '🚫 CRITICAL'
        };

        reply(
            `⚠️ *LEDGER OF DECREES*\n\n` +
            `👤 Subject: @${userNumber}\n` +
            `⚠️ Decrees accumulated: ${warningCount}/3\n` +
            `📊 Karmic Standing: *${statusMap[warningCount] || 'CRITICAL'}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            { mentions: [targetUser] }
        );
    }
};
