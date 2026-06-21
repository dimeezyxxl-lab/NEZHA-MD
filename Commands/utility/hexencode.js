/**
 * HexEncode — Initiate Hex Veiling
 * Usage: .hexencode <text>
 */

module.exports = {
    name: 'hexencode',
    aliases: ['hexveil', 'tohex'],
    description: 'Cloak your message in the cryptic scripts of Hex Veiling.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to veil._');
        
        try {
            // Veiling the message in base-16
            const out = Buffer.from(text, 'utf8').toString('hex');
            
            return reply(
                `🔐 *Hex Veiling*\n\n` +
                `Original: *${text}*\n` +
                `Veiled: \`${out}\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The veiling process encountered an obstacle. The essence cannot be obscured._');
        }
    }
};
