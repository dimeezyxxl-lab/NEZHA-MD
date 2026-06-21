/**
 * NoCall — Invoke Divine Silence
 * Usage: .nocall on | .nocall off | .nocall status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'nocall',
    aliases: ['blockcall', 'callblock', 'rejectcall', 'divinesilence'],
    description: 'Invoke Divine Silence to auto-reject all incoming calls.',
    category: 'moderation',

    async execute({ reply, args, from, isGroup, isAdmin, isOwner, phoneNumber }) {
        const sub     = (args[0] || '').toLowerCase();
        const key     = isGroup ? from : phoneNumber;
        const current = database.getGroup(key)?.nocall || false;

        if (!sub || sub === 'status') {
            return reply(
                '📵 *DIVINE SILENCE*\n\n' +
                `Status: ${current ? '✅ ACTIVE — The sanctuary is undisturbed' : '❌ INACTIVE — Disturbances permitted'}\n\n' +
                '*Rituals:*\n' +
                '• `.nocall on`     — Invoke silence; reject all calls\n' +
                '• `.nocall off`    — Banish silence; allow calls\n' +
                '• `.nocall status` — Consult the current state\n\n' +
                '_When active, those who call shall be met with an automatic decree of silence._'
            );
        }

        if (!['on', 'off'].includes(sub)) {
            return reply('❓ _Usage: .nocall on | off | status_');
        }

        if (!isAdmin && !isOwner) return reply('🛡️ _Only those with celestial authority may invoke Divine Silence._');

        const enabling = sub === 'on';
        database.setGroup(key, 'nocall', enabling);

        if (enabling) {
            reply(
                '📵 *DIVINE SILENCE INVOKED ✅*\n\n' +
                '🚫 All incoming echoes shall be:\n' +
                '  • Instantly rejected\n' +
                '  • Met with a decree that calls are forbidden\n\n' +
                '_Use .nocall off to permit disturbances._\n\n' +
                '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
            );
        } else {
            reply('✅ *DIVINE SILENCE BANISHED*\n\n_The sanctuary is now open to incoming calls._');
        }
    }
};
