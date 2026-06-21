/**
 * Urlencode — Invoke Veil of Obscuration
 * Usage: .urlencode <text>
 */

module.exports = {
    name: 'urlencode',
    aliases: ['encodeurl', 'cloak'],
    description: 'Cloak your words beneath the Veil of Obscuration.',
    category: 'utility',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) {
            return reply(
                `🛡️ *Veil of Obscuration*\n\n` +
                `The Lotus Prince awaits the text you wish to cloak.\n\n` +
                `Usage: .urlencode <text>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            // Cloaking the text for secure passage
            const out = encodeURIComponent(text);
            
            return reply(
                `🛡️ *Veil Applied*\n\n` +
                `*${out}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ _The veil could not be cast; the Lotus Prince encountered a disruption in the flow._');
        }
    }
};
