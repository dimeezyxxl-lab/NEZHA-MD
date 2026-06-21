/**
 * TTS — Execute a Celestial Utterance
 * Usage: .tts <text>
 */
'use strict';
const axios = require('axios');

const AUDIO_RE = /\.(mp3|ogg|m4a|wav|aac|opus)(\?|$)/i;
const URL_RE = /^https?:\/\//i;

function walkAudio(node, out) {
    if (!node) return;
    if (typeof node === 'string') {
        if (URL_RE.test(node) && AUDIO_RE.test(node)) out.push(node);
        return;
    }
    if (Array.isArray(node)) { for (const v of node) walkAudio(v, out); return; }
    if (typeof node === 'object') { for (const v of Object.values(node)) walkAudio(v, out); }
}

module.exports = {
    name: 'tts',
    aliases: ['say', 'voice', 'utterance'],
    description: 'Manifest text as a Celestial Utterance.',
    category: 'media',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `🗣️ *Celestial Utterance*\n\n` +
                `Usage: .tts <your message>\n` +
                `Example: .tts The Lotus Prince speaks`
            );
        }
        const text = args.join(' ').trim().slice(0, 500);
        if (!text) return reply('❌ *The silence remains:* Please provide text to manifest.');

        try {
            await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } });
            const url = `https://apis.prexzyvilla.site/tts/tts-en?text=${encodeURIComponent(text)}`;
            const r = await axios.get(url, {
                timeout: 30000,
                headers: { 'User-Agent': 'NezhaMD/1.0' },
                validateStatus: () => true,
            });
            if (r.status >= 400) throw new Error(`API ${r.status}`);

            const urls = [];
            walkAudio(r.data, urls);
            const audioUrl = urls[0];
            if (!audioUrl) throw new Error('No audio URL in response');

            try {
                await sock.sendMessage(from, {
                    audio: { url: audioUrl },
                    mimetype: 'audio/mpeg',
                    ptt: false,
                }, { quoted: msg });
            } catch (e) {
                await reply(`🗣️ *Celestial Utterance:* \n\n"${text}"\n\n🔗 ${audioUrl}`);
            }
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
        } catch (err) {
            try { await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }); } catch {}
            reply('❌ *Manifestation failed:* The celestial voice could not be summoned.');
        }
    },
};
