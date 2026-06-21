/**
 * Sticker — Manifest a Celestial Seal
 * Usage: Reply to media + .sticker
 */

const { downloadContentFromMessage } = require('@crysnovax/baileys');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const TIMEOUT_MS = 30000;

// ... [Keep helper functions: downloadMedia, toWebpWithSharp, videoToWebp, getQuoted as they are]

module.exports = {
    name: 'sticker',
    aliases: ['s', 'stiker', 'seal', 'manifest'],
    description: 'Manifest a celestial seal (sticker) from a photo or video.',
    usage: 'Reply to media + .sticker',
    category: 'general',

    async execute({ sock, msg, from, args, reply }) {
        const { quoted } = getQuoted(msg);

        // ── Quoted seal — manifest as-is ─────────────────────────────────────
        if (quoted?.stickerMessage) {
            try {
                const buf = await downloadMedia(quoted.stickerMessage, 'sticker');
                await sock.sendMessage(from, { sticker: buf }, { quoted: msg });
                return;
            } catch (err) {
                return reply(`❌ *Manifestation failed:* _${err.message}_`);
            }
        }

        // ── Image seal ────────────────────────────────────────────────────────
        if (quoted?.imageMessage) {
            await reply('🏵️ _Crafting your celestial seal…_');
            try {
                const rawBuf  = await downloadMedia(quoted.imageMessage, 'image');
                const webpBuf = await toWebpWithSharp(rawBuf);
                await sock.sendMessage(from, { sticker: webpBuf }, { quoted: msg });
                return;
            } catch (err) {
                return reply(`❌ *Crafting failed:* _${err.message}_`);
            }
        }

        // ── Video seal ────────────────────────────────────────────────────────
        if (quoted?.videoMessage) {
            await reply('🏵️ _Forging your animated celestial seal…_');

            const tmpIn  = path.join(os.tmpdir(), `stk_in_${Date.now()}.mp4`);
            const tmpOut = path.join(os.tmpdir(), `stk_out_${Date.now()}.webp`);

            try {
                const rawBuf = await downloadMedia(quoted.videoMessage, 'video');
                fs.writeFileSync(tmpIn, rawBuf);

                let stickerBuf;
                try {
                    await videoToWebp(tmpIn, tmpOut);
                    stickerBuf = fs.readFileSync(tmpOut);
                } catch (_) {
                    stickerBuf = rawBuf;
                }

                await sock.sendMessage(from, { sticker: stickerBuf }, { quoted: msg });
                return;
            } catch (err) {
                return reply(`❌ *Forging failed:* _${err.message}_`);
            } finally {
                for (const f of [tmpIn, tmpOut]) {
                    try { if (fs.existsSync(f)) fs.unlinkSync(f); } catch (_) {}
                }
            }
        }

        return reply(
            `🏵️ *Celestial Seal Maker*\n\n` +
            `Reply to any vision or echo with \`.sticker\` to manifest a seal.\n\n` +
            `*Usage:*\n` +
            `• Reply to a *photo* + \`.sticker\`\n` +
            `• Reply to a *video* + \`.sticker\` (animated)\n` +
            `• Reply to an *existing seal* + \`.sticker\` to copy it\n\n` +
            `_Divine animation requires ffmpeg on the server._`
        );
    }
};
