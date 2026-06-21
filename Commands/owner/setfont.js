/**
 * SetFont — Calibrate the Scriptural Aesthetic
 * Usage: .setfont <number>
 */

const database   = require('../../utils/database');
const fontSystem = require('../../utils/fontSystem');

module.exports = {
    name: 'setfont',
    aliases: ['changefont', 'font', 'setaesthetic', 'calibratefont'],
    description: 'Calibrate the Scriptural Aesthetic of the sanctuary (Owner only).',
    category: 'owner',

    async execute({ reply, args, phoneNumber, isOwner }) {
        if (!isOwner) return reply('🔒 _This divine calibration is reserved for the Prince alone._');

        if (!args.length) {
            return reply(
                `🔤 *SCRIPTURAL CALIBRATION*\n\n` +
                `Usage: *.setfont <number>*\n` +
                `Available Range: 1 – ${fontSystem.maxFont}\n\n` +
                `_Consult the .fontlist to choose your preferred aesthetic._\n\n` +
                `_Example:_ .setfont 6`
            );
        }

        const fontNumber = parseInt(args[0]);

        if (isNaN(fontNumber) || !fontSystem.isValidFont(fontNumber)) {
            return reply(`❌ _The chosen aesthetic is beyond the boundaries of this reality._\n_Choose between 1 and ${fontSystem.maxFont} or consult .fontlist._`);
        }

        database.setFont(phoneNumber, fontNumber);

        const fontName   = fontSystem.getFontName(fontNumber);
        const preview    = fontSystem.convert(`Font ${fontNumber} — ${fontName}`, fontNumber);

        reply(
            `✅ *SCRIPTURAL AESTHETIC CALIBRATED TO #${fontNumber} — ${fontName}*\n\n` +
            `*Preview:* ${preview}\n\n` +
            `_The Lotus Prince’s decrees shall henceforth be etched in this style._\n` +
            `_Use .setfont 1 to return to the Standard Script._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
