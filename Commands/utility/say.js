/**
 * Say — Invoke Voice of the Lotus
 * Usage: .say <text>
 */

module.exports = {
    name: 'say',
    aliases: ['speak', 'echo', 'voice'],
    description: 'Grant the Lotus Prince the authority to speak your message.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🗣️ *Voice of the Lotus*\n\n` +
                `The Lotus Prince awaits your words.\n\n` +
                `Usage: .say <message>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const text = args.join(' ');
        
        reply(
            `${text}\n\n` +
            `> _— 𝗩𝗼𝗶𝗰𝗲 𝗼𝗳 𝘁𝗵𝗲 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
