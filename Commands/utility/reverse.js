/**
 * Reverse — Invoke Temporal Inversion
 * Usage: .reverse <text>
 */

module.exports = {
    name: 'reverse',
    aliases: ['backwards', 'rev', 'inversion'],
    description: 'Ripple the fabric of text with Temporal Inversion.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🔄 *Temporal Inversion*\n\n` +
                `The Lotus Prince awaits the text to be inverted.\n\n` +
                `Usage: .reverse <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const text = args.join(' ');
        const reversed = text.split('').reverse().join('');
        
        reply(
            `🔄 *Temporal Inversion Complete*\n\n` +
            `Original: ${text}\n` +
            `Inverted: *${reversed}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
