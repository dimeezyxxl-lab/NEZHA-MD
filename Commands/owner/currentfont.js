/**
 * CurrentFont — Consult the Scriptural Aesthetic
 * Usage: .currentfont
 */

const database = require('../../utils/database');
const fontSystem = require('../../utils/fontSystem');

module.exports = {
    name: 'currentfont',
    aliases: ['myfont', 'showfont', 'aesthetic', 'scripture'],
    description: 'Consult the current Scriptural Aesthetic (font) of the sanctuary.',
    category: 'owner',
    async execute({ reply, phoneNumber }) {
        const currentFont = database.getFont(phoneNumber);
        const fontName = fontSystem.getFontName(currentFont);
        const sampleText = fontSystem.convert('NEZHA MD BOT', currentFont);
        
        reply(
            `📝 *SCRIPTURAL AESTHETIC*\n\n` +
            `Current Manifestation: ${currentFont}\n` +
            `Divine Style: ${fontName}\n\n` +
            `*Preview of the Decree:*\n${sampleText}\n\n` +
            `_Use .setfont <number> to redefine the aesthetic of the sanctuary._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
