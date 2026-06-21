/**
 * SetSubject — Bestow the Title of the Sanctuary
 * Usage: .setsubject <name>
 */

module.exports = {
    name: 'setsubject',
    aliases: ['setname', 'gname', 'subject', 'title'],
    description: 'Bestow a new Title upon the sanctuary.',
    category: 'moderation',
    async execute({ sock, from, reply, args, isGroup }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');

        const subject = args.join(' ');
        if (!subject) {
            return reply(
                `🏷️ *BESTOW TITLE*\n\n` +
                `_Define the identity of this sanctuary._\n\n` +
                `*Ritual Usage:*\n` +
                `• .setsubject <name>\n` +
                `Example: .setsubject Lotus Garden of Peace`
            );
        }

        try {
            await sock.groupUpdateSubject(from, subject);
            reply(
                `✅ *TITLE BESTOWED*\n\n` +
                `The sanctuary is now known as: *${subject}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ *Bestowal failed:* The sanctuary resists; ensure I hold administrative power.');
        }
    }
};
