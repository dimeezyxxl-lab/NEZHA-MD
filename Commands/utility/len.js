/**
 * Len — Perform Dimension Assessment
 * Usage: .len <text>
 */

module.exports = {
    name: 'len',
    aliases: ['length', 'size', 'dimension'],
    description: 'Calculate the total physical dimension of your message.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to assess._');
        
        try {
            // Assessing the total footprint
            const length = text.length;
            
            return reply(
                `📏 *Dimension Assessment*\n\n` +
                `Message: \`${text}\`\n` +
                `Total Footprint: *${length} characters*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The dimension could not be calculated. The message exists in a state of flux._');
        }
    }
};
