/**
 * CharCount — Initiate Essence Measurement
 * Usage: .charcount <text>
 */

module.exports = {
    name: 'charcount',
    aliases: ['essence', 'measure', 'count'],
    description: 'Determine the concentrated essence of your message.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to measure._');
        
        try {
            // Measuring the core existence
            const count = text.replace(/\s/g, '').length;
            
            return reply(
                `⚖️ *Essence Measurement*\n\n` +
                `Message: \`${text}\`\n` +
                `Concentrated Length: *${count} characters*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The essence measurement could not be performed._');
        }
    }
};
