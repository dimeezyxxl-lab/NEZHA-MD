/**
 * Sha1 — Invoke Divine Seal of Entropy
 * Usage: .sha1 <text>
 */

module.exports = {
    name: 'sha1',
    aliases: ['hash', 'seal', 'entropy'],
    description: 'Compress your message into the immutable Divine Seal of Entropy.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('📜 _Present the message you wish the Lotus Prince to bind in the Divine Seal of Entropy._');
        }
        
        try {
            // Binding the essence of the message into an immutable signature
            const out = require('crypto').createHash('sha1').update(text).digest('hex');
            
            return reply(
                `💠 *Divine Seal of Entropy*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The ritual of entropy failed; the Lotus Prince could not forge the seal._');
        }
    }
};
