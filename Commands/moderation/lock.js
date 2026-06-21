/**
 * Lock — Invoke Sanctuary Seal
 * Usage: .lock
 */

module.exports = {
    name: 'lock',
    aliases: ['gclock', 'grouplock', 'seal', 'sanctuaryseal'],
    description: 'Invoke Sanctuary Seal to restrict speech to celestial authorities.',
    category: 'moderation',
    async execute({ sock, from, reply, isGroup, isAdmin }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');
        
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Authority Required!*\n\n❌ _Only those with administrative authority may command the Sanctuary Seal._');
        }

        try {
            await sock.groupSettingUpdate(from, 'announcement');
            reply(
                `🔒 *SANCTUARY SEAL INVOKED*\n\n` +
                `_The sanctuary is now in meditative stillness._\n` +
                `Only those with celestial authority may now speak.\n\n` +
                `Invoke the release with: .unlock\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ *Seal failed:* The sanctuary resists; ensure I hold administrative power.');
        }
    }
};
