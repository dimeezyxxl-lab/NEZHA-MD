/**
 * Urldecode — Invoke Unraveler of Obscured Paths
 * Usage: .urldecode <encoded_text>
 */

module.exports = {
    name: 'urldecode',
    aliases: ['decodeurl', 'unravel'],
    description: 'Unravel the obscured paths hidden within encoded strings.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `🌀 *Unraveler of Obscured Paths*\n\n` +
                `The Lotus Prince awaits the encoded path you wish to unveil.\n\n` +
                `Usage: .urldecode <encoded_text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        try {
            // Stripping the veils to reveal the true path
            const out = decodeURIComponent(text);
            
            return reply(
                `🌀 *Path Unraveled*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The path is too distorted; the Lotus Prince could not unravel these veils._');
        }
    }
};
