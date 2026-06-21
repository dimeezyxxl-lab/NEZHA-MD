/**
 * Vapor — Invoke Aetheric Expansion
 * Usage: .vapor <text>
 */

module.exports = {
    name: 'vapor',
    aliases: ['vaporwave', 'aether', 'stretch'],
    description: 'Stretch your words into the void with Aetheric Expansion.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `💨 *Aetheric Expansion*\n\n` +
                `The Lotus Prince awaits the words you wish to vaporize.\n\n` +
                `Usage: .vapor <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            // Stretching the text into the ethereal realm
            const out = text.split('').join(' ');
            
            return reply(
                `💨 *Expansion Manifested*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The expansion faltered; the Lotus Prince could not dissipate these words into the aether._');
        }
    }
};
