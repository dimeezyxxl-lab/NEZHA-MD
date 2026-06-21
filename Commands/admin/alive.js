/**
 * Alive Command — Sends a peak-cyber canvas card showing live bot status.
 *
 * Usage: .alive
 */

'use strict';

const os     = require('os');
const config = require('../../config');
const { renderAliveCard } = require('../../utils/canvasRender');

module.exports = {
    name: 'alive',
    aliases: ['status', 'online'],
    description: 'Check if bot is alive — returns a celestial status canvas',
    category: 'admin',

    async execute({ sock, msg, from, reply, t, phoneNumber }) {
        const tr = t || ((k) => k);

        // ── uptime ────────────────────────────────────────────────────
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);
        const uptimeStr =
            h > 0 ? `${h}h ${m}m ${s}s` :
            m > 0 ? `${m}m ${s}s` :
                    `${s}s`;

        // ── timestamps ────────────────────────────────────────────────
        const now  = new Date();
        const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // ── memory ────────────────────────────────────────────────────
        const totalMB = Math.round(os.totalmem() / 1024 / 1024);
        const freeMB  = Math.round(os.freemem()  / 1024 / 1024);
        const usedMB  = totalMB - freeMB;

        // ── ping ──────────────────────────────────────────────────────
        let ping = 0;
        try {
            const start = Date.now();
            await sock.sendPresenceUpdate('available', from).catch(() => {});
            ping = Date.now() - start;
        } catch (_) { ping = 0; }

        // ── caption ──────────────────────────────────────────────────
        const caption =
`╭─❍ *${config.botName || 'NEZHA MD'}* ❍─╮
│ ✨ ${tr('alive.status') || 'The Lotus Prince is active'}
│ ⏱️  ${uptimeStr}
│ 📦  v${config.version || '1.0.0'}
│ ⚡  Prefix: \`${config.prefix || '.'}\`
╰────────────────────────╯
> _${tr('alive.powered') || 'The Lotus Prince · Heavens Online'}_`;

        // ── render canvas ─────────────────────────────────────────────
        try {
            const buffer = await renderAliveCard({
                botName:  config.botName || 'NEZHA MD',
                tagline:  'The Lotus Prince · Heavens Online',
                owner:    config.owner?.name || 'Xyz',
                version:  config.version || '1.0.0',
                prefix:   config.prefix || '.',
                uptime:   uptimeStr,
                date,
                time,
                ramUsed:  usedMB,
                ramTotal: totalMB,
                ping,
                nodeVer:  process.version,
                platform: process.platform,
            });

            await sock.sendMessage(from, {
                image:   buffer,
                caption,
                mimetype: 'image/png',
            }, { quoted: msg });
            return;
        } catch (e) {
            console.error('[NEZHA-ALIVE] Canvas render failed:', e.message, '— falling back to text');
        }

        // ── text fallback ─────────────────────────────────────────────
        await reply(caption);
    }
};
