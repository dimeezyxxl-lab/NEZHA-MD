/**
 * TTP — Execute a Celestial Inscription
 * Usage: .ttp <text>
 */

module.exports = {
    name: 'ttp',
    aliases: ['texttopicture', 'text2pic', 'inscription'],
    description: 'Etch your words into a Celestial Inscription.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `📝 *Celestial Inscription*\n\n` +
                `Usage: .ttp <your message>\n` +
                `Example: .ttp The Lotus Prince`
            );
        }

        const text = args.join(' ');
        
        try {
            await sock.sendMessage(from, { react: { text: '✨', key: msg.key } }).catch(() => {});
            
            // Manifesting the text-to-image inscription
            const encodedText = encodeURIComponent(text);
            const imageUrl = `https://api.lolhuman.xyz/api/ttp?apikey=free&text=${encodedText}`;
            
            await sock.sendMessage(from, {
                sticker: { url: imageUrl }
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }).catch(() => {});
        } catch (err) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }).catch(() => {});
            reply('❌ *Inscription failed:* The divine energies could not form the sticker.');
        }
    }
};
