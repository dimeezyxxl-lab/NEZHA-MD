/**
 * Uid — Invoke Signature of the Unbound
 * Usage: .uid
 */

module.exports = {
    name: 'uid',
    aliases: ['uuid', 'signature', 'unbound'],
    description: 'Manifest a unique Signature of the Unbound.',
    category: 'utility',
    async execute({ reply }) {
        // Generating a unique seal from the void
        const signature = require('crypto').randomUUID();
        
        return reply(
            `🔑 *Signature of the Unbound*\n\n` +
            `*${signature}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
