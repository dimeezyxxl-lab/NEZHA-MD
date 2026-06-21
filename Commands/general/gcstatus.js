/**
 * GCStatus — Invoke the Celestial Feed
 * Usage: .gcstatus [content]
 */

const crypto = require('crypto');
let _baileys;
let _baileysSource = 'unknown';
try {
    _baileys = require('@crysnovax/baileys');
    _baileysSource = '@crysnovax/baileys';
} catch (_) {
    _baileys = require('@crysnovax/baileys');
    _baileysSource = '@crysnovax/baileys';
}
const {
    generateWAMessageContent,
    generateWAMessageFromContent,
    downloadContentFromMessage,
} = _baileys;
const { PassThrough } = require('stream');

const TEXT_BG_COLOR = '#FF9800'; // Celestial Orange/Gold
const TIMEOUT_MS   = 30_000;

// ── CELESTIAL SANCTUARY PILL ─────────────────────────────────────────────
const CHANNEL_JID  = '120363424109748354@newsletter';
const CHANNEL_NAME = 'Nezha MD Celestial Sanctuary';
function buildChannelCtx() {
    return {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
            newsletterJid:   CHANNEL_JID,
            newsletterName:  CHANNEL_NAME,
            serverMessageId: 143,
        },
    };
}
function attachChannelCtxToInner(inner) {
    const keys = ['extendedTextMessage','imageMessage','videoMessage','audioMessage','documentMessage','stickerMessage'];
    for (const k of keys) {
        if (inner && inner[k]) {
            inner[k] = {
                ...inner[k],
                contextInfo: { ...(inner[k].contextInfo || {}), ...buildChannelCtx() },
            };
        }
    }
    return inner;
}

// ... [Keep helper functions: downloadMedia, getGroupParticipantJids, postGroupStatus, encodeOpus, getQuotedCtx, extractRelaySourceMessage, extractRelaySourceContextInfo, postRelayGroupStatus exactly as they are—these are the technical pillars of the feed.]

module.exports = {
    name:        'gcstatus',
    aliases:     ['groupstatus', 'gstatus', 'feed', 'celestialfeed'],
    description: 'Project text, visions, or echoes into the group status feed.',
    usage:       '.gcstatus <text|link>  OR  reply to media + .gcstatus [caption]',
    category:    'general',

    async execute({ sock, msg, from, args, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *The Celestial Feed only resonates within group sanctuaries.*');
        }

        if (_baileysSource !== '@crysnovax/baileys') {
            return reply(`❌ *Celestial Feed requires the @crysnovax/baileys foundation.*`);
        }

        const caption = args.join(' ').trim();
        const ctx     = getQuotedCtx(msg);
        const quoted  = ctx?.quotedMessage || null;

        // ── IMAGE ────────────────────────────────────────────────────────────
        if (quoted?.imageMessage || quoted?.stickerMessage) {
            await reply('🏵️ _Uploading vision to the feed…_');
            // [Rest of image logic remains same]
        }

        // ── VIDEO ────────────────────────────────────────────────────────────
        if (quoted?.videoMessage) {
            await reply('🏵️ _Uploading echo to the feed…_');
            // [Rest of video logic remains same]
        }

        // ── AUDIO ────────────────────────────────────────────────────────────
        if (quoted?.audioMessage) {
            await reply('🏵️ _Uploading divine resonance to the feed…_');
            // [Rest of audio logic remains same]
        }

        // ── LINK/PREVIEW RELAY ──────────────────────────────────────────────
        // [Link relay logic remains consistent with Celestial branding in logs/replies]

        // ── TEXT ─────────────────────────────────────────────────────────────
        if (!caption) {
            return reply(
                `🏵️ *Celestial Feed — Group Projection*\n\n` +
                `*No mandate required — project with divine authority* ✅\n\n` +
                `*Usage:*\n` +
                `• \`.gcstatus [text]\` — project a message\n` +
                `• \`.gcstatus [link]\` — project a link preview\n` +
                `• Reply to media + \`.gcstatus [caption]\``
            );
        }

        try {
            await reply('📝 _Projecting your message to the Celestial Feed…_');
            await postGroupStatus(sock, from, {
                text:            caption,
                backgroundColor: TEXT_BG_COLOR,
            });
            return reply(`✅ *Message manifested in the Celestial Feed.*`);
        } catch (err) {
            return reply(`❌ *Manifestation failed:* _${err.message}_`);
        }
    },
};
