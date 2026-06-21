/**
 * Unbin — Invoke Vessel of Binary Revelation
 * Usage: .unbin <binary_sequence>
 */

module.exports = {
    name: 'unbin',
    aliases: ['unbinary', 'reveal', 'revelation'],
    description: 'Transform binary streams into the living word.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `💠 *Vessel of Binary Revelation*\n\n` +
                `The Lotus Prince awaits the binary stream to be unveiled.\n\n` +
                `Usage: .unbin <binary (e.g., 01001000 01101001)>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            // Translating the dualistic nature of machine code into human understanding
            const out = text.split(/\s+/).map(b => String.fromCharCode(parseInt(b, 2))).join('');
            
            return reply(
                `💠 *Revelation Manifested*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The vessel has fractured; the Lotus Prince could not parse this binary sequence._');
        }
    }
};
