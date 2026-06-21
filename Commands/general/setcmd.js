/**
 * Setcmd — Forge a Celestial Binding
 * Usage: .setcmd <command> (reply to a sticker)
 */

'use strict';

const database      = require('../../utils/database');
const commandLoader = require('../../utils/commandLoader');

module.exports = {
    name:        'setcmd',
    aliases:     ['stickercmd', 'bindcmd', 'forge'],
    description: 'Forge a celestial binding between a sticker and a command.',
    usage:       '.setcmd <command> (reply to the target sticker)',
    category:    'general',

    async execute({ sock, msg, from, reply, args, isGroup }) {
        if (!isGroup) return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');

        const commandName = args[0]?.toLowerCase().trim();
        if (!commandName) {
            return reply(
                '📌 *Forge a Celestial Binding*\n\n' +
                'Reply to a sacred sticker, then type:\n' +
                '*.setcmd <command name>*\n\n' +
                'Every time that sticker is manifested, the Oracle will auto-run the command.\n\n' +
                '_Example:_ *.setcmd ping*\n' +
                '_Example:_ *.setcmd alive*\n\n' +
                'Use *.unsetcmd* (reply to sticker) to dissolve the binding.\n' +
                'Use *.cmdlist* to view all current bindings.'
            );
        }

        // Verify the command exists
        const targetCmd = commandLoader.getCommand(commandName);
        if (!targetCmd) {
            return reply(
                '❌ *Unknown incantation:* *' + commandName + '*\n\n' +
                'Ensure you use a valid command name without the prefix.\n' +
                '_Example:_ `.setcmd ping`'
            );
        }

        // ── Extract sticker hash from the quoted message ─────────────────────
        const ctx = msg.message?.extendedTextMessage?.contextInfo;
        if (!ctx) {
            return reply('❌ *Missing target.* Please reply to a sticker to forge a binding.');
        }

        let stickerHash = null;

        // Try inline quoted message
        const inline = ctx?.quotedMessage?.stickerMessage;
        if (inline) {
            const id = inline.fileSha256 || inline.fileEncSha256;
            if (id) stickerHash = Buffer.from(id).toString('base64');
        }

        // Fall back to full message load
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

        // ── Save to DB & confirm ─────────────────────────────────────────────
        const existing = database.getStickerCmd(from, stickerHash);
        database.setStickerCmd(from, stickerHash, commandName);

        if (existing) {
            reply(
                '✏️ *Celestial Binding Updated!*\n\n' +
                `Previous command: \`${existing}\`\n` +
                `New command: \`${commandName}\`\n\n` +
                'The sticker is now bound to *.' + commandName + '*.'
            );
        } else {
            reply(
                '✅ *Celestial Binding Forged!*\n\n' +
                `Bound to: \`.${commandName}\`\n\n` +
                'Whenever this sticker is manifested, the Oracle shall execute *.' + commandName + '*.\n\n' +
                '_Use .unsetcmd (reply to sticker) to dissolve this binding._'
            );
        }
    },
};
