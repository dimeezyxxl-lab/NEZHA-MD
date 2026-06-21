/**
 * Warn — Deliver Celestial Decree
 * Usage: .warn @user [reason] or reply to user
 */

module.exports = {
    name: 'warn',
    aliases: ['warning', 'strike', 'decree'],
    description: 'Deliver a Celestial Decree to a user.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, args, isGroup, database }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        try {
            const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
            const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
            
            let targetUser = mentioned[0] || quotedParticipant;
            
            if (!targetUser && args.length > 0) {
                const input = args[0].replace(/[^0-9]/g, '');
                if (input) targetUser = input + '@s.whatsapp.net';
            }
            
            if (!targetUser) {
                return reply(
                    '⚠️ *CELESTIAL DECREE*\n\n' +
                    '_Deliver a strike against one who has disrupted the sanctuary._\n\n' +
                    '*Ritual Usage:*\n' +
                    '• .warn @user [reason]\n' +
                    '• Reply to message + .warn [reason]\n\n' +
                    '_Upon the 3rd decree, the subject shall be banished._'
                );
            }

            const reason = args.slice(mentioned.length > 0 ? 1 : 0).join(' ') || 'No reason provided';
            const warningCount = database.addWarning(from, targetUser);
            const maxWarnings = 3;
            const num = targetUser.split('@')[0];

            if (warningCount >= maxWarnings) {
                try {
                    await sock.groupParticipantsUpdate(from, [targetUser], 'remove');
                    database.resetWarnings(from, targetUser);
                    reply(
                        `🚫 *BANISHMENT ENACTED*\n\n` +
                        `👤 @${num} has reached ${maxWarnings} decrees and is cast out.\n` +
                        `📝 Final Decree: ${reason}\n\n` +
                        `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                        { mentions: [targetUser] }
                    );
                } catch (_) {
                    reply(
                        `⚠️ *MAX DECREES REACHED*\n\n` +
                        `👤 @${num} has reached ${warningCount}/${maxWarnings} decrees.\n` +
                        `📝 Reason: ${reason}\n\n` +
                        `_(Bot lacks celestial authority to perform the final banishment)_`,
                        { mentions: [targetUser] }
                    );
                }
            } else {
                reply(
                    `⚠️ *CELESTIAL DECREE ISSUED*\n\n` +
                    `👤 Subject: @${num}\n` +
                    `⚠️ Decrees: ${warningCount}/${maxWarnings}\n` +
                    `📝 Reason: ${reason}\n\n` +
                    `_Three decrees result in immediate banishment._\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                    { mentions: [targetUser] }
                );
            }
        } catch (err) {
            reply('❌ *Decree failed:* The sanctuary’s balance remains undisturbed.');
        }
    }
};
