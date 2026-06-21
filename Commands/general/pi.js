/**
 * Pi — Reveal the Celestial Constant
 * Usage: .pi [decimal places]
 */

module.exports = {
    name: 'pi',
    aliases: ['constant', 'pi'],
    description: 'Manifest the Celestial Constant (π) to N decimal places (max 100).',
    category: 'general',
    async execute({ args, reply }) {
        const n = Math.min(Math.max(parseInt(args[0]) || 10, 1), 100);
        const PI = '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
        
        return reply(
            `🏵️ *The Celestial Constant (π)*\n\n` +
            `Manifested to *${n}* decimal places:\n` +
            `_${PI.slice(0, n + 2)}_`
        );
    }
};
