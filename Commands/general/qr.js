/**
 * QR — Manifest a Celestial Sigil
 * Usage: .qr <text or url>
 */

module.exports = {
    name: 'qr',
    aliases: ['sigil', 'encode'],
    description: 'Manifest a celestial sigil (QR code) for the given information.',
    category: 'general',
    async execute({ args, reply, sock, msg, from }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('❌ *Manifestation failed.* Please provide the information you wish to encode (e.g., `.qr https://nezha-md.com`).');
        }
        
        const url = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=' + encodeURIComponent(text);
        
        try {
            await sock.sendMessage(from, { 
                image: { url }, 
                caption: `🔳 *Celestial Sigil*\n\n_Encoded essence:_\n${text}` 
            }, { quoted: msg });
        } catch (e) {
            return reply(`🔳 *Celestial Sigil*\n\nUnable to manifest the image directly. Access the sigil here:\n${url}`);
        }
    }
};
