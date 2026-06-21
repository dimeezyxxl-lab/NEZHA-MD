/**
 * AutoViewStatus — Invoke Divine Omniscience
 * Usage: .autoviewstatus [on|off]
 */
'use strict';

module.exports = {
    name:        'autoviewstatus',
    aliases:     ['autostatus', 'avs', 'autoview', 'omniscience'],
    description: 'Invoke Divine Omniscience to watch over and bless all status chronicles.',
    usage:       '.autoviewstatus [on|off]',
    category:    'owner',

    async execute({ args, reply, database, phoneNumber, isOwner }) {
        if (!isOwner) return reply('🔒 _This command manifests only for the Lotus Prince._');

        const current = database.getAutoViewStatus(phoneNumber);
        const arg = (args[0] || '').toLowerCase();

        let next;
        if (arg === 'on' || arg === 'enable' || arg === 'true')   next = true;
        else if (arg === 'off' || arg === 'disable' || arg === 'false') next = false;
        else next = !current;

        database.setAutoViewStatus(phoneNumber, next);

        return reply(
            `╔══════════════════════════════╗\n` +
            `║   👁️  *DIVINE OMNISCIENCE*     ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `State of Sight: *${next ? '✅ AWAKENED' : '❌ DORMANT'}*\n\n` +
            (next
                ? `_The Lotus Prince shall now witness every chronicle and bestow his divine favor (❤️) upon them._`
                : `_The divine gaze is withdrawn; chronicles are no longer observed._`) +
            `\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
