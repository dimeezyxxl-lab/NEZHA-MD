/**
 * Retrieve — Access the Chamber of the Unspoken
 * Usage: .retrieve [<number> | group | dm | clear | info]
 */
'use strict';

const { getAll, count, clear } = require('../../utils/retrieveStore');

module.exports = {
    name:        'retrieve',
    aliases:     ['rd', 'getdeleted', 'vault', 'unspoken', 'chamber'],
    description: 'Access the Chamber of the Unspoken (Owner only).',
    usage:       '.retrieve [<number> | group | dm | clear | info]',
    category:    'owner',

    async execute({ sock, from, msg, args, reply, phoneNumber, isOwner }) {
        if (!isOwner) return reply('🔒 _This sacred chamber is accessible only to the Lotus Prince._');

        const sub = (args[0] || '').toLowerCase().trim();

        // ── CLEAR ────────────────────────────────────────────────────────
        if (sub === 'clear') {
            const was = count(phoneNumber);
            clear(phoneNumber);
            return reply(
                `🗑️ *CHAMBER PURIFIED*\n\n` +
                `Expelled *${was}* whispers from the void.`
            );
        }

        // ── INFO ─────────────────────────────────────────────────────────
        const all = getAll(phoneNumber);
        if (sub === 'info') {
            if (!all.length) return reply('📭 *The Chamber is silent.* No whispers have been captured.');
            const groups = all.filter(e => e.jid?.endsWith('@g.us')).length;
            const dms    = all.length - groups;
            const types  = _typeBreakdown(all);
            return reply(
                `🗂️ *CHAMBER OF THE UNSPOKEN — STATS*\n\n` +
                `📦 Total whispers captured : *${all.length}*\n` +
                `👥 From Sanctuaries       : *${groups}*\n` +
                `💬 From private realms    : *${dms}*\n\n` +
                `📊 *Manifestations:*\n${types}\n\n` +
                `⏱️ _Whispers fade into the void after 2 hours._\n` +
                `Use *.retrieve* to unveil all, *.retrieve clear* to purify.`
            );
        }

        if (!all.length) {
            return reply(
                `📭 *The Chamber is silent.*\n\n` +
                `The Lotus Prince captures every deleted whisper\n` +
                `from all realms (Sanctuaries + DMs) in total secrecy.\n\n` +
                `These traces persist for *2 hours* before returning to the void.\n` +
                `Only you may look upon them.`
            );
        }

        // ── FILTER ────────────────────────────────────────────────────────
        let filtered = all;
        if (sub === 'group') {
            filtered = all.filter(e => e.jid?.endsWith('@g.us'));
            if (!filtered.length) return reply('📭 No whispers captured from Sanctuaries.');
        } else if (sub === 'dm') {
            filtered = all.filter(e => !e.jid?.endsWith('@g.us'));
            if (!filtered.length) return reply('📭 No whispers captured from private realms.');
        }

        // ── SINGLE ENTRY ──────────────────────────────────────────────────
        if (sub && !isNaN(parseInt(sub, 10))) {
            const idx = parseInt(sub, 10) - 1;
            if (idx < 0 || idx >= all.length) {
                return reply(`❌ _Entry #${sub} does not exist in the Chamber._`);
            }
            await _sendEntry(sock, from, all[idx], idx + 1, all.length);
            return;
        }

        // ── SEND ALL ──────────────────────────────────────────────────────
        await reply(
            `🗂️ *UNVEILING THE CHAMBER*\n\n` +
            `📦 *${filtered.length}* deleted whisper${filtered.length !== 1 ? 's' : ''} manifested` +
            (sub === 'group' ? ' *(Sanctuaries only)*' : sub === 'dm' ? ' *(Private realms only)*' : '') + `\n` +
            `⏱️ _Whispers fade within 2 hours_\n\n` +
            `> Manifesting all now…`
        );

        for (let i = 0; i < filtered.length; i++) {
            await _sendEntry(sock, from, filtered[i], i + 1, filtered.length);
            if (filtered.length > 1) await _sleep(700);
        }

        await reply(
            `✅ *Manifestation Complete.*\n\n` +
            `Use *.retrieve clear* to purify the chamber.`
        );
    },
};

// ── Helpers ───────────────────────────────────────────────────────

async function _sendEntry(sock, ownerJid, entry, idx, total) {
    const isGroup  = entry.jid?.endsWith('@g.us');
    const chatName = isGroup ? `Sanctuary · ${entry.jid.replace('@g.us', '')}` : `Realm · ${entry.jid?.replace('@s.whatsapp.net', '')}`;
    const selfDeleted = entry.senderNum === entry.deleterNum;

    const header =
        `🗑️ *[${idx}/${total}]* — ${_timeAgo(entry.deletedAt)}\n` +
        `📌 *Origin:*     ${chatName}\n` +
        `✉️  *Whispered by:* ${entry.senderNum || 'Unknown'}\n` +
        `🚮 *Silenced by:*  ${selfDeleted ? '(themself)' : (entry.deleterNum || 'Unknown')}\n` +
        `📎 *Nature:*     ${entry.type}`;

    try {
        if (entry.type === 'text') {
            await sock.sendMessage(ownerJid, { text: `${header}\n\n💬 *Whisper:*\n${entry.body}` });
        } else if (entry.mediaBuffer && entry.mediaBuffer.length > 500) {
            const cap = header + (entry.caption ? `\n\n📝 *Context:* ${entry.caption}` : '');
            if (entry.type === 'image') await sock.sendMessage(ownerJid, { image: entry.mediaBuffer, caption: cap });
            else if (entry.type === 'video') await sock.sendMessage(ownerJid, { video: entry.mediaBuffer, caption: cap });
            else if (entry.type === 'sticker') {
                await sock.sendMessage(ownerJid, { sticker: entry.mediaBuffer });
                await sock.sendMessage(ownerJid, { text: header });
            } else if (entry.type === 'audio') {
                await sock.sendMessage(ownerJid, { audio: entry.mediaBuffer, mimetype: entry.mimetype || 'audio/ogg; codecs=opus', ptt: !!entry.ptt });
                await sock.sendMessage(ownerJid, { text: header });
            } else if (entry.type === 'document') {
                await sock.sendMessage(ownerJid, { document: entry.mediaBuffer, mimetype: entry.mimetype || 'application/octet-stream', fileName: entry.fileName || 'recovered_whisper', caption: cap });
            }
        } else {
            await sock.sendMessage(ownerJid, { text: `${header}\n\n⚠️ _(This manifestation has faded from the mortal plane)_` });
        }
    } catch (err) {
        await sock.sendMessage(ownerJid, { text: `${header}\n\n❌ _(The ritual of retrieval failed)_` });
    }
}

function _typeBreakdown(entries) {
    const counts = {};
    for (const e of entries) counts[e.type] = (counts[e.type] || 0) + 1;
    return Object.entries(counts).map(([t, n]) => `  • ${t}: ${n}`).join('\n');
}

function _timeAgo(ts) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return `${h}h ${m}m ago`;
}

function _sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
