/**
 * UnmuteSticker — Invoke Divine Seal Dissolution
 * Usage: Reply to a blocked sticker with .unmutesticker
 */

const database = require('../../utils/database');

module.exports = {
    name: 'unmutesticker',
    aliases: ['unblocksticker', 'stickerunban', 'dissolvedivineseal', 'restore'],
    description: 'Invoke Divine Seal Dissolution to restore a sticker.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, isGroup, isAdmin }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Authority Required!*\n\n❌ _Only those with administrative authority may dissolve the Divine Seal._');
        }

        try {
            const ctxInfo = msg.message?.extendedTextMessage?.contextInfo;
            const quoted  = ctxInfo?.quotedMessage;

            if (!quoted) {
                return reply(
                    `✅ *DIVINE SEAL DISSOLUTION*\n\n` +
                    `_Restore a sticker previously banished from the sanctuary._\n\n` +
                    `*Ritual Usage:*\n` +
                    `Reply to the banished sticker with: .unmutesticker`
                );
            }

            const stickerData = quoted.stickerMessage;
            if (!stickerData) {
                return reply('❌ _The quoted essence is not a sticker._');
            }

            const stickerId = stickerData.fileSha256 || stickerData.fileEncSha256;
            if (!stickerId) {
                return reply('❌ _The sticker’s essence could not be identified._');
            }

            const stickerHash = Buffer.from(stickerId).toString('base64');
            
            if (!database.isStickerBlocked(from, stickerHash)) {
                return reply('⚠️ _This sticker is not bound by the seal; it is already permitted._');
            }

            database.unblockSticker(from, stickerHash);

            reply(
                `✅ *DIVINE SEAL DISSOLVED*\n\n` +
                `_The sticker has been restored to the sanctuary._\n` +
                `It may now manifest within this domain once more.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );

        } catch (err) {
            reply('❌ *Dissolution failed:* The sanctuary records remain sealed.');
        }
    }
};
