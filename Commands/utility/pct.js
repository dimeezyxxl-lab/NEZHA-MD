/**
 * Pct — Determine Proportional Essence
 * Usage: .pct <value> of <total>
 */

module.exports = {
    name: 'pct',
    aliases: ['percentage', 'portion', 'essence'],
    description: 'Extract the Proportional Essence of a given value.',
    category: 'utility',
    async execute({ args, reply }) {
        // Capturing the requested proportion
        const m = args.join(' ').match(/^([\d.]+)\s*(?:%|of|\/)\s*([\d.]+)$/i);
        
        if (!m) {
            return reply(
                `📊 *Proportional Essence*\n\n` +
                `The Lotus Prince measures the vital fraction.\n\n` +
                `Usage: .pct 25 of 200\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const p = +m[1], total = +m[2];
        const result = (p * total) / 100;
        
        return reply(
            `📊 *Proportional Essence Manifested*\n\n` +
            `${p}% of ${total} is *${result}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
