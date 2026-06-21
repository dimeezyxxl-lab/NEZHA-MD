/**
 * Ascii — Execute Scripture Decipher
 * Usage: .ascii <text>
 */

module.exports = {
    name: 'ascii',
    aliases: ['scripture', 'decipher', 'rawcode'],
    description: 'Decipher text into its raw numerical essence.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Please provide the scripture you wish to decipher._');
        
        try {
            // Deciphering the essence
            const out = text.split('').map(c => c.charCodeAt(0)).join(' ');
            return reply(
                `⚡ *Scripture Deciphered*\n\n` +
                `\`\`\`${out}\`\`\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The scripture is too complex to be deciphered._');
        }
    }
};
