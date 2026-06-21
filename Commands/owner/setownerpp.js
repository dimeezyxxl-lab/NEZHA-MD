/**
 * SetOwnerPP — Reincarnate Lotus Iconography
 * Usage: Reply to an image with .setownerpp
 */

'use strict';
const { downloadMediaMessage } = require('@crysnovax/baileys');

module.exports = {
    name: 'setownerpp',
    aliases: ['setmypp', 'setbotpp', 'setpp', 'iconography', 'visage'],
    description: 'Reincarnate the divine visage (Lotus Iconography) of the bot.',
    category: 'owner',

    async execute({ sock, msg, from, reply, isOwner }) {
        if (!isOwner) return reply('🔒 _This divine act is reserved for the Lotus Prince._');

        const quoted  = msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const target  = quoted || msg?.message;
        const hasImg  = target?.imageMessage;

        if (!hasImg) return reply('❌ _To reincarnate the visage, reply to a sacred image with .setownerpp_');

        try {
            reply('⏳ _Manifesting new iconography..._');
            
            const buffer = await downloadMediaMessage(
                { message: target, key: msg.key },
                'buffer',
                {}
            );
            
            const botJid = sock.user?.id;
            await sock.updateProfilePicture(botJid, buffer);
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            
            reply(
                `╭─❒ ◈ *𝗡𝗘𝗭𝗛𝗔-𝗠𝗗* ❒\n` +
                `│ ✅ *Lotus Iconography manifested!*\n` +
                `│ _The Prince’s visage has been renewed._\n` +
                `╰─⛧ _𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲 𝗩𝗲𝗿𝗶𝗳𝗶𝓮𝓭_`
            );
        } catch (e) {
            console.error('[setownerpp]', e.message);
            reply('❌ _The ritual of manifestation failed; the image may be corrupted._');
        }
    },
};
