/**
 * SetDesc — Inscribe the Scripture of the Sanctuary
 * Usage: .setdesc <description>
 */

module.exports = {
    name: 'setdesc',
    aliases: ['setdescription', 'gdesc', 'inscribe', 'scripture'],
    description: 'Inscribe the Scripture (description) of the sanctuary.',
    category: 'moderation',
    async execute({ sock, from, reply, args, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');

        const description = args.join(' ');
        if (!description) {
            return reply(
                `📝 *SCRIPTURE OF THE SANCTUARY*\n\n` +
                `_Define the purpose and laws of this domain._\n\n` +
                `*Ritual Usage:*\n` +
                `• .setdesc <description>\n` +
                `Example: .setdesc Welcome to the Lotus Garden.`
            );
        }

        try {
            await sock.groupUpdateDescription(from, description);
            reply(
                `✅ *SCRIPTURE INSCRIBED*\n\n` +
                `_The new decree has been etched into the sanctuary's foundation:_\n\n` +
                `"${description}"\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ *Inscription failed:* The sanctuary resists; ensure I hold administrative power.');
        }
    }
};
