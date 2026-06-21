/**
 * UnmuteUser — Invoke Voice Restoration
 * Usage: .unmuteuser @user or reply to user
 */

const database = require('../../utils/database');

module.exports = {
    name: 'unmuteuser',
    aliases: ['unmute', 'userunmute', 'voicerestoration', 'restorevoice'],
    description: 'Invoke Voice Restoration to lift a Vow of Silence.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, args, isGroup, isAdmin }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Authority Required!*\n\n❌ _Only those with administrative authority may invoke Voice Restoration._');
        }

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
                    `🔊 *VOICE RESTORATION*\n\n` +
                    `_End the Vow of Silence for a member of the sanctuary._\n\n` +
                    `*Ritual Usage:*\n` +
                    `• Reply to the member: .unmuteuser\n` +
                    `• With mention: .unmuteuser @user`
                );
            }

            const wasMuted = database.isUserMuted(from, targetUser);
            if (!wasMuted) {
                return reply('⚠️ _The subject is already permitted to speak; they bear no Vow of Silence._');
            }

            database.removeMutedUser(from, targetUser);

            const userNumber = targetUser.split('@')[0];
            reply(
                `🔊 *VOICE RESTORATION COMPLETE*\n\n` +
                `👤 The Vow of Silence imposed upon @${userNumber} has been lifted.\n` +
                `They are once again permitted to offer their echoes to the sanctuary.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                { mentions: [targetUser] }
            );

        } catch (err) {
            reply('❌ *Restoration failed:* The sanctuary’s seal remains unbroken.');
        }
    }
};
