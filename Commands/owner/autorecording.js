/**
 * AutoRecording — Invoke Lotus Echo Presence
 * Usage: .autorecording on | off | status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'autorecording',
    aliases: ['autorecord', 'recordmode', 'lotusecho', 'echo'],
    description: 'Invoke Lotus Echo Presence (Recording Indicator) for all incoming inquiries.',
    category: 'owner',

    async execute({ reply, args, phoneNumber }) {
        const action  = (args[0] || '').toLowerCase();
        const current = database.getAutoRecording(phoneNumber);

        if (!action || action === 'status') {
            return reply(
                '🎙️ *LOTUS ECHO PRESENCE*\n\n' +
                `Current Manifestation: ${current ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n' +
                '*Rituals:*\n' +
                '• `.autorecording on`     — Activate the echo\n' +
                '• `.autorecording off`    — Cease the echo\n' +
                '• `.autorecording status` — Consult the current state\n\n' +
                '_When active, all who seek an audience shall perceive the Lotus Echo._'
            );
        }

        if (['on', 'enable', '1'].includes(action)) {
            if (database.getAutoTyping(phoneNumber)) {
                database.setAutoTyping(phoneNumber, false);
            }
            database.setAutoRecording(phoneNumber, true);
            return reply(
                '✅ *LOTUS ECHO ACTIVATED*\n\n' +
                '🎙️ The Lotus Echo shall now manifest upon every inquiry received.\n\n' +
                '_Presence of "Typing" has been dissolved—only one presence may manifest at a time._\n\n' +
                '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
            );
        }

        if (['off', 'disable', '0'].includes(action)) {
            database.setAutoRecording(phoneNumber, false);
            return reply('❌ *LOTUS ECHO DISSOLVED*\n\nThe sanctuary returns to silence.');
        }

        return reply('❓ _Ritual Usage: .autorecording on | off | status_');
    }
};
