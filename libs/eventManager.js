'use strict';
/**
 * eventManager.js — The Sanctuary Gatekeeper
 * ─────────────────────────────────────────────────────────────────────────────
 * The Lotus Prince stands as the sentinel of your digital temple.
 * Manages the entry and departure rites for all who cross the threshold.
 */

const database = require('../utils/database');

// ── Styling constants ─────────────────────────────────────────────────────────
const TITLE_BOLD    = '𝙉𝙀𝙕𝙃𝘼';
const FOOTER_ITALIC = '𝙡𝙤𝙩𝙪𝙨 𝙥𝙧𝙞𝙣𝙘𝙚 𝙫𝙞𝙜𝙞𝙡';
const DIVIDER       = '━━━━━━━━━━━━━━━━━━━━━';

// ── Intro card themes ─────────────────────────────────────────────────────────
const THEMES = {
    default: { top: '🏮', mid: '✦', star: '⭐', wave: '〰️', gem: '💎' },
    dark:    { top: '🖤', mid: '◆', star: '🌑', wave: '▬',  gem: '🔮' },
    fire:    { top: '🔥', mid: '🌟', star: '💥', wave: '〰️', gem: '🏆' },
    ocean:   { top: '🌊', mid: '🐚', star: '💙', wave: '〰️', gem: '🐬' },
    royal:   { top: '👑', mid: '♦',  star: '🌟', wave: '━',  gem: '💍' },
    light:   { top: '☀️', mid: '✨', star: '🌸', wave: '〰️', gem: '🦋' },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function _normJid(j) {
    return (j || '').split('@')[0].split(':')[0].replace(/\D/g, '');
}

function _participantJid(p) {
    if (!p) return '';
    if (typeof p === 'string') return p;
    return p.phoneNumber || p.id || p.jid || '';
}

function _withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise(resolve => setTimeout(() => resolve(null), ms)),
    ]).catch(() => null);
}

function _fetchPP(sock, jid) {
    return _withTimeout(sock.profilePictureUrl(jid, 'image'), 3500);
}

function _fetchMeta(sock, groupId) {
    return _withTimeout(sock.groupMetadata(groupId), 3500);
}

// ── Banner builder (welcome / goodbye) ───────────────────────────────────────

function buildBanner(kind, participant, groupName, memberCount, customMsg) {
    const number      = _participantJid(participant).split('@')[0].split(':')[0];
    const userMention = `@${number}`;
    const action      = kind === 'welcome' ? 'Entrance to' : 'Departure from';
    const greeting    = kind === 'welcome' ? 'The Lotus Prince welcomes' : 'The Lotus Prince bids farewell to';
    const tail        = customMsg
        ? customMsg
            .replace(/@user/g,     userMention)
            .replace(/\{name\}/gi, userMention)
            .replace(/@group/g,    groupName)
            .replace(/\{group\}/gi, groupName)
            .replace(/\{count\}/gi, String(memberCount))
        : (kind === 'welcome' ? 'May your stay be blessed. 🎉' : 'May your path be clear. 👋');

    return (
        `┏━〔 ✦ ${TITLE_BOLD} 〕━\n` +
        `❏┃ ${action} *${groupName}*\n` +
        `❏┃ ${greeting} ${userMention}\n` +
        `❏┃ Current Congregation: ${memberCount || '...'}\n` +
        `❏┃ ${tail}\n` +
        `\n` +
        `${FOOTER_ITALIC}\n` +
        `${DIVIDER}`
    );
}

// ── Intro card builder ────────────────────────────────────────────────────────

function buildIntroCard(participant, groupName, memberCount, grp) {
    const number = _participantJid(participant).split('@')[0].split(':')[0];
    const t      = THEMES[grp.introcardTheme] || THEMES.default;
    const title  = grp.introcardTitle || `Welcome to ${groupName}`;
    const body   = grp.introcardMessage
        ? grp.introcardMessage
            .replace(/@user/g,     `@${number}`)
            .replace(/\{name\}/gi, `@${number}`)
            .replace(/@group/g,    groupName)
            .replace(/\{group\}/gi, groupName)
        : `Greetings @${number}! 👋\nPresent yourself to the Lotus Prince.`;

    const line = '━━━━━━━━━━━━━━━━━━━━━━━━';
    return (
        `${t.top}${t.top}${t.top} *${title.toUpperCase()}* ${t.top}${t.top}${t.top}\n` +
        `${line}\n\n` +
        `${t.star} *NEW ASCENDANT* ${t.star}\n` +
        `👤 @${number}\n\n` +
        `${line}\n\n` +
        `${t.gem} *Temple:* ${groupName}\n` +
        `👥 *Congregation:* ${memberCount || '...'}\n\n` +
        `${line}\n\n` +
        `${body}\n\n` +
        `${line}\n` +
        `${t.mid} _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
    );
}

// ── Core send functions remain optimized for speed ───────────────────────────

async function _sendWithOptionalPP(sock, groupId, participant, caption) {
    participant = _participantJid(participant);
    const opts = { mentions: [participant], contextInfo: { mentionedJid: [participant] } };
    const ppUrl = await _fetchPP(sock, participant);

    if (ppUrl) {
        try {
            await sock.sendMessage(groupId, { image: { url: ppUrl }, caption, ...opts });
            return;
        } catch (_) {}
    }
    await sock.sendMessage(groupId, { text: caption, ...opts });
}

async function _sendIntroWithOptionalPP(sock, groupId, groupPicPromise, caption, participant) {
    participant = _participantJid(participant);
    const opts = { mentions: [participant], contextInfo: { mentionedJid: [participant] } };
    const gpicUrl = await _withTimeout(groupPicPromise, 2500);

    if (gpicUrl) {
        try {
            await sock.sendMessage(groupId, { image: { url: gpicUrl }, caption, ...opts });
            return;
        } catch (_) {}
    }
    await sock.sendMessage(groupId, { text: caption, ...opts });
}

// ── Public API ────────────────────────────────────────────────────────────────

async function sendBanner(sock, groupId, participant, kind, groupName, memberCount, customMsg) {
    const caption = buildBanner(kind, participant, groupName || 'the temple', memberCount || 0, customMsg);
    await _sendWithOptionalPP(sock, groupId, participant, caption);
}

async function sendIntroCard(sock, groupId, participant, meta, grp) {
    if (!grp) grp = database.getGroup(groupId);
    const groupName   = meta?.subject || 'the temple';
    const memberCount = meta?.participants?.length || 0;
    const caption     = buildIntroCard(participant, groupName, memberCount, grp);
    const gpicPromise = sock.profilePictureUrl(groupId, 'image').catch(() => null);
    await _sendIntroWithOptionalPP(sock, groupId, gpicPromise, caption, participant);
}

async function handleGroupParticipantsEvent(sock, phoneNumber, { id, participants, action, author }) {
    try {
        const grp = database.getGroup(id);
        const needsWelcome  = action === 'add'    && grp.welcome;
        const needsIntro    = action === 'add'    && grp.introcard;
        const needsGoodbye  = action === 'remove' && grp.goodbye;

        if (!needsWelcome && !needsIntro && !needsGoodbye) return;

        const botJid          = _normJid(sock.user?.id);
        const safeParticipants = (participants || []).map(_participantJid).filter(Boolean).filter(jid => _normJid(jid) !== botJid);
        if (!safeParticipants.length) return;

        const metaPromise = _fetchMeta(sock, id);

        if (needsWelcome || needsGoodbye) {
            const meta = await _withTimeout(metaPromise, 1500);
            const groupName   = meta?.subject || 'the temple';
            const memberCount = meta?.participants?.length || 0;

            for (const p of safeParticipants) {
                if (needsWelcome) sendBanner(sock, id, p, 'welcome', groupName, memberCount, grp.welcomeMessage || null);
                if (needsGoodbye) sendBanner(sock, id, p, 'goodbye', groupName, memberCount, grp.goodbyeMessage || null);
            }
        }

        if (needsIntro) {
            const meta = await _withTimeout(metaPromise, 1500);
            for (const p of safeParticipants) {
                sendIntroCard(sock, id, p, meta, grp);
            }
        }
    } catch (e) {
        console.error('[Sanctuary Gatekeeper] Error:', e.message);
    }
}

module.exports = { handleGroupParticipantsEvent, sendBanner, sendIntroCard };
