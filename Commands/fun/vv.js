/**
 * VV — Invoke Celestial Sight
 * Usage: .vv (reply to a view-once message)
 */

const { downloadContentFromMessage } = require('@crysnovax/baileys');

// [Keep the extraction and download functions (extractViewOnce, findMedia, downloadMedia, getQuotedMessage) 
// exactly as they are—they are vital mechanical structures and require no rebranding.]

module.exports = {
    name: 'vv',
    aliases: ['viewonce', 'reveal', 'vo', 'sight'],
    description: 'Pierce the veil and reveal a view-once message.',
    usage: '.vv (reply to a view-once message)',
    category: 'fun',

    async execute({ sock, msg, from, reply }) {
        // ── 1. Retrieve the hidden message ──────────────────────────────
        const quotedMsg = getQuotedMessage(msg);

        if (!quotedMsg) {
            return reply(
                `👁️ *Celestial Sight*\n\n` +
                `❌ You must direct your gaze toward a hidden message. Reply to a *view-once* item with *.vv* to pierce the veil.`
            );
        }

        // ── 2. Pierce the veil ──────────────────────────────────────────
        const found = extractViewOnce(quotedMsg);

        if (!found) {
            const directMedia = findMedia(quotedMsg);
            if (!directMedia) {
                return reply(
                    `👁️ *Celestial Sight*\n\n` +
                    `❌ This message holds no hidden essence. Only view-once manifestations may be revealed.`
                );
            }
            Object.assign(found || {}, directMedia);
        }

        const { mediaType, mediaMsg } = found || (findMedia(quotedMsg) || {});

        if (!mediaType || !mediaMsg) {
            return reply(`👁️ *Celestial Sight*\n\n❌ The essence of this message cannot be grasped.`);
        }

        // ── 3. Manifest the truth ──────────────────────────────────────
        await reply(`👁️ _Piercing the veil to reveal the ${mediaType}…_`);

        try {
            const buffer = await downloadMedia(mediaMsg, mediaType);

            const revealCaption =
                `╔══════════════════════════════╗\n` +
                `║   👁️  *CELESTIAL SIGHT*       ║\n` +
                `╚══════════════════════════════╝\n\n` +
                `> _Unveiled by the authority of Nezha-md_ 🏵️`;

            // [Resend logic remains the same, using the Celestial revealCaption]
            if (mediaType === 'image') {
                await sock.sendMessage(from, { image: buffer, caption: revealCaption }, { quoted: msg });
            } else if (mediaType === 'video') {
                await sock.sendMessage(from, { video: buffer, caption: revealCaption, mimetype: mediaMsg.mimetype || 'video/mp4' }, { quoted: msg });
            } else if (mediaType === 'audio') {
                await sock.sendMessage(from, { audio: buffer, mimetype: mediaMsg.mimetype || 'audio/ogg; codecs=opus', ptt: !!mediaMsg.ptt }, { quoted: msg });
                await reply(revealCaption);
            } else if (mediaType === 'document') {
                await sock.sendMessage(from, { document: buffer, mimetype: mediaMsg.mimetype || 'application/octet-stream', fileName: mediaMsg.fileName || 'revealed_truth', caption: revealCaption }, { quoted: msg });
            }

        } catch (err) {
            console.error('[CelestialSight] Download failed:', err.message);
            return reply(`👁️ *Celestial Sight*\n\n❌ *The veil remains intact.*\n\n_Reason: The message has faded into the void or has already been consumed._`);
        }
    }
};
