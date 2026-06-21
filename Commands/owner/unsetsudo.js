/**
 * UnsetSudo — Exile a Disciple
 * Usage: .unsetsudo (reply / @tag / number / list)
 */
'use strict';

function resolveTargetJid(msg, args) {
    const ctx =
        msg.message?.extendedTextMessage?.contextInfo ||
        msg.message?.imageMessage?.contextInfo ||
        msg.message?.videoMessage?.contextInfo ||
        msg.message?.audioMessage?.contextInfo ||
        msg.message?.stickerMessage?.contextInfo ||
        msg.message?.buttonsResponseMessage?.contextInfo ||
        msg.message?.listResponseMessage?.contextInfo ||
        null;

    if (ctx?.participant) return normalise(ctx.participant);
    if (ctx?.remoteJid && !ctx.remoteJid.endsWith('@g.us')) return normalise(ctx.remoteJid);

    const mentions = ctx?.mentionedJid || [];
    if (mentions?.length > 0) return normalise(mentions[0]);

    if (args[0]) {
        const num = args[0].replace(/[^0-9]/g, '');
        if (num.length >= 7) return `${num}@s.whatsapp.net`;
    }
    return null;
}

function normalise(jid) {
    if (!jid) return null;
    const base = jid.split(':')[0];
    if (base.includes('@')) return base;
    return base + '@s.whatsapp.net';
}

module.exports = {
    name:        'unsetsudo',
    aliases:     ['removesudo', 'delsudo', 'sudolist', 'exile'],
    description: "Exile a Disciple — remove their ability to traverse the sanctuary while veiled.",
    usage:       '.unsetsudo (reply / @tag / number / list)',
    category:    'owner',

    async execute({ sock, msg, from, args, reply, database, phoneNumber, isOwner }) {
        if (!isOwner) {
            return reply('🔒 _This authority is reserved for the Lotus Prince alone._');
        }

        const sub = (args[0] || '').toLowerCase();

        // ── LIST MODE ─────────────────────────────────────────────────────────
        if (sub === 'list' || sub === 'ls' || sub === 'show') {
            const list = database.getSudoUsers(phoneNumber);
            if (!list.length) {
                return reply(`📋 *The Order of Disciples is currently empty.*`);
            }
            const lines = list.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
            return await sock.sendMessage(from, {
                text:
                    `╔══════════════════════════════╗\n` +
                    `║   📋  *ORDER OF DISCIPLES*     ║\n` +
                    `╚══════════════════════════════╝\n\n` +
                    `${lines}\n\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `_Use .unsetsudo @person to cast them into exile._\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                mentions: list
            }, { quoted: msg });
        }

        // ── RESOLVE TARGET ────────────────────────────────────────────────────
        const targetJid = resolveTargetJid(msg, args);

        if (!targetJid) {
            return reply(
                `❓ *Whom do you wish to cast into exile?*\n\n` +
                `• Reply to their missive with *.unsetsudo*\n` +
                `• Tag them: *.unsetsudo @person*\n` +
                `• Use number: *.unsetsudo 2349012345678*\n` +
                `• View the Order: *.unsetsudo list*`
            );
        }

        if (!database.isSudoUser(phoneNumber, targetJid)) {
            return await sock.sendMessage(from, {
                text: `ℹ️ *@${targetJid.split('@')[0]} is not a sworn Disciple.*`,
                mentions: [targetJid]
            }, { quoted: msg });
        }

        database.removeSudoUser(phoneNumber, targetJid);

        const num = targetJid.split('@')[0];
        await sock.sendMessage(from, {
            text:
                `╔══════════════════════════════╗\n` +
                `║   ❌  *DISCIPLE EXILED*        ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `👤 @${num} has been cast into exile.\n\n` +
                `_They no longer possess the power to traverse the sanctuary while veiled._\n\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                `_Use .setsudo to restore their status._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            mentions: [targetJid]
        }, { quoted: msg });
    }
};
