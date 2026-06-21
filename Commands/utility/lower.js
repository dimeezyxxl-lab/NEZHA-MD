/**
 * Lower — Invoke Divine Humility
 * Usage: .lower <text>
 */

module.exports = {
    name: 'lower',
    aliases: ['lowercase', 'humble', 'quiet'],
    description: 'Command your words to return to a state of Divine Humility.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🔡 *Divine Humility*\n\n` +
                `The Lotus Prince instructs the text to lower its stature.\n\n` +
                `Usage: .lower <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const text = args.join(' ').toLowerCase();
        
        reply(
            `🔡 *Divine Humility Achieved*\n\n` +
            `*${text}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
