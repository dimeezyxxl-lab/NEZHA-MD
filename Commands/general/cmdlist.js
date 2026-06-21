/**
 * Cmdlist — List all Celestial Sticker Bindings
 * Usage: .cmdlist
 */

'use strict';

const database = require('../../utils/database');

module.exports = {
    name:        'cmdlist',
    aliases:     ['stickerlist', 'bindlist', 'celestiallist'],
    description: 'List all celestial sticker-command bindings in this domain.',
    usage:       '.cmdlist',
    category:    'general',

    async execute({ from, reply, isGroup }) {
        if (!isGroup) return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');

        const all = database.getAllStickerCmds(from);
        const entries = Object.entries(all);

        if (entries.length === 0) {
            return reply(
                '📋 *Celestial Binding List*\n\n' +
                'No sacred bindings have been forged in this sanctuary yet.\n\n' +
                '_Reply to a sticker with .setcmd <command> to forge one._'
            );
        }

        const lines = entries.map(([ , cmd], i) =>
            `${i + 1}. Sacred Sticker → \`.${cmd}\``
        ).join('\n');

        reply(
            '📋 *Celestial Sticker Bindings*\n\n' +
            lines + '\n\n' +
            `Total: *${entries.length}* binding${entries.length === 1 ? '' : 's'}\n\n` +
            '_Reply to a sticker with .unsetcmd to dissolve a binding._'
        );
    },
};
