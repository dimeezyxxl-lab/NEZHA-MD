/**
 * MD5 — Generate Signature of the Void
 * Usage: .md5 <text>
 */

module.exports = {
    name: 'md5',
    aliases: ['hash', 'signature', 'voidsign'],
    description: 'Condense your message into a unique Signature of the Void.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to imprint with a signature._');
        
        try {
            // Generating the unique essence mark
            const out = require('crypto').createHash('md5').update(text).digest('hex');
            
            return reply(
                `💠 *Signature of the Void*\n\n` +
                `Original: ${text}\n` +
                `Signature: \`${out}\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The void is unstable; the signature could not be manifested._');
        }
    }
};
