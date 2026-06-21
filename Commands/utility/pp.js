/**
 * Pp — Reveal Mirror of Souls
 * Usage: 
 *   .pp
 *   .pp @user
 *   reply .pp
 */

module.exports = {
    name: 'pp',
    aliases: ['profilepic', 'getpp', 'mirror', 'soulview'],
    description: 'Reveal the Mirror of Souls to view a target\'s avatar.',
    category: 'utility',
    async execute({ sock, msg, from, sender, reply }) {
        try {
            // Resolve the target soul: mention > reply > initiator
            const ctx = msg.message?.extendedTextMessage?.contextInfo;
            const mentioned = ctx?.mentionedJid?.[0];
            const replied   = ctx?.participant;
            const target    = mentioned || replied || sender;
            const name      = target.split('@')[0].split(':')[0];

            let url = null;
            try { url = await sock.profilePictureUrl(target, 'image'); } catch (_) {}

            if (!url) {
                return reply(
                    `🚫 *Mirror of Souls*\n\n` +
                    `The soul @${name} remains hidden from view or has no manifest image.\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            }

            await sock.sendMessage(from, {
                image: { url },
                caption: `📸 *Mirror of Souls: @${name}*\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                mentions: [target],
            }, { quoted: msg });
        } catch (e) {
            console.error('[pp]', e.message);
            reply('❌ _The mirror is clouded; the Lotus Prince could not manifest this image._');
        }
    }
};
