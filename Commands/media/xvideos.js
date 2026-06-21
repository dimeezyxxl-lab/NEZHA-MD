/**
 * XVideos — Execute a Celestial Desires inquiry
 * Usage: .xv <query> or .xv <url>
 */

'use strict';
const axios = require('axios');

const XV_URL_RE = /xvideos\.com\//i;
const MP4_RE = /\.mp4(\?|$)/i;
const M3U8_RE = /\.m3u8(\?|$)/i;

function pickMp4(files) {
    if (!files || typeof files !== 'object') return null;
    const candidates = [files.high, files.hd, files.HD, files.low, files.sd, files.SD, files.mp4];
    for (const c of candidates) {
        if (typeof c === 'string' && c.startsWith('http') && MP4_RE.test(c)) return c;
    }
    for (const c of Object.values(files)) {
        if (typeof c === 'string' && c.startsWith('http') && !XV_URL_RE.test(c) && !M3U8_RE.test(c) && /\.(mp4|webm|mov)(\?|$)/i.test(c)) {
            return c;
        }
    }
    return null;
}

function pickHls(files) {
    if (!files || typeof files !== 'object') return null;
    if (typeof files.hls === 'string' && M3U8_RE.test(files.hls)) return files.hls;
    for (const c of Object.values(files)) {
        if (typeof c === 'string' && M3U8_RE.test(c)) return c;
    }
    return null;
}

function extractList(d) {
    const root = d?.data ?? d?.result ?? d ?? {};
    if (Array.isArray(root)) return root;
    if (Array.isArray(root.videos)) return root.videos;
    if (Array.isArray(root.results)) return root.results;
    if (Array.isArray(root.data)) return root.data;
    if (Array.isArray(root.items)) return root.items;
    return [];
}

async function search(query) {
    const ep = `https://apis.prexzyvilla.site/nsfw/xvideos-search?query=${encodeURIComponent(query)}`;
    const r = await axios.get(ep, { timeout: 25000 });
    return extractList(r.data);
}

async function download(url) {
    const ep = `https://apis.prexzyvilla.site/nsfw/xvideos-dl?url=${encodeURIComponent(url)}`;
    const r = await axios.get(ep, { timeout: 60000 });
    const root = r.data?.data || r.data?.result || r.data || {};
    const files = root.files || {};
    return {
        mp4: pickMp4(files),
        hls: pickHls(files),
        title: root.title || root.name || 'Celestial Content',
        duration: root.duration || '',
        thumbnail: typeof root.thumb === 'string' && root.thumb.startsWith('http') ? root.thumb
                  : typeof root.thumbnail === 'string' && root.thumbnail.startsWith('http') ? root.thumbnail
                  : null,
        tags: Array.isArray(root.tags) ? root.tags : [],
        pageUrl: url,
    };
}

module.exports = {
    name: 'xvideos',
    aliases: ['xv', 'xvid', 'xvsearch', 'desires'],
    description: 'Explore Celestial Desires (NSFW).',
    category: 'media',
    nsfw: true,
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `🔞 *Celestial Desires (XVideos)*\n\n` +
                `Usage:\n` +
                `  .xv <query>          → search\n` +
                `  .xv <xvideos url>    → download\n\n` +
                `⚠️ *Sanctuary Restriction:* NSFW content only.`
            );
        }

        const input = args.join(' ').trim();

        try {
            await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } });

            if (XV_URL_RE.test(input)) {
                const r = await download(input);

                if (r.mp4) {
                    try {
                        await sock.sendMessage(from, {
                            video: { url: r.mp4 },
                            mimetype: 'video/mp4',
                            caption: `🔞 *${r.title}*${r.duration ? `\n⏱️ ${r.duration}` : ''}\n\n> _Manifested by Nezha-md_`,
                        }, { quoted: msg });
                        await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
                        return;
                    } catch (err) { }
                }

                const info =
                    `🔞 *${r.title}*` +
                    (r.duration ? `\n⏱️ ${r.duration} min` : '') +
                    (r.tags.length ? `\n🏷️ ${r.tags.slice(0, 8).join(', ')}` : '') +
                    `\n\n⚠️ *Direct manifestation failed.* Open the link to witness:\n${r.pageUrl}` +
                    (r.hls ? `\n\n_Ethereal stream:_ ${r.hls}` : '');

                if (r.thumbnail) {
                    try {
                        await sock.sendMessage(from, { image: { url: r.thumbnail }, caption: info }, { quoted: msg });
                        await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
                        return;
                    } catch (_) { }
                }
                await reply(info);
                await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
                return;
            }

            const list = await search(input);
            if (!list.length) {
                await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
                return reply(`❌ *No echoes found for:* *${input}*.`);
            }

            const top = list.slice(0, 10);
            let out = `🔞 *Celestial Desires — "${input}"*\n\n`;
            top.forEach((v, i) => {
                const title = v.title || v.name || 'Untitled';
                const dur = v.duration || v.length || '';
                const link = v.url || v.link || '';
                out += `${i + 1}. *${title}*\n`;
                if (dur) out += `   ⏱️ ${dur} min\n`;
                if (link) out += `   🔗 ${link}\n\n`;
            });
            out += `_Invoke download:_ .xv <url>`;

            const thumb = top.map(t => t.thumb || t.thumbnail || t.image).find(t => typeof t === 'string' && /^https?:\/\//.test(t) && !/lightbox-blank/.test(t));
            if (thumb) {
                try {
                    await sock.sendMessage(from, { image: { url: thumb }, caption: out }, { quoted: msg });
                    await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
                    return;
                } catch (_) { }
            }
            await reply(out);
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
        } catch (err) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            reply('❌ *Celestial link disrupted.*');
        }
    },
};
