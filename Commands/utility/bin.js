/**
 * Bin — Initiate Binary Genesis
 * Usage: .bin <text>
 */

module.exports = {
    name: 'bin',
    aliases: ['binary', 'genesis', 'pulse'],
    description: 'Deconstruct language into the foundational pulses of Binary Genesis.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the text you wish to return to its genesis._');
        
        try {
            // Generating the binary pulse
            const out = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            
            return reply(
                `⚡ *Binary Genesis*\n\n` +
                `\`\`\`${out}\`\`\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The genesis could not be realized. The essence provided is corrupted._');
        }
    }
};
