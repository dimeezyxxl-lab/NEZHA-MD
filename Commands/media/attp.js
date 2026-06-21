/**
 * ATTP — Perform a Celestial Script Manifestation
 * Usage: .attp <text>
 */

module.exports = {
    name: 'attp',
    aliases: ['animatedttp', 'text2gif', 'manifest'],
    description: 'Manifest dynamic text as a Celestial Script sticker.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `✨ *Celestial Script Manifestation*\n\n` +
                `Usage: .attp <text>\n` +
                `Example: .attp Divine Wisdom`
            );
        }

        const text = args.join(' ');
        
        try {
            const encodedText = encodeURIComponent(text);
            const gifUrl = `https://api.lolhuman.xyz/api/attp?apikey=free&text=${encodedText}`;
            
            await sock.sendMessage(from, {
                sticker: { url: gifUrl }
            }, { quoted: msg });
        } catch (err) {
            reply('❌ *Manifestation failed:* The celestial script could not be brought to life.');
        }
    }
};
