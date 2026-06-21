/**
 * LCM — Determine Universal Convergence
 * Usage: .lcm <a> <b>
 */

module.exports = {
    name: 'lcm',
    aliases: ['leastmultiple', 'convergence', 'meet'],
    description: 'Calculate the point of Universal Convergence (LCM) for two values.',
    category: 'utility',
    async execute({ args, reply }) {
        const a = Math.abs(parseInt(args[0])), b = Math.abs(parseInt(args[1]));
        
        if (isNaN(a) || isNaN(b) || a === 0 || b === 0) {
            return reply(
                `🔗 *Universal Convergence*\n\n` +
                `The Lotus Prince seeks the first point where two paths meet.\n\n` +
                `Usage: .lcm <a> <b>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        // Euclidean algorithm for GCD to find LCM
        const g = (x, y) => (y ? g(y, x % y) : x);
        const result = (a * b) / g(a, b);
        
        return reply(
            `🔗 *Universal Convergence Achieved*\n\n` +
            `The paths of ${a} and ${b} converge at: *${result}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
