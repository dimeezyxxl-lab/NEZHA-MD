/**
 * Anti-Delete — Invoke Divine Preservation
 * Usage: .antidelete (toggles on/off, admin only)
 */
'use strict';

const database = require('../../utils/database');

module.exports = {
    name:        'antidelete',
    aliases:     ['ad', 'antirevoke', 'preserve', 'divinepreservation'],
    category:    'moderation',
    description: 'Invoke Divine Preservation to recover deleted messages.',
    usage:       '.antidelete',

    async execute({ sock, from, msg, isGroup, isAdmin, isOwner, reply }) {
        if (!isGroup)             return reply(`❌ _This command manifests only within the bounds of a group._`);
        if (!isAdmin && !isOwner) return reply(`❌ _Only those with celestial authority may invoke this._`);

        const grp     = database.getGroup(from);
        const current = !!grp.antidelete;
        const next    = !current;
        database.setGroup(from, 'antidelete', next);

        await reply(
            `🛡️ *𝗗𝗜𝗩𝗜𝗡𝗘 𝗣𝗥𝗘𝗦𝗘𝗥𝗩𝗔𝗧𝗜𝗢𝗡* ⛧\n\n` +
            (next
                ? `✅ *ENABLED* — _All messages that vanish shall be preserved within the sanctuary._`
                : `🔴 *DISABLED* — _The sanctuary returns to its natural, fleeting state._`) +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
