/**
 * GCD — Determine Divine Commonality
 * Usage: .gcd <a> <b>
 */

module.exports = {
    name: 'gcd',
    aliases: ['greatestdiv', 'commonality', 'unity'],
    description: 'Extract the shared essence (GCD) of two numerical values.',
    category: 'utility',
    async execute({ args, reply }) {
        const a = Math.abs(parseInt(args[0])), b = Math.abs(parseInt(args[1]));
        
        if (isNaN(a) || isNaN(b)) {
            return reply(
                `🔗 *Divine Commonality*\n\n` +
                `The Lotus Prince seeks the shared essence of two values.\n\n` +
                `Usage: .gcd <a> <b>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const g = (x, y) => (y ? g(y, x % y) : x);
        const result = g(a, b);
        
        return reply(
            `🔗 *Divine Commonality Revealed*\n\n` +
            `The shared essence of ${a} and ${b} is: *${result}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
