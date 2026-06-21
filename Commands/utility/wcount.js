/**
 * Wcount — Invoke Scribe of the Measured Word
 * Usage: .wcount <text>
 */

module.exports = {
    name: 'wcount',
    aliases: ['wordcount', 'measure', 'tally'],
    description: 'Measure the volume of your words with the Scribe.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `⚖️ *Scribe of the Measured Word*\n\n` +
                `The Lotus Prince awaits the text you wish to measure.\n\n` +
                `Usage: .wcount <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            // Tallying the weight of the expression
            const count = text.split(/\s+/).length;
            
            return reply(
                `⚖️ *Measurement Complete*\n\n` +
                `The total weight of your expression is *${count} words*.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The scales are unbalanced; the Lotus Prince could not measure your words._');
        }
    }
};
