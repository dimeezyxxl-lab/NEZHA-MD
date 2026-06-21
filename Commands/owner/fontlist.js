/**
 * FontList — Unveil the Scriptural Archive
 * Usage: .fontlist
 */

const fontSystem = require('../../utils/fontSystem');

module.exports = {
    name: 'fontlist',
    aliases: ['fonts', 'listfonts', 'archive', 'calligraphy'],
    description: 'Unveil the Scriptural Archive containing all available divine calligraphy.',
    category: 'owner',

    async execute({ reply }) {
        const list = fontSystem.getFontList();
        const half = Math.ceil(list.length / 2);

        const buildPage = (fonts) =>
            fonts.map(f => `*${f.id}.* ${f.name}\n   ${f.sample}`).join('\n\n');

        await reply(
            `🔤 *SCRIPTURAL ARCHIVE — PAGE I*\n\n` +
            buildPage(list.slice(0, half)) +
            `\n\n_Use .setfont <number> to apply a new aesthetic._`
        );

        await reply(
            `🔤 *SCRIPTURAL ARCHIVE — PAGE II*\n\n` +
            buildPage(list.slice(half)) +
            `\n\n_Use .setfont 1 to return to the Standard Script._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
