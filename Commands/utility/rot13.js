/**
 * Rot13 — Invoke Cipher of the Ascendant
 * Usage: .rot13 <text>
 */

module.exports = {
    name: 'rot13',
    aliases: ['cipher', 'ascendant', 'shift'],
    description: 'Shroud your words in the Cipher of the Ascendant.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('📜 _Present the message you wish the Lotus Prince to shroud in the Cipher of the Ascendant._');
        }
        
        try {
            // Applying the rotation to obscure the essence
            const out = text.replace(/[a-zA-Z]/g, c => 
                String.fromCharCode((c <= 'Z' ? 90 : 122) >= c.charCodeAt(0) + 13 
                    ? c.charCodeAt(0) + 13 
                    : c.charCodeAt(0) - 13)
            );
            
            return reply(
                `💠 *Cipher of the Ascendant*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The cipher has fractured; the Lotus Prince could not rotate these characters._');
        }
    }
};
