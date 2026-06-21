/**
 * Tagall Command — Tags every member in the group with a beautiful, classy message
 */

const config = require('../../config');

module.exports = {
    name: 'tagall',
    aliases: ['mentionall', 'everyone'],
    description: 'Tag all members in the group',
    category: 'admin',

    async execute({ sock, msg, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Admin Gate
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to summon the entire realm.');

        const customText = args.join(' ') || '📢 The Lotus Prince calls for your attention!';

        try {
            const metadata     = await sock.groupMetadata(from);
            const participants = metadata.participants.map(p => p.id);
            const groupName    = metadata.subject || 'Group';
            const total        = participants.length;

            const divider = '🐦‍🔥━━━━━━━━━━━━━━━━━━━━━━━━━━━🐦‍🔥';

            let message =
`${divider}
╔══〔 ⚔️  *${config.botName || 'NEZHA MD'}*  ⚔️ 〕══╗

  📣  *${customText}*

${divider}

🔔 *${groupName}* — All ${total} souls are being summoned by the Lotus Prince:

`;

            participants.forEach((p, i) => {
                const num = p.split('@')[0];
                message += `  〄 @${num}\n`;
            });

            message +=
`
${divider}
┊ 🐦‍🔥 *Powered by ${config.botName || 'NEZHA MD'} v${config.version || '2.0'}*
╚═════════════════════════════════════════╝`;

            await sock.sendMessage(from, {
                text:     message,
                mentions: participants,
            }, { quoted: msg });

        } catch (err) {
            await reply(
`╔══════════════════════════════╗
║   ❌  *SUMMONING FAILED*       ║
╚══════════════════════════════╝

_Reason: A disturbance in the heavens: ${err.message}_`
            );
        }
    }
};
