'use strict';
const os   = require('os');
const fs   = require('fs');
const path = require('path');
const config         = require('../../config');
const commandLoader  = require('../../utils/commandLoader');
const database       = require('../../utils/database');
const { buildCaption } = require('../../utils/menuDesigns');
const { boldItalic } = require('../../utils/styleBox');

const VIDEO_PATH = path.join(__dirname, '..', '..', 'assets', 'menuvideo.mp4');
const IMAGE_PATH = path.join(__dirname, '..', '..', 'assets', 'menuimage.jpg');

const CHANNEL_JID  = '';
const CHANNEL_NAME = 'NEZHA-MD';

function buildChannelCtx() {
    return {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: CHANNEL_JID,
            newsletterName: CHANNEL_NAME,
            serverMessageId: 143,
        },
    };
}

function fmtUptime(sec) {
    sec = Math.floor(sec);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (d) return `${d}d ${h}h ${m}m ${s}s`;
    return `${h}h ${m}m ${s}s`;
}

function fmtMB(bytes) {
    return Math.round(bytes / 1024 / 1024) + 'MB';
}

function pad2(n) { return String(n).padStart(2, '0'); }

const CATEGORY_LABELS = {
    owner:      'OWNER',
    admin:      'ADMIN',
    moderation: 'MODERATION',
    economy:    'ECONOMY',
    fun:        'FUN',
    media:      'MEDIA',
    ai:         'AI',
    utility:    'UTILITY',
    group:      'GROUP',
    general:    'GENERAL',
    unicode:    'UNICODE',
    '18plus':   '18PLUS',
    textmaker:  'TEXTMAKER',
};

const CATEGORY_ORDER = [
    'owner', 'admin', 'moderation', 'economy', 'fun', 'media',
    'ai', 'utility', 'group', 'general', 'unicode', '18plus', 'textmaker',
];

// ── Fallback caption (Nezha-md layout) ──
function buildFallbackCaption(ctx) {
    const {
        senderNumber, ownerName, prefix, mode, uptime,
        ramUsed, ramTotal, cmdCount, version, date, time,
        sortedCategories, byCategory,
    } = ctx;

    const header =
`> ┏❐  ⌜ *𝙉𝙀𝙕𝙃𝘼 𝙈𝘿*⌟  ❐ 
> ┃⭔ User    : @${senderNumber}
> ┃⭔ Master  : ${ownerName}
> ┃⭔ Prefix  : ${prefix}
> ┃⭔ Mode    : ${mode}
> ┃⭔ Uptime  : ${uptime}
> ┃⭔ Status  : Online 🐦‍🔥
> ┃⭔ RAM     : ${ramUsed} / ${ramTotal}
> ┃⭔ Version : v${version}
> ┗❐`;

    let body = `\n\n> ┏❐  ⌜ *CELESTIAL COMMANDS*⌟  ❐ \n`;
    for (const cat of sortedCategories) {
        const list = byCategory[cat];
        if (!list || !list.length) continue;
        const label = CATEGORY_LABELS[cat] || cat.toUpperCase();
        body += `\n\n*━━ ${label} ━━*\n`;
        for (const n of [...list].sort()) body += `> ❐ ${n}\n`;
    }
    body += `\n> ┗❐ ┈┈┈┈┈┈┈┈┈┈✧\n> _𝙉𝙀𝙕𝙃𝘼 𝙈𝘿 · 𝙇𝙤𝙩𝙪𝙨 𝙋𝙧𝙞𝙣𝙘𝙚 · ${cmdCount} commands_`;

    return header + body;
}

module.exports = {
    name: 'menu',
    aliases: ['help', 'list', 'commands'],
    description: 'Show the NEZHA MD command menu',
    category: 'admin',

    async execute({ sock, msg, from, sender, reply, phoneNumber }) {
        let loadingKey = null;
        try {
            const frames = [
                '🐦‍🔥 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝘾𝙚𝙡𝙚𝙨𝙩𝙞𝙖𝙡 𝙁𝙞𝙧𝙚... 🐦‍🔥\n\n  ▰▱▱▱▱',
                '🐦‍🔥 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝘾𝙚𝙡𝙚𝙨𝙩𝙞𝙖𝙡 𝙁𝙞𝙧𝙚... 🐦‍🔥\n\n  ▰▰▱▱▱',
                '🐦‍🔥 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝘾𝙚𝙡𝙚𝙨𝙩𝙞𝙖𝙡 𝙁𝙞𝙧𝙚... 🐦‍🔥\n\n  ▰▰▰▱▱',
                '🐦‍🔥 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝘾𝙚𝙡𝙚𝙨𝙩𝙞𝙖𝙡 𝙁𝙞𝙧𝙚... 🐦‍🔥\n\n  ▰▰▰▰▱',
                '🐦‍🔥 𝙇𝙤𝙖𝙙𝙞𝙣𝙜 𝘾𝙚𝙡𝙚𝙨𝙩𝙞𝙖𝙡 𝙁𝙞𝙧𝙚... 🐦‍🔥\n\n  ▰▰▰▰▰',
            ];
            const sent = await sock.sendMessage(from, { text: frames[0] }, { quoted: msg });
            loadingKey = sent?.key || null;
            for (let i = 1; i < frames.length; i++) {
                await new Promise(r => setTimeout(r, 350));
                try { await sock.sendMessage(from, { text: frames[i], edit: loadingKey }); } catch (_) {}
            }
        } catch (e) { console.error('[menu] animation failed:', e.message); }

        const commands = commandLoader.commands || new Map();
        const byCategory = {};
        for (const [name, cmd] of commands.entries()) {
            const cat = (cmd.category || 'general').toLowerCase();
            if (!byCategory[cat]) byCategory[cat] = [];
            byCategory[cat].push(name);
        }
        for (const k of Object.keys(byCategory)) byCategory[k].sort();

        const sortedCategories = [
            ...CATEGORY_ORDER,
            ...Object.keys(byCategory).filter(c => !CATEGORY_ORDER.includes(c)),
        ].filter(c => byCategory[c]?.length);

        const senderJid = sender || msg?.key?.participant || msg?.key?.remoteJid || '';
        const senderNumber = String(phoneNumber || senderJid).replace(/[^0-9]/g, '') || 'user';
        const ownerName    = (config.owner && config.owner.name) || 'Lotus Prince';
        const prefix       = config.prefix || '.';
        const mode         = (global.botMode || config.mode || 'private').toLowerCase();
        const version      = config.version || '3.0.0';

        const designCtx = {
            userTag:  `@${senderNumber}`,
            creator:  ownerName,
            mode,
            total:    commands.size,
            uptime:   fmtUptime(process.uptime()),
            prefix,
            version,
            ramUsed:     fmtMB(process.memoryUsage().rss),
            Total:    fmtMB(os.totalmem()),
            date:     new Date().toLocaleDateString(),
            time:     new Date().toLocaleTimeString(),
            sortedCategories,
            byCategory,
            CATEGORY_LABELS,
            boldItalic,
        };

        let caption;
        try {
            const designKey = (database.getMenuDesign(phoneNumber) || 'nor').toLowerCase();
            caption = buildCaption(designKey, designCtx);
        } catch (e) {
            caption = buildFallbackCaption({ 
                ...designCtx, 
                senderNumber, 
                ownerName, 
                prefix, 
                mode, 
                cmdCount: commands.size,
                ramUsed: designCtx.Used,
                ramTotal: designCtx.Total
            });
        }

        const ctx = buildChannelCtx();
        try {
            if (loadingKey) { try { await sock.sendMessage(from, { delete: loadingKey }); } catch (_) {} }

            if (fs.existsSync(IMAGE_PATH)) {
                return await sock.sendMessage(from, { image: fs.readFileSync(IMAGE_PATH), caption, mentions: [senderJid], contextInfo: ctx }, { quoted: msg });
            }
            if (fs.existsSync(VIDEO_PATH)) {
                return await sock.sendMessage(from, { video: fs.readFileSync(VIDEO_PATH), mimetype: 'video/mp4', caption, mentions: [senderJid], contextInfo: ctx }, { quoted: msg });
            }
            return await sock.sendMessage(from, { text: caption, mentions: [senderJid], contextInfo: ctx }, { quoted: msg });
        } catch (e) {
            return reply(caption);
        }
    },
};
