/**
 * LowerAll — Invoke Universal Humility
 * Usage: .lowerall <text>
 */

module.exports = {
    name: 'lowerall',
    aliases: ['humbleall', 'quietall', 'lowerall'],
    description: 'Command every character to return to Universal Humility.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to humble._');
        
        try {
            // Stripping away all stature
            const out = text.toLowerCase();
            
            return reply(
                `🔡 *Universal Humility*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The transformation could not be completed. The text resists the Lotus Prince\'s command._');
        }
    }
};
