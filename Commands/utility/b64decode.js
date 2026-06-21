/**
 * B64Decode — Initiate Void Unsealing
 * Usage: .b64decode <encoded_text>
 */

module.exports = {
    name: 'b64decode',
    aliases: ['voidunseal', 'decode', 'unveil'],
    description: 'Unseal the truths hidden within the encoded void.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the encoded veil you wish to unseal._');
        
        try {
            // Unsealing the truth
            const out = Buffer.from(text, 'base64').toString('utf8');
            return reply(
                `🔓 *Void Unsealed*\n\n` +
                `\`\`\`${out}\`\`\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The void remains impenetrable. Ensure the encoding is absolute._');
        }
    }
};
