'use strict';

module.exports = {
    name: 'getgpp',
    aliases: ['grouppic', 'gpp', 'grouppp'],
    description: 'Get the group profile picture',
    category: 'admin',

    async execute({ sock, msg, from, reply, isGroup }) {
        if (!isGroup) return reply('⚔️ This command is restricted to group battlefields.');

        try {
            const ppUrl = await sock.profilePictureUrl(from, 'image');
            await sock.sendMessage(from, {
                image: { url: ppUrl },
                caption:
                    `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 ❒\n` +
                    `│ 🖼️ *Celestial Group Portrait*\n` +
                    `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋𝙧𝙞𝙣𝙘𝙚`,
            }, { quoted: msg });
        } catch (_) {
            reply('❌ This realm has no portrait set.');
        }
    },
};
