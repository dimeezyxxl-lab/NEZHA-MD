/**
 * UnsetMod — Revoke an Attendant
 * Usage: .unsetmod (reply / @tag / number / list)
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

    const mentions = ctx?.mentionedJid || [];
    if (mentions?.length > 0) return normalise(mentions[0]);

    if (args[0]) {
        const num = args[0].replace(/[^0-9]/g, '');
        if (num.length >= 7) return `${num}@s.whatsapp.net`;
    }
    return null;
}

module.exports = {
    name:        'unsetmod',
    aliases:     ['removemod', 'delmod', 'modlist', 'revoke', 'revokeattendant'],
    description: "Revoke an Attendant's power (Owner only).",
    usage:       '.unsetmod (reply / @tag / number / list)',
    category:    'owner',

    async execute({ sock, msg, from, args, reply, database, phoneNumber, isOwner }) {
        if (!isOwner) return reply('🔒 _This divine authority is reserved for the Lotus Prince alone._');

        const sub = (args[0] || '').toLowerCase();
        if (sub === 'list' || sub === 'ls' || sub === 'show') {
            const list = database.getModUsers(phoneNumber);
            if (!list.length) return reply(`📋 *The sanctuary currently has no active attendants.*`);
            
            const lines = list.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join('\n');
            return await sock.sendMessage(from, {
                text:
                    `╔══════════════════════════════╗\n` +
                    `║   🛡️  *CONSECRATED ATTENDANTS*  ║\n` +
                    `╚══════════════════════════════╝\n\n` +
                    `${lines}\n\n` +
                    `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                    `_Use .unsetmod @person to revoke their consecration._\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
                mentions: list
            }, { quoted: msg });
        }

        const targetJid = resolveTargetJid(msg, args);
        if (!targetJid) {
            return reply(
                `❓ *Whose power do you seek to revoke?*\n\n` +
                `• Reply to their missive with *.unsetmod*\n` +
                `• Tag them: *.unsetmod @person*\n` +
                `• Use number: *.unsetmod 2349012345678*\n` +
                `• View the Order: *.unsetmod list*`
            );
        }

        if (!database.isModUser(phoneNumber, targetJid)) {
            return await sock.sendMessage(from, {
                text: `ℹ️ *@${targetJid.split('@')[0]} is not currently an Attendant.*`,
                mentions: [targetJid]
            }, { quoted: msg });
        }

        database.removeModUser(phoneNumber, targetJid);

        const num = targetJid.split('@')[0];
        await sock.sendMessage(from, {
            text:
                `╔══════════════════════════════╗\n` +
                `║   ❌  *CONSECRATION REVOKED*   ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `👤 @${num} is no longer an *Attendant*.\n\n` +
                `_Their governance over the sanctuary has been rescinded._\n\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                `_Use .setmod to grant access once more._\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`,
            mentions: [targetJid]
        }, { quoted: msg });
    }
};
