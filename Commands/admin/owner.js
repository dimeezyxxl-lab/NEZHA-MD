/**
 * Owner Command — Sleek owner card
 * Usage: .owner
 */

const config = require('../../config');

module.exports = {
    name: 'owner',
    aliases: ['contact', 'creator', 'dev'],
    description: 'Show bot owner contact information',
    category: 'admin',

    async execute({ sock, msg, from, reply }) {
        const owner = config.owner?.name || 'Lotus Prince';
        const tg    = config.owner?.telegram || 't.me/YourTelegram'; // Update this in your config

        const caption =
`╭─── *${config.botName || 'NEZHA MD'}* ───╮
│
│  👤 Sovereign · ${owner}
│  ✈️  Celestial Link · ${tg}
│
╰─────────────╯

> _Follow the path to reach the Lotus Prince_`;

        try {
            await sock.sendMessage(from, {
                text: caption,
                footer: `🐦‍🔥 ${owner}`,
                templateButtons: [
                    {
                        index: 1,
                        urlButton: {
                            displayText: '✈️  Reach me on Telegram',
                            url: `https://${tg.replace(/^https?:\/\//, '')}`
                        }
                    }
                ],
                headerType: 1
            }, { quoted: msg });
        } catch (e) {
            await reply(caption);
        }
    }
};
