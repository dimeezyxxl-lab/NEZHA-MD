/**
 * AutoTyping — Invoke Divine Scribal Presence
 * Usage: .autotyping on | off | status
 */

const database = require('../../utils/database');

module.exports = {
    name: 'autotyping',
    aliases: ['autotype', 'typingmode', 'divinescribe', 'scribalpresence'],
    description: 'Invoke Divine Scribal Presence (Typing Indicator) for all incoming inquiries.',
    category: 'owner',

    async execute({ reply, args, phoneNumber }) {
        const action  = (args[0] || '').toLowerCase();
        const current = database.getAutoTyping(phoneNumber);

        if (!action || action === 'status') {
            return reply(
                '⌨️ *DIVINE SCRIBAL PRESENCE*\n\n' +
                `Current Manifestation: ${current ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n' +
                '*Rituals:*\n' +
                '• `.autotyping on`     — Activate the scribe\n' +
                '• `.autotyping off`    — Cease the scribe\n' +
                '• `.autotyping status` — Consult the current state\n\n' +
                '_When active, all who seek an audience shall perceive the divine scrolls being inscribed._'
            );
        }

        if (['on', 'enable', '1'].includes(action)) {
            // Mutually exclusive with auto-recording
            if (database.getAutoRecording(phoneNumber)) {
                database.setAutoRecording(phoneNumber, false);
            }
            database.setAutoTyping(phoneNumber, true);
            return reply(
                '✅ *DIVINE SCRIBAL PRESENCE ACTIVATED*\n\n' +
                '⌨️ The divine scrolls shall now manifest upon every inquiry received.\n\n' +
                '_Lotus Echo Presence has been dissolved—only one presence may manifest at a time._\n\n' +
                '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
            );
        }

        if (['off', 'disable', '0'].includes(action)) {
            database.setAutoTyping(phoneNumber, false);
            return reply('❌ *DIVINE SCRIBAL PRESENCE DISSOLVED*\n\nThe sanctuary returns to silence.');
        }

        return reply('❓ _Ritual Usage: .autotyping on | off | status_');
    }
};
