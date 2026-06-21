/**
 * Title — Invoke Herald’s Decree
 * Usage: .title <text>
 */

module.exports = {
    name: 'title',
    aliases: ['titlecase', 'decree', 'format'],
    description: 'Imbue your words with the formality of a Herald’s Decree.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply('📜 _Present the message you wish the Lotus Prince to formalize with the Herald’s Decree._');
        }

        try {
            // Imbuing the text with nobility
            const out = text.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase());
            
            return reply(
                `🖋️ *Herald’s Decree Issued*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The decree has failed; the Lotus Prince could not formalize these words._');
        }
    }
};
