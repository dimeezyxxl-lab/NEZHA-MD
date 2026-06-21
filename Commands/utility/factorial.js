/**
 * Factorial — Initiate Infinite Sequence
 * Usage: .factorial <n>
 */

module.exports = {
    name: 'factorial',
    aliases: ['fact', 'infinitesequence', 'multiply'],
    description: 'Compute the cumulative result of an Infinite Sequence.',
    category: 'utility',
    async execute({ args, reply }) {
        const n = parseInt(args[0]);
        
        if (isNaN(n) || n < 0 || n > 170) {
            return reply(
                `📉 *Infinite Sequence Error*\n\n` +
                `_The Lotus Prince requires a stable number between 0 and 170 to maintain order._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        let r = 1; 
        for (let i = 2; i <= n; i++) r *= i;
        
        return reply(
            `✨ *Infinite Sequence Completed*\n\n` +
            `Calculation: *${n}!* = \`${r.toLocaleString()}\`\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
