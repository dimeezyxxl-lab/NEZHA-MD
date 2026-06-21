/**
 * SetSudo — Elevate a Disciple
 * Usage: .setsudo (reply / @tag / number / list)
 */
'use strict';

function normalise(jid) {
    if (!jid) return null;
    const base = jid.split(':')[0];
    if (base.includes('@')) return base;
    return base + '@s.whatsapp.net';
}

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

    const mentions = ctx?.mentionedJid || msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentions?.length > 0) return normalise(mentions[0]);

    if (args[0]) {
        const num = args[0].replace(/[^0-9]/g, '');
        if (num.length >= 7) return `${num}@s.whatsapp.net`;
    }
    return null;
}

module.exports = {
    name:        'setsudo',
    aliases:     ['addsudo', 'sudo', 'sudoadd', 'disciple'],
    description: 'Elevate a Disciple — they may traverse the sanctuary even when veiled.',
    usage:       '.setsudo (reply / @tag / number / list)',
    category:    'owner',

    async execute({ sock, msg, from, args, reply, database, phoneNumber, isOwner }) {
        if (!isOwner) {
            return reply('🔒 _This elevation is reserved for the Lotus Prince alone._');
        }

        // ── LIST MODE ─────────────────────────────────────────────────────────
        const sub = (args[0] || '').toLowerCase();
        if (sub === 'list' || sub === 'ls' || sub === 'show') {
            const list = database.getSudoUsers(phoneNumber);
            if (!list.length) {
                return reply(`📋 *The Lotus Prince has yet to name any Disciples.*`);
            }
            const lines = list.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
            return await sock.sendMessage(from, {
                text: `📋 *Order of Disciples* (${list.length})\n${lines}\n\n_.unsetsudo @person to revoke status_`,
                mentions: list
            }, { quoted: msg });
        }

        // ── RESOLVE TARGET ────────────────────────────────────────────────────
        const targetJid = resolveTargetJid(msg, args);

        if (!targetJid) {
            return reply(
                `❓ *Whom do you wish to elevate to Disciple?*\n\n` +
                `• Reply to their missive with *.setsudo*\n` +
                `• Tag them: *.setsudo @person*\n` +
                `• Use number: *.setsudo 2349012345678*\n` +
                `• View the Order: *.setsudo list*`
            );
        }

        const ownerBase = phoneNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        if (targetJid === ownerBase || targetJid === normalise(ownerBase)) {
            return reply(`👑 _The Lotus Prince is the source of all authority._`);
        }

        if (database.isSudoUser(phoneNumber, targetJid)) {
            return await sock.sendMessage(from, {
                text: `ℹ️ *@${targetJid.split('@')[0]} is already a sworn Disciple.*\n_Use .unsetsudo to remove them from the Order._`,
                mentions: [targetJid]
            }, { quoted: msg });
        }

        database.addSudoUser(phoneNumber, targetJid);

        const num = targetJid.split('@')[0];
        await sock.sendMessage(from, {
            text: 
                `✅ *Disciple Elevated*\n\n` +
                `@${num} is now a *Disciple* of the Lotus Prince.\n` +
                `_They may enter the sanctuary even when the veil is drawn._\n\n` +
                `_.setsudo list · .unsetsudo @person_\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            mentions: [targetJid]
        }, { quoted: msg });
    }
};
