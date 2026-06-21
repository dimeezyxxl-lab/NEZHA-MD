/**
 * Leet — Invoke Digital Cipher-Speak
 * Usage: .leet <text>
 */

module.exports = {
    name: 'leet',
    aliases: ['cipherspeak', 'leetspeak', 'digital'],
    description: 'Reconfigure your words into the cryptic Digital Cipher-Speak.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('📜 _Present the message you wish the Lotus Prince to cipher._');
        
        try {
            // Reconfiguring text into machine-runes
            const map = { a:'4',e:'3',i:'1',o:'0',s:'5',t:'7', A:'4',E:'3',I:'1',O:'0',S:'5',T:'7' };
            const out = text.replace(/[aeiostAEIOST]/g, c => map[c]);
            
            return reply(
                `👾 *Digital Cipher-Speak*\n\n` +
                `Original: ${text}\n` +
                `Ciphered: *${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The ciphering process has encountered a distortion in the digital flow._');
        }
    }
};
