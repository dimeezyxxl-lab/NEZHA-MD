/**
 * Divine Animation Nexus — The Lotus Prince's Visual Embodiment
 * ─────────────────────────────────────────────────────────────────────────────
 * The Lotus Prince traverses the astral archives to manifest animated seals
 * that convey your emotions with divine resonance.
 */

'use strict';

const NEKOS_BEST_MAP = {
    hug: 'hug', slap: 'slap', kiss: 'kiss', poke: 'poke', pat: 'pat',
    cry: 'cry', wink: 'wink', blush: 'blush', shinobu: 'shinobu',
    awoo: 'baka',
};

const WAIFU_PICS_MAP = {
    hug: 'hug', slap: 'slap', kiss: 'kiss', poke: 'poke', pat: 'pat',
    cry: 'cry', wink: 'wink', blush: 'blush', shinobu: 'shinobu',
    awoo: 'awoo',
};

function pickUrl(json) {
    if (!json || typeof json !== 'object') return null;
    if (Array.isArray(json.results) && json.results[0]?.url) return json.results[0].url;
    const candidates = [
        json.url, json.result, json.gif, json.image, json.link,
        json.data?.url, json.data?.result, json.data?.gif, json.data?.image, json.data?.link,
    ];
    for (const c of candidates) {
        if (typeof c === 'string' && /^https?:\/\//i.test(c)) return c;
    }
    return null;
}

async function fetchJson(url, ms = 10000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
        const res = await fetch(url, { signal: ctrl.signal, headers: { 'user-agent': 'Nezha-md/LotusPrince' } });
        if (!res.ok) return null;
        return await res.json();
    } catch { return null; } finally { clearTimeout(t); }
}

async function fetchBuffer(url, ms = 20000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
        const res = await fetch(url, { signal: ctrl.signal, headers: { 'user-agent': 'Nezha-md/LotusPrince' } });
        if (!res.ok) return null;
        const ab = await res.arrayBuffer();
        return Buffer.from(ab);
    } catch { return null; } finally { clearTimeout(t); }
}

async function resolveGifUrl(name) {
    const nb = NEKOS_BEST_MAP[name];
    if (nb) {
        const j = await fetchJson(`https://nekos.best/api/v2/${nb}`);
        const u = pickUrl(j);
        if (u) return u;
    }
    const wp = WAIFU_PICS_MAP[name];
    if (wp) {
        const j = await fetchJson(`https://api.waifu.pics/sfw/${wp}`);
        const u = pickUrl(j);
        if (u) return u;
    }
    return null;
}

async function resolveGifBuffer(name, fallbacks) {
    const url = await resolveGifUrl(name);
    if (url) {
        const buf = await fetchBuffer(url);
        if (buf) return { buf, url };
    }
    if (fallbacks?.length) {
        for (const fb of [...fallbacks].sort(() => Math.random() - 0.5)) {
            const buf = await fetchBuffer(fb);
            if (buf) return { buf, url: fb };
        }
    }
    return null;
}

function resolveTarget(msg, args) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const mentioned = ctx?.mentionedJid || [];
    const quotedParticipant = ctx?.participant;
    let target = mentioned[0] || quotedParticipant;
    if (!target && args?.length) {
        const digits = args[0].replace(/[^0-9]/g, '');
        if (digits) target = digits + '@s.whatsapp.net';
    }
    return target || null;
}

function makeAnimeReaction(opts) {
    const {
        name, emoji, verb, selfVerb,
        title = verb.toUpperCase(),
        aliases = [],
        fallbacks = [],
        description = `Manifest a ${name} reaction.`,
    } = opts;

    return {
        name,
        aliases,
        description,
        category: 'fun',
        async execute({ sock, msg, from, reply, args }) {
            const sender = msg.key.participant || msg.key.remoteJid;
            const senderTag = '@' + sender.split('@')[0];
            const target = resolveTarget(msg, args);

            let caption;
            let mentions = [sender];
            if (target && target !== sender) {
                const targetTag = '@' + target.split('@')[0];
                caption = `${emoji} *${title}*\n\n${senderTag} ${verb} ${targetTag}!\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;
                mentions = [sender, target];
            } else {
                caption = `${emoji} *${title}*\n\n${senderTag} ${selfVerb}.\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;
            }

            try { await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } }); } catch {}

            const got = await resolveGifBuffer(name, fallbacks);
            if (!got) {
                try { await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }); } catch {}
                return reply(caption + '\n\n_(The archives are currently unreachable.)_', { mentions });
            }

            try {
                await sock.sendMessage(from, {
                    video: got.buf,
                    gifPlayback: true,
                    mimetype: 'video/mp4',
                    caption,
                    mentions,
                }, { quoted: msg });
                try { await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }); } catch {}
            } catch (e) {
                try { await sock.sendMessage(from, { image: got.buf, mimetype: 'image/gif', caption, mentions }, { quoted: msg }); } catch {}
                try { await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }); } catch {}
            }
        },
    };
}

module.exports = { makeAnimeReaction };
