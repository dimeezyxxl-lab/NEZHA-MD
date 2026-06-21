'use strict';
const { downloadMediaMessage } = require('@crysnovax/baileys');

module.exports = {
    name: 'setgpp',
    aliases: ['setgrouppic', 'setgpic'],
    description: 'Set the group profile picture (reply to an image) — admin only',
    category: 'admin',

    async execute({ sock, msg, from, reply, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to alter the realm\'s image.');

        // Find the image — quoted message or the message itself
        const quoted  = msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const target  = quoted || msg?.message;
        const imgType = target?.imageMessage ? 'imageMessage' : null;

        if (!imgType) return reply('❌ Please reply to an image with .setgpp');

        try {
            reply('⏳ Manifesting the new visage...');
            const buffer = await downloadMediaMessage(
                { message: target, key: msg.key },
                'buffer',
                {}
            );
            await sock.updateProfilePicture(from, buffer);
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            reply(
                `╭─❒ ◈ 𝙉𝙀𝙕𝙃𝘼 𝙈𝘿 ❒\n` +
                `│ ✅ *The realm’s visage has been updated!*\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
            );
        } catch (e) {
            console.error('[setgpp]', e.message);
            reply('❌ A disturbance in the heavens: Failed to update the group visage.');
        }
    },
};
