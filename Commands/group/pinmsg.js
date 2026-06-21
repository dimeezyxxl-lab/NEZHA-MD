/**
 * Pin — Issue a Celestial Decree
 * Usage: .pin [24h|7d|30d] (Reply to message)
 */

const DURATIONS = {
    '24h': 86400,
    '7d':  7  * 86400,
    '30d': 30 * 86400,
};

module.exports = {
    name: 'pin',
    aliases: ['pinmsg', 'pinned', 'decree'],
    description: 'Issue a Celestial Decree to pin a message within the sanctuary.',
    category: 'group',

    async execute({ sock, from, reply, msg, args, isGroup, isAdmin }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        if (!isAdmin) {
            return reply('🛡️ *Restriction:* Only Guardians may issue a Celestial Decree.');
        }

        const ctx = msg.message?.extendedTextMessage?.contextInfo;
        const quoted = ctx?.quotedMessage;
        if (!quoted) {
            return reply(
                '📌 *Missing Decree:* Please reply to a message with `.pin` to affix it as a Celestial Decree.\n\n' +
                'Durations: `.pin` (24h) · `.pin 7d` · `.pin 30d`'
            );
        }

        const quotedKey = {
            remoteJid: from,
            id: ctx.stanzaId,
            fromMe: ctx.participant ? (ctx.participant === (sock.user?.id || '').split(':')[0] + '@s.whatsapp.net') : false,
            participant: ctx.participant,
        };

        const durKey  = (args[0] || '24h').toLowerCase();
        const seconds = DURATIONS[durKey] || DURATIONS['24h'];

        // Attempt the Celestial Binding (Native Pin)
        try {
            await sock.sendMessage(from, {
                pin: quotedKey,
                type: 1,
                time: seconds,
            });
            return reply(`📌 *Celestial Decree issued:* The message shall remain fixed for *${durKey}*.`);
        } catch (err) {
            console.error('[Pin] Celestial Binding failed, falling back:', err?.message || err);
        }

        // Fallback: Manifest the message in the sanctuary
        const text = quoted.conversation
            || quoted.extendedTextMessage?.text
            || quoted.imageMessage?.caption
            || quoted.videoMessage?.caption
            || '[Essence content]';
            
        return reply(
            `📌 *CELESTIAL DECREE*\n` +
            `${'─'.repeat(20)}\n\n` +
            `${text}\n\n` +
            `${'─'.repeat(20)}\n` +
            `_Decreed by a Guardian (Sanctuary Manifestation)_`
        );
    }
};
