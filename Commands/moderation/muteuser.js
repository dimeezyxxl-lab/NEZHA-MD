/**
 * MuteUser — Impose Vow of Silence
 * Usage: .muteuser <@user/reply> [time]
 */

const database = require('../../utils/database');

const INDEFINITE = Number.MAX_SAFE_INTEGER;

function parseTime(t) {
    if (!t) return null;
    const m = t.match(/^(\d+)([smhd])$/i);
    if (!m) return null;
    const v = parseInt(m[1]);
    const u = m[2].toLowerCase();
    const x = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return v * x[u];
}

function formatTime(ms) {
    if (ms >= INDEFINITE) return 'an eternity';
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ${h % 24}h`;
    if (h > 0) return `${h}h ${m % 60}m`;
    if (m > 0) return `${m}m ${s % 60}s`;
    return `${s}s`;
}

module.exports = {
    name: 'muteuser',
    aliases: ['mute', 'usermute', 'vowofsilence', 'silence'],
    description: 'Impose a Vow of Silence on a user.',
    category: 'moderation',

    async execute({ sock, msg, from, reply, args, isGroup, isAdmin }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        if (!isAdmin) {
            return reply('🛡️ *Celestial Authority Required!*\n\n❌ _Only those with administrative authority may impose the Vow of Silence._');
        }

        try {
            const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
            const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;

            let targetUser = mentioned[0] || quotedParticipant;
            let timeArg = args[0];

            if (!targetUser && args.length >= 1) {
                const input = (args[0] || '').replace(/[^0-9]/g, '');
                if (input && input.length >= 6) {
                    targetUser = input + '@s.whatsapp.net';
                    timeArg = args[1]; 
                }
            }

            if (!targetUser) {
                return reply(
                    '🔇 *IMPOSE VOW OF SILENCE*\n\n' +
                    'Reply to or mention the one who has disrupted the sanctuary.\n\n' +
                    '*Ritual Usage:*\n' +
                    '• .muteuser              (indefinite silence)\n' +
                    '• .muteuser @user 10m    (temporary silence)\n\n' +
                    '*Time:* 10s · 5m · 2h · 1d  (max 7d)\n' +
                    'Use *.unmuteuser* to restore their voice.'
                );
            }

            let duration, expiresAt;
            if (!timeArg) {
                duration  = INDEFINITE;
                expiresAt = INDEFINITE;
            } else {
                duration = parseTime(timeArg);
                if (!duration) return reply('❌ _Invalid temporal format. Use: 10s, 5m, 2h, or 1d._');
                if (duration > 7 * 86400000) return reply('❌ _The silence cannot exceed 7 days. Omit the time for eternal silence._');
                expiresAt = Date.now() + duration;
            }

            database.setMutedUser(from, targetUser, expiresAt);

            const num = targetUser.split('@')[0];
            const expiresLine = expiresAt >= INDEFINITE
                ? '🔓 Silence remains: Eternal'
                : `🔓 Silence ends: ${new Date(expiresAt).toLocaleString()}`;

            reply(
                `🔇 *VOW OF SILENCE IMPOSED*\n\n` +
                `👤 Subject: @${num}\n` +
                `⏱️ Duration: ${formatTime(duration)}\n` +
                `${expiresLine}\n\n` +
                `_Their whispers shall be purged from the sanctuary until the vow is lifted._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                { mentions: [targetUser] }
            );
        } catch (err) {
            reply('❌ *Imposition failed:* The sanctuary resists.');
        }
    }
};
