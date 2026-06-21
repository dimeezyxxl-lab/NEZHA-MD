/**
 * getbotlang — Consult the Linguistic Conduits
 * Usage: .getbotlang
 */

'use strict';

const database   = require('../../utils/database');
const langSystem = require('../../utils/langSystem');

module.exports = {
    name:        'getbotlang',
    aliases:     ['currentlang', 'mylang', 'tongue', 'conduit'],
    description: 'Consult the Linguistic Conduit through which the Lotus Prince speaks.',
    usage:       '.getbotlang',
    category:    'owner',

    async execute({ reply, phoneNumber }) {
        const current = database.getLanguage(phoneNumber);
        const t       = langSystem.getTranslator(current);

        reply(
            t('lang.current', { lang: current.charAt(0).toUpperCase() + current.slice(1) }) +
            '\n\n*Available Linguistic Conduits:*\n' +
            langSystem.AVAILABLE
                .map(l => {
                    const label = l.charAt(0).toUpperCase() + l.slice(1);
                    return (l === current ? '✅ ' : '  • ') + label;
                })
                .join('\n') +
            '\n\n_Use .setbotlang <language> to shift the Lotus Prince’s tongue._\n\n' +
            '> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_'
        );
    },
};
