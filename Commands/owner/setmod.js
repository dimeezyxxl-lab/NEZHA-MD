/**
 * SetMod — Consecrate an Attendant
 * Usage: .setmod (reply / @tag / number / list)
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
    name:        'setmod',
    aliases:     ['addmod', 'mod', 'modadd', 'consecrate', 'attendant'],
    description: 'Consecrate an Attendant — empowers the user to aid in sanctuary governance.',
    usage:       '.setmod (reply / @tag / number / list)',
    category:    'owner',

    async execute({ sock, msg, from, args, reply, database, phoneNumber, isOwner }) {
        if (!isOwner) return reply('🔒 _This sacred duty is reserved for the Lotus Prince alone._');

        const sub = (args[0] || '').toLowerCase();
        if (sub === 'list' || sub === 'ls' || sub === 'show') {
            const list = database.getModUsers(phoneNumber);
            if (!list.length) {
                return reply(`📋 *The Prince currently walks alone; no attendants are consecrated.*`);
            }
            const lines = list.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
            return await sock.sendMessage(from, {
                text:
                    `╔══════════════════════════════╗\n` +
                    `║   🛡️  *CONSECRATED ATTENDANTS*  ║\n` +
                    `╚══════════════════════════════╝\n\n` +
                    `${lines}\n\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `_Attendants are empowered to govern in the Prince's name._\n` +
                    `_Use .unsetmod @person to revoke their consecration._\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                mentions: list
            }, { quoted: msg });
        }

        const targetJid = resolveTargetJid(msg, args);
        if (!targetJid) {
            return reply(
                `❓ *Whom do you seek to consecrate as an Attendant?*\n\n` +
                `• Reply to their missive with *.setmod*\n` +
                `• Tag them: *.setmod @person*\n` +
                `• Use number: *.setmod 2349012345678*\n` +
                `• View the current order: *.setmod list*`
            );
        }

        const ownerBase = phoneNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        if (targetJid === ownerBase) {
            return reply(`👑 _The Lotus Prince needs no consecration._`);
        }

        if (database.isModUser(phoneNumber, targetJid)) {
            return await sock.sendMessage(from, {
                text: `ℹ️ *@${targetJid.split('@')[0]} is already a consecrated Attendant.*\n_Use .unsetmod to revoke their status._`,
                mentions: [targetJid]
            }, { quoted: msg });
        }

        database.addModUser(phoneNumber, targetJid);

        const num = targetJid.split('@')[0];
        await sock.sendMessage(from, {
            text:
                `╔══════════════════════════════╗\n` +
                `║   🛡️  *CONSECRATION GRANTED*   ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `👤 @${num} is now an *Attendant*.\n\n` +
                `✅ Empowered to govern the sanctuary\n` +
                `✅ Granted access during private manifestations\n\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                `_Use .unsetmod to revoke._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            mentions: [targetJid]
        }, { quoted: msg });
    }
};
