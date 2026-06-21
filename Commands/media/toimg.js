/**
 * ToImg — Execute a Celestial Reversal
 * Usage: Reply to a sticker with .toimg
 */
'use strict';

const { downloadContentFromMessage } = require('@crysnovax/baileys');
const { exec }  = require('child_process');
const fs        = require('fs');
const os        = require('os');
const path      = require('path');
const crypto    = require('crypto');

const TIMEOUT_MS = 30000;

function tmp(ext) {
    return path.join(os.tmpdir(), `reversal-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
}

function run(cmd, ms = 30000) {
    return new Promise((resolve, reject) => {
        exec(cmd, { timeout: ms, maxBuffer: 10 * 1024 * 1024 }, (err, _so, se) =>
            err ? reject(new Error(se || err.message)) : resolve()
        );
    });
}

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const c of stream) chunks.push(c);
    return Buffer.concat(chunks);
}

function downloadSticker(stickerMsg) {
    return new Promise(async (resolve, reject) => {
        const t = setTimeout(() => reject(new Error('Celestial link timed out')), TIMEOUT_MS);
        try {
            const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
            const buf = await streamToBuffer(stream);
            clearTimeout(t);
            resolve(buf);
        } catch (e) { clearTimeout(t); reject(e); }
    });
}

async function webpToJpeg(webpBuf) {
    try {
        const sharp = require('sharp');
        return await sharp(webpBuf)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .jpeg({ quality: 92 })
            .toBuffer();
    } catch (_) { }

    const inP  = tmp('.webp');
    const outP = tmp('.jpg');
    fs.writeFileSync(inP, webpBuf);
    try {
        await run(`ffmpeg -y -i "${inP}" -frames:v 1 -q:v 2 "${outP}"`);
        return fs.readFileSync(outP);
    } finally {
        fs.unlinkSync(inP); try { fs.unlinkSync(outP); } catch (_) {}
    }
}

async function webpToMp4(webpBuf) {
    const inP  = tmp('.webp');
    const outP = tmp('.mp4');
    fs.writeFileSync(inP, webpBuf);
    try {
        await run(
            `ffmpeg -y -i "${inP}" -movflags +faststart ` +
            `-vf "fps=15,scale=trunc(iw/2)*2:trunc(ih/2)*2:flags=lanczos,format=yuv420p" ` +
            `-c:v libx264 -pix_fmt yuv420p -preset veryfast -crf 23 -an "${outP}"`,
            45000
        );
        return fs.readFileSync(outP);
    } finally {
        fs.unlinkSync(inP); try { fs.unlinkSync(outP); } catch (_) {}
    }
}

function isAnimatedWebp(buf) {
    if (!buf || buf.length < 30) return false;
    const head = buf.subarray(0, Math.min(buf.length, 4096)).toString('binary');
    return head.indexOf('ANIM') !== -1 || head.indexOf('ANMF') !== -1;
}

module.exports = {
    name: 'toimg',
    aliases: ['stickertoimg', 's2i', 's2img', 'tophoto', 'reversal'],
    description: 'Perform a Celestial Reversal on a sticker.',
    category: 'media',

    async execute({ sock, msg, from, reply }) {
        const ctx = msg.message?.extendedTextMessage?.contextInfo || msg.message?.imageMessage?.contextInfo || msg.message?.videoMessage?.contextInfo || null;
        const quoted = ctx?.quotedMessage;
        const stickerMsg = quoted?.stickerMessage;

        if (!stickerMsg) {
            return reply(`🖼️ *Celestial Reversal*\n\nReply to any sticker to reveal its original form.`);
        }

        await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } }).catch(() => {});

        let webpBuf;
        try {
            webpBuf = await downloadSticker(stickerMsg);
            if (!webpBuf?.length) throw new Error('empty buffer');
        } catch (e) {
            await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }).catch(() => {});
            return reply('❌ *Reversal disrupted:* Could not summon the sticker data.');
        }

        const isAnimated = !!(stickerMsg.isAnimated || stickerMsg.isAvatar || stickerMsg.isLottie) || isAnimatedWebp(webpBuf);

        if (isAnimated) {
            try {
                const mp4 = await webpToMp4(webpBuf);
                await sock.sendMessage(from, {
                    video: mp4,
                    mimetype: 'video/mp4',
                    caption: '🎞️ *Celestial Reversal complete (Video Form)*',
                    gifPlayback: true,
                }, { quoted: msg });
                await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }).catch(() => {});
                return;
            } catch (e) {
                try {
                    await sock.sendMessage(from, { document: webpBuf, mimetype: 'image/webp', fileName: 'sticker.webp', caption: '⚠️ *Reversal partial:* Sent as raw animated WebP.' }, { quoted: msg });
                    await sock.sendMessage(from, { react: { text: '⚠️', key: msg.key } }).catch(() => {});
                } catch (_) { reply('❌ *Reversal failed.*'); }
                return;
            }
        }

        try {
            const jpeg = await webpToJpeg(webpBuf);
            await sock.sendMessage(from, { image: jpeg, caption: '🖼️ *Celestial Reversal complete (Image Form)*' }, { quoted: msg });
            await sock.sendMessage(from, { react: { text: '✅', key: msg.key } }).catch(() => {});
        } catch (e) {
            try {
                await sock.sendMessage(from, { image: webpBuf, caption: '🖼️ *Celestial Reversal complete (Raw)*' }, { quoted: msg });
            } catch (_) { reply('❌ *Reversal failed.*'); }
        }
    },
};
