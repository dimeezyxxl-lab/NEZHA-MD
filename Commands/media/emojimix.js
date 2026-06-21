/**
 * EmojiMix — Perform a Celestial Essence Fusion
 * Usage: .emojimix <emoji1> <emoji2>
 */

module.exports = {
    name: 'emojimix',
    aliases: ['emix', 'combineemoji', 'fusion'],
    description: 'Perform a Celestial Essence Fusion to manifest a new joy.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        if (args.length < 2) {
            return reply(
                `✨ *Celestial Essence Fusion*\n\n` +
                `Usage: .emojimix <emoji1> <emoji2>\n` +
                `Example: .emojimix 😂 ❤️`
            );
        }

        const emoji1 = args[0];
        const emoji2 = args[1];
        
        try {
            // Get emoji codes for the fusion
            const getCode = (emoji) => {
                const code = emoji.codePointAt(0).toString(16);
                return 'u' + code;
            };
            
            const code1 = getCode(emoji1);
            const code2 = getCode(emoji2);
            
            // The sacred link for the fusion
            const mixUrl = `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/${code1}/${code1}_${code2}.png`;
            
            await sock.sendMessage(from, {
                image: { url: mixUrl },
                caption: `✨ *Celestial Essence Fusion*\n\n${emoji1} + ${emoji2} = *Manifested Joy!*`
            }, { quoted: msg });
        } catch (err) {
            reply('❌ *Fusion failed:* The essences could not be harmonized. Try a different pairing.');
        }
    }
};
