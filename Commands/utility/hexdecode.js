/**
 * HexDecode — Initiate Hex Unveiling
 * Usage: .hexdecode <hex_string>
 */

module.exports = {
    name: 'hexdecode',
    aliases: ['hexunveil', 'unhex', 'hexdecode'],
    description: 'Decipher the cryptic base-16 scripts into plain truth.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the hex script you wish the Lotus Prince to unveil._');
        
        try {
            // Unveiling the hidden essence
            const out = Buffer.from(text, 'hex').toString('utf8');
            
            return reply(
                `🗝️ *Hex Unveiling*\n\n` +
                `Encrypted: \`${text}\`\n` +
                `Revealed: *${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The hex script is corrupted or non-existent. The Lotus Prince cannot unveil the void._');
        }
    }
};
