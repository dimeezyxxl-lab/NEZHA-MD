/**
 * Anti-Edit — Invoke Truth Revelation
 * Usage: .antiedit (toggles on/off, admin only)
 */
'use strict';

const database = require('../../utils/database');

module.exports = {
    name:        'antiedit',
    aliases:     ['ae', 'truth', 'truthrevelation'],
    category:    'moderation',
    description: 'Invoke Truth Revelation to expose edited messages.',
    usage:       '.antiedit',

    async execute({ sock, from, msg, isGroup, isAdmin, isOwner, reply }) {
        if (!isGroup)           return reply(`❌ _This command manifests only within the bounds of a group._`);
        if (!isAdmin && !isOwner) return reply(`❌ _Only those with celestial authority may invoke this._`);

        const grp     = database.getGroup(from);
        const current = !!grp.antiedit;
        const next    = !current;
        database.setGroup(from, 'antiedit', next);

        await reply(
            `👁️ *𝗧𝗥𝗨𝗧𝗛 𝗥𝗘𝗩𝗘𝗟𝗔𝗧𝗜𝗢𝗡* ⛧\n\n` +
            (next
                ? `✅ *ENABLED* — _No edit shall hide the truth; the original message shall be revealed._`
                : `🔴 *DISABLED* — _The sanctuary permits the alteration of words once more._`) +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
