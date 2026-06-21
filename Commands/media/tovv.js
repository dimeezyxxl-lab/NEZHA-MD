/**
 * Tovv — Invoke Celestial Ephemera
 * Usage: Reply to media or attach with .tovv
 */
'use strict';

const { downloadContentFromMessage } = require('@crysnovax/baileys');

const TIMEOUT_MS = 30_000;

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const c of stream) chunks.push(c);
    return Buffer.concat(chunks);
}

function downloadWithTimeout(node, type) {
    return new Promise(async (resolve, reject) => {
        const t = setTimeout(() => reject(new Error('Celestial link timed out')), TIMEOUT_MS);
        try {
            const stream = await downloadContentFromMessage(node, type);
            const buf = await streamToBuffer(stream);
            clearTimeout(t);
            resolve(buf);
        } catch (e) { clearTimeout(t); reject(e); }
    });
}

function resolveMedia(msg) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo
             || msg.message?.imageMessage?.contextInfo
             || msg.message?.videoMessage?.contextInfo
             || msg.message?.audioMessage?.contextInfo
             || null;
    const quoted = ctx?.quotedMessage || null;

    const sources = [
        quoted,
        msg.message,
        quoted?.viewOnceMessage?.message,
        quoted?.viewOnceMessageV2?.message,
        quoted?.viewOnceMessageV2Extension?.message,
        quoted?.ephemeralMessage?.message,
        msg.message?.viewOnceMessage?.message,
        msg.message?.viewOnceMessageV2?.message,
        msg.message?.ephemeralMessage?.message,
    ].filter(Boolean);

    for (const src of sources) {
        if (src.imageMessage) return { type: 'image', node: src.imageMessage };
        if (src.videoMessage) return { type: 'video', node: src.videoMessage };
        if (src.audioMessage) return { type: 'audio', node: src.audioMessage };
    }
    return null;
}

module.exports = {
    name:        'tovv',
    aliases:     ['vv', 'viewonce', 'tovo', 'ephemera'],
    description: 'Bind media to Celestial Ephemera (View-Once).',
    usage:       '.tovv (reply to media)',
    category:    'media',

    async execute({ sock, msg, from, args, reply }) {
        const found = resolveMedia(msg);

        if (!found) {
            return reply(
                '👁️ *Celestial Ephemera*\n\n' +
                'Reply to any media (image, video, or voice) with `.tovv` to bind it to a fleeting existence.'
            );
        }

        const { type, node } = found;
        const caption = args.join(' ').trim();

        await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } }).catch(() => {});

        let buf;
        try {
            buf = await downloadWithTimeout(node, type);
            if (!buf || buf.length < 100) throw new Error('empty media buffer');
        } catch (e) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }).catch(() => {});
            return reply('❌ *Binding failed:* The media is unreachable.');
        }

        try {
            const payload = { viewOnce: true };
            if (type === 'image') {
                payload.image    = buf;
                payload.mimetype = node.mimetype || 'image/jpeg';
                if (caption) payload.caption = caption;
            } else if (type === 'video') {
                payload.video    = buf;
                payload.mimetype = node.mimetype || 'video/mp4';
                if (caption) payload.caption = caption;
            } else {
                payload.audio    = buf;
                payload.mimetype = node.mimetype || 'audio/ogg; codecs=opus';
                payload.ptt      = node.ptt !== false;
            }

            await sock.sendMessage(from, payload, { quoted: msg });
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }).catch(() => {});
        } catch (e) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }).catch(() => {});
            return reply('❌ *Ephemera failed to manifest:* ' + e.message);
        }
    },
};
