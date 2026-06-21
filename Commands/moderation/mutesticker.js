/**
 * MuteSticker — Invoke Divine Seal of Imagery
 * Usage: Reply to a sticker with .mutesticker
 */

const database = require('../../utils/database');

module.exports = {
    name: 'mutesticker',
    aliases: ['blocksticker', 'stickerban', 'divineseal'],
    description: 'Invoke Divine Seal of Imagery to forbid a sticker.',
    category: 'moderation',
    async execute({ sock, msg, from, reply, isGroup, isAdmin }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Authority Required!*\n\n❌ _Only those with administrative authority may invoke the Divine Seal._');
        }

        try {
            const ctx = msg.message?.extendedTextMessage?.contextInfo;
            if (!ctx) return reply('🚫 *Divine Seal of Imagery*\n\nReply to any sticker with `.mutesticker` to banish its essence from this sanctuary.');

            let stickerHash = null;
            const inline = ctx?.quotedMessage?.stickerMessage;
            
            if (inline) {
                const id = inline.fileSha256 || inline.fileEncSha256;
                if (id) stickerHash = Buffer.from(id).toString('base64');
            }

            if (!stickerHash) {
                try {
                    const loaded = await sock.loadMessage(ctx.remoteJid || from, ctx.stanzaId);
                    const sd = loaded?.message?.stickerMessage;
                    if (sd) {
                        const id = sd.fileSha256 || sd.fileEncSha256;
                        if (id) stickerHash = Buffer.from(id).toString('base64');
                    }
                } catch (_) {}
            }

            if (!stickerHash) return reply('❌ _The essence of this message is not a sticker; therefore, the seal cannot be applied._');
            if (database.isStickerBlocked(from, stickerHash)) return reply('⚠️ *The Seal is already active:* This sticker is already banished.');

            database.blockSticker(from, stickerHash);
            
            reply(
                '🚫 *DIVINE SEAL INVOKED!*\n\n' +
                '_This sticker’s essence is now banished from the sanctuary._\n' +
                'It shall be purged instantly upon arrival.\n\n' +
                '_To release the seal: .unmutesticker_\n\n' +
                '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
            );
        } catch (err) {
            reply('❌ *Seal failed:* The essence could not be bound.');
        }
    }
};
