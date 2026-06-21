/**
 * Base — Perform Universal Transmutation
 * Usage: .base <num> <fromBase> <toBase>
 */

module.exports = {
    name: 'base',
    aliases: ['transmute', 'convert', 'baseconvert'],
    description: 'Transmute a number between different numerical dimensions (bases 2-36).',
    category: 'utility',
    async execute({ args, reply }) {
        const [n, fb, tb] = args;
        const f = parseInt(fb), t = parseInt(tb);
        
        if (!n || isNaN(f) || isNaN(t) || f < 2 || f > 36 || t < 2 || t > 36) {
            return reply(
                `⚖️ *Universal Transmutation*\n\n` +
                `_Usage: .base <num> <fromBase 2-36> <toBase 2-36>_\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const v = parseInt(n, f);
        if (isNaN(v)) return reply('❌ _The numerical essence is incompatible with the origin base._');
        
        return reply(
            `🔄 *Transmutation Successful*\n\n` +
            `• Origin: ${n} (Base ${f})\n` +
            `• Result: *${v.toString(t).toUpperCase()}* (Base ${t})\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
