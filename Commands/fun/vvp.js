/**
 * VVP — Invoke Celestial Shadow-Sight
 * Usage: .vvp (reply to a view-once message)
 */

'use strict';

const { downloadContentFromMessage } = require('@crysnovax/baileys');

// [Keep all mechanical helper functions (extractViewOnce, findMedia, downloadMedia, getQuotedMessage) 
// exactly as they are—they are the underlying conduits of this stealth power.]

module.exports = {
    name:        'vvp',
    aliases:     ['vvprivate', 'pvv', 'shadowsight'],
    category:    'fun',
    description: 'Intercept a view-once message and manifest it silently in your sanctuary.',
    usage:       '.vvp (reply to a view-once message)',

    async execute({ sock, msg, from, sender, phoneNumber, reply, isOwner }) {

        // ── 1. Sovereign Access Only ──────────────────────────────────────
        if (!isOwner) {
            return reply(`🔒 _This arcane art is reserved for the Sovereign._`);
        }

        // ── 2. Identify the hidden essence ────────────────────────────────
        const quotedMsg = getQuotedMessage(msg);

        if (!quotedMsg) {
            return reply(
                `👁️ *Celestial Shadow-Sight*\n\n` +
                `❌ You must direct your focus toward a hidden manifestation. Reply to a *view-once* item with *.vvp* to intercept it into your sanctuary.`
            );
        }

        let found = extractViewOnce(quotedMsg) || findMedia(quotedMsg);

        if (!found) {
            return reply(
                `👁️ *Celestial Shadow-Sight*\n\n` +
                `❌ The target holds no hidden essence. Only view-once manifestations may be intercepted.`
            );
        }

        const { mediaType, mediaMsg } = found;
        if (!mediaType || !mediaMsg) {
            return reply(`👁️ *Celestial Shadow-Sight*\n\n❌ The essence remains elusive.`);
        }

        // ── 3. Harvest from the shadows ───────────────────────────────────
        let buffer;
        try {
            buffer = await downloadMedia(mediaMsg, mediaType);
        } catch (err) {
            console.error('[ShadowSight] Download error:', err.message);
            return reply(`👁️ *Celestial Shadow-Sight*\n\n❌ *The veil remains unbroken.* _Reason: The message has faded into the void or has already been consumed._`);
        }

        // ── 4. Sanctuary destination ──────────────────────────────────────
        const ownerJid = `${phoneNumber.replace(/\D/g, '')}@s.whatsapp.net`;

        const dmCaption =
            `╔══════════════════════════════╗\n` +
            `║  👁️  *CELESTIAL SHADOW-SIGHT*  ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `📍 *Origin:* ${from.endsWith('@g.us') ? 'Mortal Assembly' : 'Private Veil'}\n` +
            `> _Manifested silently by Nezha-md_ 🏵️`;

        // ── 5. Manifest in private sanctuary ──────────────────────────────
        try {
            if (mediaType === 'image') {
                await sock.sendMessage(ownerJid, { image: buffer, caption: dmCaption });
            } else if (mediaType === 'video') {
                await sock.sendMessage(ownerJid, { video: buffer, caption: dmCaption, mimetype: mediaMsg.mimetype || 'video/mp4' });
            } else if (mediaType === 'audio') {
                await sock.sendMessage(ownerJid, { audio: buffer, mimetype: mediaMsg.mimetype || 'audio/ogg; codecs=opus', ptt: !!mediaMsg.ptt });
                await sock.sendMessage(ownerJid, { text: dmCaption });
            } else if (mediaType === 'document') {
                await sock.sendMessage(ownerJid, { document: buffer, mimetype: mediaMsg.mimetype || 'application/octet-stream', fileName: mediaMsg.fileName || 'revealed_truth', caption: dmCaption });
            }

            // ── 6. Silent Confirmation ────────────────────────────────────
            if (from !== ownerJid) {
                await sock.sendMessage(ownerJid, {
                    text: `✅ _The ${mediaType} has been manifested in your sanctuary. None shall know of this interception._`
                });
            }

        } catch (err) {
            console.error('[ShadowSight] Send error:', err.message);
            return reply(`👁️ *Celestial Shadow-Sight*\n\n❌ Failed to manifest in sanctuary: _${err.message}_`);
        }
    }
};
