/**
 * B64Encode — Initiate Void Sealing
 * Usage: .b64encode <text>
 */

module.exports = {
    name: 'b64encode',
    aliases: ['voidseal', 'encode', 'veil'],
    description: 'Veil your message within the depths of the encoded void.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the truth you wish to veil in the void._');
        
        try {
            // Sealing the message
            const out = Buffer.from(text, 'utf8').toString('base64');
            return reply(
                `🔒 *Void Sealed*\n\n` +
                `\`\`\`${out}\`\`\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The void could not be sealed. The essence provided is unstable._');
        }
    }
};
