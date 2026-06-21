/**
 * Mock — Invoke Dissonant Echo
 * Usage: .mock <text>
 */

module.exports = {
    name: 'mock',
    aliases: ['mocker', 'dissonance', 'echo'],
    description: 'Mimic your words with the rhythmic Dissonant Echo.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message the Lotus Prince shall echo._');
        
        try {
            // Reconfiguring text into a shifting cadence
            const out = text.split('').map((c, i) => 
                i % 2 ? c.toLowerCase() : c.toUpperCase()
            ).join('');
            
            return reply(
                `🎭 *Dissonant Echo*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The echo faltered; the cadence was too chaotic for the Lotus Prince to replicate._');
        }
    }
};
