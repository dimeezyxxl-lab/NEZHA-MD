/**
 * Movie — Consult the Celestial Cinematic Archive
 * Usage: .movie <title> [360p|480p|720p]
 */

'use strict';
const axios = require('axios');

const TMDB_BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTU0YThjMjgyODAxYjk1N2ZjOGExODFhYTk0NjE3YyIsIm5iZiI6MTc4MDI3NTA3MS4yNDEsInN1YiI6IjZhMWNkNzdmNGUyZjc2ZWY5Yzg4MDFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Fs4i0QMYRdAU6jXj-v8E9kyhPWVxKvTMjDJ7vKnCNk';
const TMDB_BASE  = 'https://api.themoviedb.org/3';
const IMG_BASE   = 'https://image.tmdb.org/t/p/w500';
const TMDB_HDR   = { accept: 'application/json', Authorization: `Bearer ${TMDB_BEARER}` };
const PREXZY_DL  = 'https://apis.prexzyvilla.site/download/youtube-video';

const QUALITY_MAP = {
    '360p': ['480p', '360p', '720p', '1080p'],
    '480p': ['480p', '720p', '1080p'],
    '720p': ['720p', '1080p', '480p'],
};
const VALID_QUALITIES = Object.keys(QUALITY_MAP);

async function tmdbSearch(query) {
    const r = await axios.get(`${TMDB_BASE}/search/movie`, {
        params: { query, include_adult: false, language: 'en-US', page: 1 },
        headers: TMDB_HDR, timeout: 15000,
    });
    return r.data?.results || [];
}

async function tmdbDetails(id) {
    const r = await axios.get(`${TMDB_BASE}/movie/${id}`, {
        params: { append_to_response: 'credits,external_ids,videos' },
        headers: TMDB_HDR, timeout: 15000,
    });
    return r.data || {};
}

function pickTrailerKey(videos) {
    if (!Array.isArray(videos?.results)) return null;
    const order = ['Official Trailer', 'Trailer', 'Teaser', 'Clip', 'Featurette'];
    for (const label of order) {
        const found = videos.results.find(
            v => v.site === 'YouTube' && v.type !== 'Bloopers' &&
                 v.name?.toLowerCase().includes(label.toLowerCase())
        );
        if (found) return found.key;
    }
    const any = videos.results.find(v => v.site === 'YouTube');
    return any?.key || null;
}

async function downloadTrailer(ytKey) {
    const ytUrl = `https://www.youtube.com/watch?v=${ytKey}`;
    try {
        const r = await axios.get(PREXZY_DL, { params: { url: ytUrl }, timeout: 30000 });
        const d = r.data;
        return {
            url: d?.data?.url || d?.data?.video || d?.result?.url || d?.url || d?.link || null,
            ytUrl
        };
    } catch (e) {
        return { url: null, ytUrl };
    }
}

function streamLinks(tmdbId) {
    return [
        `https://ezvidapi.com/embed/movie/${tmdbId}?provider=vidsrc`,
        `https://vidsrc.to/embed/movie/${tmdbId}`,
        `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`,
    ];
}

module.exports = {
    name: 'movie',
    aliases: ['movies', 'film', 'moviedl', 'cinema'],
    description: 'Consult the Celestial Cinematic Archive for tales and manifestations.',
    category: 'media',

    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `🎬 *Celestial Cinematic Archive*\n\n` +
                `📌 *Search (Glimpse into a tale):*\n• .movie <title>\n\n` +
                `▶️ *Divine Streams:*\n` +
                `• .movie <title> 360p\n` +
                `• .movie <title> 480p\n` +
                `• .movie <title> 720p\n\n` +
                `🎯 *Example:*\n` +
                `• .movie inception`
            );
        }

        const lastArg = args[args.length - 1].toLowerCase();
        const isStreamReq = VALID_QUALITIES.includes(lastArg);
        const requestedQuality = isStreamReq ? lastArg : null;
        const query = isStreamReq ? args.slice(0, -1).join(' ').trim() : args.join(' ').trim();

        if (!query) return reply('❌ *Missing query:* Provide a cinematic title.');

        try {
            await sock.sendMessage(from, { react: { text: '🔍', key: msg.key } });

            const results = await tmdbSearch(query);
            if (!results.length) return reply(`❌ *No archive entry found for:* *${query}*.`);

            const best = results[0];
            const details = await tmdbDetails(best.id);

            const title = details.title || best.title || query;
            const year = (details.release_date || best.release_date || '').slice(0, 4) || '—';
            const rating = details.vote_average ? `${details.vote_average.toFixed(1)}/10` : 'N/A';
            const poster = details.poster_path ? `${IMG_BASE}${details.poster_path}` : null;
            const tmdbId = details.id || best.id;

            if (isStreamReq) {
                const links = streamLinks(tmdbId);
                let txt = `🎬 *Celestial Stream: ${title}* (${year})\n━━━━━━━━━━━━━━━━━━━━\n📹 *Quality:* ${requestedQuality}\n━━━━━━━━━━━━━━━━━━━━\n▶️ *Access Portals:*\n`;
                links.forEach((l, i) => { txt += `${i + 1}. ${l}\n`; });
                return await sock.sendMessage(from, { image: { url: poster }, caption: txt }, { quoted: msg });
            }

            let infoText = `🎬 *Celestial Archive Entry: ${title}* (${year})\n━━━━━━━━━━━━━━━━━━━━\n⭐ *Rating:* ${rating}\n📖 ${details.overview || 'No synopsis.'}\n━━━━━━━━━━━━━━━━━━━━\n`;
            if (poster) await sock.sendMessage(from, { image: { url: poster }, caption: infoText }, { quoted: msg });
            else await reply(infoText);

            const trailerKey = pickTrailerKey(details.videos);
            if (trailerKey) {
                const trailer = await downloadTrailer(trailerKey);
                if (trailer.url) {
                    await sock.sendMessage(from, { video: { url: trailer.url }, caption: `🎬 *Official Celestial Glimpse:* ${title}`, mimetype: 'video/mp4' }, { quoted: msg });
                } else {
                    await reply(`▶️ *Glimpse Portal:* ${trailer.ytUrl}`);
                }
            }
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
        } catch (err) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            reply('❌ *Archive connection failed:* Could not manifest cinematic details.');
        }
    },
};
