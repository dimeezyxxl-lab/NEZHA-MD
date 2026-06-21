/**
 * Upper — Invoke Voice of the Heavens
 * Usage: .upper <text>
 */

module.exports = {
    name: 'upper',
    aliases: ['uppercase', 'caps', 'heavens'],
    description: 'Project your words with the intensity of the Voice of the Heavens.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🔠 *Voice of the Heavens*\n\n` +
                `The Lotus Prince awaits the words you wish to resonate.\n\n` +
                `Usage: .upper <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const upperText = args.join(' ').toUpperCase();

        reply(
            `🔠 *Voice of the Heavens Echoes*\n\n` +
            `*${upperText}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
