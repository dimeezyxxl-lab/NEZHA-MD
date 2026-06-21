/**
 * Unsetcmd — Dissolve a Celestial Binding
 * Usage: Reply to a sticker + .unsetcmd
 */

'use strict';

const database = require('../../utils/database');

module.exports = {
    name:        'unsetcmd',
    aliases:     ['removecmd', 'unbindcmd', 'delcmd', 'deletecmd', 'dissolve'],
    description: 'Dissolve the celestial binding between a sticker and a command.',
    usage:       '.unsetcmd (reply to the target sticker)',
    category:    'general',

    async execute({ sock, msg, from, reply, isGroup }) {
        if (!isGroup) return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');

        const ctx = msg.message?.extendedTextMessage?.contextInfo;
        if (!ctx) {
            return reply('❌ *Missing target.* Please reply to a sacred sticker to dissolve its binding.');
        }

        let stickerHash = null;

        const inline = ctx?.quotedMessage?.stickerMessage;
        if (inline) {
            const id = inline.fileSha256 || inline.fileEncSha256;
            if (id) stickerHash = Buffer.from(id).toString('base64');
        }

        if (!stickerHash) {
            try {
                const loaded = await sock.loadMessage(ctx.remoteJid || from, ctx.stanzaId);
                const sd     = loaded?.message?.stickerMessage;
                if (sd) {
                    const id = sd.fileSha256 || sd.fileEncSha256;
                    if (id) stickerHash = Buffer.from(id).toString('base64');
                }
            } catch (_) {}
        }

        if (!stickerHash) {
            return reply('❌ *Invalid target.* The quoted essence is not a sticker.');
        }

        const existing = database.getStickerCmd(from, stickerHash);
        if (!existing) {
            return reply('⚠️ *No binding found.* This sticker has no celestial link to dissolve.');
        }

        const deleted = database.deleteStickerCmd(from, stickerHash);

        if (deleted) {
            reply(
                '🗑️ *Celestial Binding Dissolved!*\n\n' +
                `The sacred link to \`.${existing}\` has been severed.\n\n' +
                'This sticker no longer holds authority over the Oracle.\n\n' +
                '_Use .setcmd (reply to a sticker) to forge a new binding._'
            );
        } else {
            reply('❌ *Dissolution failed.* The link remains intact.');
        }
    },
};
