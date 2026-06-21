/**
 * setbotlang — Calibrate the Divine Tongue
 * Usage: .setbotlang <language>
 */

'use strict';

const database   = require('../../utils/database');
const langSystem = require('../../utils/langSystem');

module.exports = {
    name:        'setbotlang',
    aliases:     ['setlang', 'botlang', 'changelang', 'tongue', 'calibrate'],
    description: 'Calibrate the Divine Tongue of the Lotus Prince.',
    usage:       '.setbotlang <language>',
    category:    'owner',

    async execute({ reply, args, phoneNumber }) {
        const input = args[0]?.toLowerCase().trim();

        if (!input) {
            const current = database.getLanguage(phoneNumber);
            return reply(
                '🌍 *DIVINE TONGUE CALIBRATION*\n\n' +
                `Current Resonance: *${current.charAt(0).toUpperCase() + current.slice(1)}*\n\n' +
                '*Available Conduits:*\n' +
                langSystem.AVAILABLE
                    .map(l => `  • ${l.charAt(0).toUpperCase() + l.slice(1)}`)
                    .join('\n') + '\n\n' +
                '*Ritual Usage:* `.setbotlang <language>`\n' +
                '_Example:_ `.setbotlang french`'
            );
        }

        if (!langSystem.isValid(input)) {
            return reply(
                '❌ *Unknown conduit:* *' + input + '*\n\n' +
                '*Supported Tongues:* ' + langSystem.availableList() + '\n\n' +
                '_Example:_ `.setbotlang french`'
            );
        }

        const current = database.getLanguage(phoneNumber);
        const norm    = langSystem.normalise(input);

        if (current === norm) {
            return reply(
                '⚠️ *The resonance is already tuned to ' +
                norm.charAt(0).toUpperCase() + norm.slice(1) + '.*'
            );
        }

        database.setLanguage(phoneNumber, norm);

        // Confirm in the NEW language so the change is immediately visible
        const t = langSystem.getTranslator(norm);
        reply(
            t('lang.set', { lang: norm.charAt(0).toUpperCase() + norm.slice(1) }) +
            '\n\n_Use .getbotlang to verify the current calibration._\n\n' +
            '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
        );
    },
};
