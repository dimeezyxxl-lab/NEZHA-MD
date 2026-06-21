/**
 * ResetLinkWarn — Invoke Purity Restoration
 * Usage: .resetlinkwarn @user or reply to user
 */

const database = require('../../utils/database');

module.exports = {
    name: 'resetlinkwarn',
    aliases: ['resetlinkwarning', 'clearlinkwarn', 'purityrestoration', 'cleanse'],
    description: 'Invoke Purity Restoration to cleanse a user’s link-violation record.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, args, isGroup }) {
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
                    `🔄 *PURITY RESTORATION*\n\n` +
                    `_Cleanse a member's record of external link violations._\n\n` +
                    `*Ritual Usage:*\n` +
                    `• Reply to the member: .resetlinkwarn\n` +
                    `• With mention: .resetlinkwarn @user`
                );
            }

            const warnings = database.getAntiLinkWarnings(from, targetUser);
            
            if (warnings === 0) {
                return reply('⚠️ _The subject is already pure; they bear no record of violations._');
            }

            database.resetAntiLinkWarnings(from, targetUser);

            const userNumber = targetUser.split('@')[0];
            reply(
                `✅ *PURITY RESTORATION COMPLETE*\n\n` +
                `The link-violation record for @${userNumber} has been cleansed.\n` +
                `Prior transgressions removed: ${warnings}\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                { mentions: [targetUser] }
            );

        } catch (err) {
            reply('❌ *Restoration failed:* The sanctuary records are immutable.');
        }
    }
};
