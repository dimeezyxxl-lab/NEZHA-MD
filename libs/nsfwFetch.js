/**
 * nsfwFetch — The Veil of Forbidden Visions
 * ─────────────────────────────────────────────────────────────────────────────
 * The Lotus Prince peers into the shadowed archives of the abyss to retrieve 
 * raw, unrestricted visions, shielding them beneath the Veil.
 */
'use strict';
const axios = require('axios');

const IMG_RE = /\.(jpe?g|png|gif|webp|bmp)(\?|$)/i;
const VID_RE = /\.(mp4|webm|mov|m4v)(\?|$)/i;
const URL_RE = /^https?:\/\//i;

function walk(node, out) {
    if (!node) return;
    if (typeof node === 'string') {
        if (URL_RE.test(node) && (IMG_RE.test(node) || VID_RE.test(node))) out.push(node);
        return;
    }
    if (Array.isArray(node)) { for (const v of node) walk(v, out); return; }
    if (typeof node === 'object') { for (const v of Object.values(node)) walk(v, out); }
}

async function fetchMedia(endpoint, { timeout = 20000 } = {}) {
    const r = await axios.get(endpoint, {
        timeout,
        headers: { 'User-Agent': 'Nezha-md/LotusPrince' },
        validateStatus: () => true,
    });
    if (r.status >= 400) throw new Error(`Abyssal breach: ${r.status}`);
    const urls = [];
    walk(r.data, urls);
    if (!urls.length) throw new Error('The vision was not found in the abyss');
    const url = urls[0];
    return { url, isVideo: VID_RE.test(url) };
}

function makeNsfwCommand({ name, aliases = [], endpoint, emoji = '🔞', label }) {
    const title = label || name.toUpperCase();
    return {
        name,
        aliases,
        description: `${title} (18+) — Peer into the Forbidden Veil`,
        category: '18plus',
        nsfw: true,
        async execute({ sock, msg, from, reply, args }) {
            if (args[0] === 'help' || args[0] === '?') {
                return reply(
                    `${emoji} *${title}* (Forbidden)\n\n` +
                    `The Lotus Prince guards these visions. Use with discretion.\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            }
            try {
                await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } });
                const { url, isVideo } = await fetchMedia(endpoint);
                const caption = `${emoji} *${title}*\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;
                
                if (isVideo) {
                    await sock.sendMessage(from, { video: { url }, mimetype: 'video/mp4', caption }, { quoted: msg });
                } else {
                    await sock.sendMessage(from, { image: { url }, caption }, { quoted: msg });
                }
                await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
            } catch (err) {
                console.error(`[${name}] error:`, err.message);
                try { await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }); } catch {}
                reply(`❌ _The Lotus Prince could not pierce the veil of the abyss at this time._`);
            }
        },
    };
}

module.exports = { fetchMedia, makeNsfwCommand };
