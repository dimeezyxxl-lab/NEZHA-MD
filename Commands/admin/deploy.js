'use strict';

module.exports = {
    name: 'deploy',
    aliases: ['pair', 'pairing', 'getpair'],
    description: 'Get the bot pairing/deployment link',
    category: 'admin',

    async execute({ sock, msg, from, reply }) {
        const PAIR_URL  = 'https://pair-site-91ob.onrender.com/';
        const PREVIEW   = `https://api.microlink.io/?url=${encodeURIComponent(PAIR_URL)}&screenshot=true&meta=false&embed=screenshot.url`;

        const card =
            `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 𝗗𝗘𝗣𝗟𝗢𝗬 ❒\n` +
            `│\n` +
            `│  🚀 *Summon Your Own Bot*\n` +
            `│\n` +
            `│  📌 *Step 1:* Open the link below\n` +
            `│  📌 *Step 2:* Enter your mobile number\n` +
            `│  📌 *Step 3:* Enter the pairing code\n` +
            `│  📌 *Step 4:* The Lotus Prince is live! 🎉\n` +
            `│\n` +
            `│  🔗 *Pairing Link:*\n` +
            `│  ${PAIR_URL}\n` +
            `│\n` +
            `│  ⚡ _Powered by 𝙉𝙀𝙕𝙃𝘼 𝙈𝘿_\n` +
            `│  📩 t.me/Dimeezy1\n` +
            `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋𝙧𝙞𝙣𝙘𝙚`;

        // Try to send with screenshot preview image
        try {
            await sock.sendMessage(from, {
                image: { url: PREVIEW },
                caption: card,
            }, { quoted: msg });
            return;
        } catch (_) {}

        // Fallback: text only
        await reply(card);
    },
};
