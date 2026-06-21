/**
 * Play — Invoke a Celestial Melody Summoning
 * Usage: .play <song name or URL>
 */

'use strict';

const axios = require('axios');

module.exports = {
    name:        'play',
    aliases:     ['song', 'music', 'audio', 'summon'],
    description: 'Summon a Celestial Melody and manifest it as audio.',
    usage:       '.play <song name or URL>',
    category:    'media',

    async execute({ sock, msg, from, args, reply, t }) {
        // Translation bridge for the sanctuary
        const tr = t || ((key, vars) => {
            const fallbacks = {
                'play.noQuery': '🎵 *Celestial Invocation:* Provide the name of the melody you wish to summon.\n*Example:* `.play Essence Wizkid`',
                'play.searching': '🔍 *Searching the divine archives for:* *' + (vars?.query || '') + '*...',
                'play.downloading': '⬇️ *Manifesting:* *' + (vars?.title || '') + '*...',
                'play.notFound': '❌ *Echoes only:* Could not find: *' + (vars?.query || '') + '*',
                'play.downloadFail': '❌ *Manifestation disrupted:* The melody could not be forged.',
                'play.success': '✅ *' + (vars?.title || '') + '*\n🎵 *The resonance is complete.*',
                'play.thumbCaption': '🎵 *Title:* ' + (vars?.title || 'Unknown') + '\n👤 *Artist:* ' + (vars?.artist || 'Unknown') + '\n⏱️ *Duration:* ' + (vars?.duration || 'N/A'),
                'play.fileTooSmall': '❌ *The essence is too faint.*',
            };
            return fallbacks[key] || key;
        });

        const query = args.join(' ').trim();
        if (!query) return reply(tr('play.noQuery'));

        await sock.sendMessage(from, { react: { text: '🔍', key: msg.key } });
        await reply(tr('play.searching', { query }));

        let audioUrl, title, artist, duration, thumbnail;
        
        // Strategy list defined as per your implementation (omitted for brevity)
        // [Strategies 1 through 8 remain functionally identical to your provided logic]
        // ... (Execute strategy loop) ...

        if (!audioUrl) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            return reply(tr('play.notFound', { query }));
        }

        // ── Summon the Melody Visuals ─────────────────────────
        try {
            const thumbCaption = tr('play.thumbCaption', { title, artist, duration });
            if (thumbnail?.startsWith('http')) {
                try {
                    const thumbResp = await axios.get(thumbnail.replace('100x100', '600x600'), { responseType: 'arraybuffer' });
                    await sock.sendMessage(from, { image: Buffer.from(thumbResp.data), caption: thumbCaption }, { quoted: msg });
                } catch (_) { await reply(thumbCaption); }
            } else { await reply(thumbCaption); }
        } catch (_) {}

        // ── Manifest the Audio ────────────────────────────────
        try {
            await sock.sendMessage(from, { react: { text: '⬇️', key: msg.key } });
            const resp = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 120000 });
            const buffer = Buffer.from(resp.data);
            if (buffer.length < 10000) throw new Error(tr('play.fileTooSmall'));

            await sock.sendMessage(from, {
                audio: buffer,
                mimetype: 'audio/mpeg',
                fileName: (title.replace(/[^\w\s\-]/g, '').slice(0, 60) || 'melody') + '.mp3',
            }, { quoted: msg });

            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
        } catch (e) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } });
            await reply(tr('play.downloadFail'));
        }
    },
};
