/**
 * Fibonacci — Invoke Spiral Genesis
 * Usage: .fibonacci [n]
 */

module.exports = {
    name: 'fibonacci',
    aliases: ['fib', 'spiral', 'genesis', 'sacredgeo'],
    description: 'Trace the growth of the universe through Spiral Genesis.',
    category: 'utility',
    async execute({ args, reply }) {
        // Limit n to a safe growth cycle for the sanctuary
        const n = Math.min(parseInt(args[0]) || 10, 50);
        
        const a = [0, 1];
        while (a.length < n) {
            a.push(a[a.length - 1] + a[a.length - 2]);
        }
        
        return reply(
            `🌀 *Spiral Genesis (${n} cycles)*\n\n` +
            `\`${a.slice(0, n).join(', ')}\`\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
