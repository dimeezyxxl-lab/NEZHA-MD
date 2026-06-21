/**
 * Channel — Share the Official Nezha-md Sanctuary
 * Usage: .channel
 */

const config = require('../../config');

// Update these to match your new branding
const CHANNEL_JID  = ''; 
const CHANNEL_NAME = 'NEZHA-MD';
const CHANNEL_URL  = 'https://whatsapp.com/channel/0029Vb7sxbjHVvTcUSLI4M0L';

module.exports = {
    name: 'channel',
    aliases: ['newsletter', 'sanctuary'],
    description: 'Share the official Nezha-md celestial channel.',
    category: 'general',

    async execute({ sock, msg, from, reply }) {
        const url = config.owner?.channel || CHANNEL_URL;
        const text =
`╭━━━〔 🏵️ *𝙉𝙀𝙕𝙃𝘼-𝙈𝘿* 🏵️ 〕━━━╮
┃ ✦ *Domain* : ${CHANNEL_NAME}
┃ ✦ *Essence* : Updates · Divine Drops · Wisdom
┃ ✦ *Authority* : Xyz Tech
┃
┃ 🔗 *Join the Celestial Flow:*
┃    ${url}
┃
┃ ⤷ _Or tap the pill above to transcend._
╰━━━━━━━━━━━━━━━━━━━━━━━━━╯
       🏵️  𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙉𝙀𝙕𝙃𝘼 𝙈𝘿  🏵️`;

        try {
            await sock.sendMessage(from, {
                text,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid:   CHANNEL_JID,
                        newsletterName:  CHANNEL_NAME,
                        serverMessageId: 143,
                    },
                    externalAdReply: {
                        title:        CHANNEL_NAME,
                        body:         'Tap to enter the celestial sanctuary',
                        mediaType:    1,
                        sourceUrl:    url,
                        thumbnailUrl: 'https://i.imgur.com/0nF1lKx.png',
                        renderLargerThumbnail: false,
                        showAdAttribution: false,
                    },
                },
            }, { quoted: msg });
        } catch (_) {
            await reply(text);
        }
    }
};
