/**
 * Mirror — Invoke Reflective Void
 * Usage: .mirror <text>
 */

module.exports = {
    name: 'mirror',
    aliases: ['reverse', 'reflect', 'voidmirror'],
    description: 'Cast your words into the Reflective Void.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to reflect._');
        
        try {
            // Casting the reflection
            const out = text.split('').reverse().join('');
            
            return reply(
                `🪞 *Reflective Void*\n\n` +
                `Original: ${text}\n` +
                `Reflected: *${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The reflection has shattered; the void cannot mirror this sequence._');
        }
    }
};
