/**
 * AFK — Enter Celestial Meditation
 * Usage : .afk [reason]
 */

'use strict';

const afkUsers = new Map();

/* ─────────────────────────────────────────────
   DURATION FORMATTER (Celestial cycles)
───────────────────────────────────────────── */
function formatDuration(ms) {
    const total = Math.floor(ms / 1000);
    const d     = Math.floor(total / 86400);
    const h     = Math.floor((total % 86400) / 3600);
    const m     = Math.floor((total % 3600)  / 60);
    const s     = total % 60;
    const parts = [];
    if (d) parts.push(`${d}d`);
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    if (s || !parts.length) parts.push(`${s}s`);
    return parts.join(' ');
}

function getContextInfo(msg) {
    const m = msg?.message || {};
    return (
        m.extendedTextMessage?.contextInfo ||
        m.imageMessage?.contextInfo        ||
        m.videoMessage?.contextInfo        ||
        m.audioMessage?.contextInfo        ||
        m.documentMessage?.contextInfo     ||
        null
    );
}

module.exports = {
    name: 'afk',
    aliases: ['away', 'meditate', 'meditation'],
    description: 'Enter a state of celestial meditation.',
    category: 'group',

    async execute({ reply, args, sender, from, pushName, msg }) {
        const reason  = args.join(' ').trim() || 'Seeking divine wisdom';
        const display = pushName || msg?.pushName || sender.split('@')[0];
        const afkKey  = `${from}_${sender}`;

        afkUsers.set(afkKey, {
            reason,
            time: Date.now(),
            name: display,
        });

        await reply(
            `*🏵️ CELESTIAL MEDITATION ACTIVATED*\n` +
            `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
            `👤 *Practitioner :* @${sender.split('@')[0]}\n` +
            `💬 *Intent :* ${reason}\n` +
            `🕐 *Commenced :* Just now\n` +
            `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
            `_The Oracle will guide those who seek you_\n` +
            `_while you remain in the heavens._\n\n` +
            `> Send any message to return to the material realm.`
        );
    },

    async checkAFK(sock, msg, from, sender) {
        const afkKey = `${from}_${sender}`;
        if (!afkUsers.has(afkKey)) return false;

        const afkData  = afkUsers.get(afkKey);
        const duration = formatDuration(Date.now() - afkData.time);

        afkUsers.delete(afkKey);

        try {
            await sock.sendMessage(from, {
                text:
                    `*🎉 RETURN TO THE MATERIAL REALM*\n` +
                    `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
                    `👋 Welcome back, @${sender.split('@')[0]}!\n\n` +
                    `✅ *Meditation concluded*\n` +
                    `⏱️ *Time in the heavens :* ${duration}\n` +
                    `📝 *Intent :* ${afkData.reason}\n` +
                    `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
                    `_The Lotus Prince welcomes your return_ 💪`,
                mentions: [sender],
            });
        } catch (e) { }

        return true;
    },

    async checkMentionedAFK(sock, msg, from) {
        const toCheck = new Set();
        const ctx = getContextInfo(msg);
        for (const jid of (ctx?.mentionedJid || [])) { if (jid) toCheck.add(jid); }
        if (ctx?.participant) toCheck.add(ctx.participant);
        if (!toCheck.size) return;

        const sender = msg?.key?.participant || msg?.key?.remoteJid || '';
        for (const jid of toCheck) {
            if (jid === sender) continue;
            const afkData = afkUsers.get(`${from}_${jid}`);
            if (!afkData) continue;

            const duration = formatDuration(Date.now() - afkData.time);
            try {
                await sock.sendMessage(from, {
                    text:
                        `*💤 CELESTIAL MEDITATION*\n` +
                        `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
                        `⚠️ @${jid.split('@')[0]} is currently *in deep meditation.*\n\n` +
                        `📝 *Intent :* ${afkData.reason}\n` +
                        `⏱️ *Cycle duration :* ${duration}\n` +
                        `┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n` +
                        `_They shall be notified upon their descent._`,
                    mentions: [jid],
                });
            } catch (e) { }
        }
    },
};
