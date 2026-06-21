/**
 * Repo Command — classy canvas card showing the bot network + WhatsApp channel
 * Usage: .repo
 */

'use strict';

const config = require('../../config');
const { renderRepoCard } = require('../../utils/canvasRender');

const SERVERS = [
    { emoji: '🔥', label: 'Nezha-MD Alpha',    url: 'https://t.me/NezhaMD_bot' },
    { emoji: '⚡', label: 'Lotus-Verse Bot',   url: 'https://t.me/LotusVerse_bot' },
    { emoji: '✨', label: 'Celestial-Link Bot', url: 'https://t.me/CelestialLink_bot' },
];

const CHANNEL_URL  = 'https://whatsapp.com/channel/0029Vb7sxbjHVvTcUSLI4M0L';
const CHANNEL_JID  = '';
const CHANNEL_NAME = 'NEZHA-MD';

function newsletterCtx() {
    return {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid:   CHANNEL_JID,
            newsletterName:  CHANNEL_NAME,
            serverMessageId: 143,
        },
    };
}

function caption(botName) {
    const lines = SERVERS.map(s => `${s.emoji} *${s.label}*\n› ${s.url}`).join('\n\n');
    return (
        `╭━━━〔 *⚔️  ${botName.toUpperCase()}  ⚔️* 〕━━━╮\n` +
        `│  𝘾𝙀𝙇𝙀𝙎𝙏𝙄𝘼𝙇 𝙉𝙀𝙏𝙒𝙊𝙍𝙆 · 𝘿𝙄𝙍𝙀𝘾𝙏𝙊𝙍𝙔\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
        `${lines}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📣 *Official WhatsApp Channel*\n› ${CHANNEL_URL}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 🔥 _Powered by ${botName}_`
    );
}

module.exports = {
    name:        'repo',
    aliases:     ['servers', 'bots', 'botservers', 'network'],
    description: 'Show the official bot network + WhatsApp channel',
    category:    'admin',

    async execute({ sock, msg, from, reply }) {
        const botName = config.botName || 'NEZHA MD';

        try {
            const buf = await renderRepoCard({
                botName,
                tagline: 'Lotus Prince · Celestial Network',
                servers: SERVERS,
                channelLabel: 'WhatsApp Channel',
                channelUrl:   CHANNEL_URL,
            });

            await sock.sendMessage(from, {
                image: buf,
                caption: caption(botName),
                contextInfo: newsletterCtx(),
            }, { quoted: msg });
        } catch (e) {
            console.error('[repo]', e.message);
            // Plain-text fallback
            try {
                await sock.sendMessage(from, {
                    text: caption(botName),
                    contextInfo: newsletterCtx(),
                }, { quoted: msg });
            } catch {
                await reply(caption(botName));
            }
        }
    },
};
