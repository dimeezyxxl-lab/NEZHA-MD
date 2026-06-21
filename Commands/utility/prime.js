/**
 * Prime — Test for Divine Singularity
 * Usage: .prime <number>
 */

module.exports = {
    name: 'prime',
    aliases: ['primecheck', 'singularity'],
    description: 'Test if a number holds the state of Divine Singularity.',
    category: 'utility',
    async execute({ args, reply }) {
        const n = parseInt(args[0]);
        
        if (isNaN(n) || n < 0) {
            return reply(
                `💠 *Divine Singularity*\n\n` +
                `The Lotus Prince inspects the integrity of your number.\n\n` +
                `Usage: .prime <number>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        if (n < 2) {
            return reply(
                `❌ *Divine Singularity Denied*\n\n` +
                `${n} lacks the essence of a singular prime.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) {
                return reply(
                    `❌ *Divine Singularity Denied*\n\n` +
                    `${n} is divisible by ${i}; it is a fractured entity.\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            }
        }
        
        return reply(
            `✅ *Divine Singularity Achieved*\n\n` +
            `${n} is a pure, prime entity.\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
