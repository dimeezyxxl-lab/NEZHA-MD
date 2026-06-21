/**
 * DateFmt — Invoke Chronos Alignment
 * Usage: .datefmt
 */

module.exports = {
    name: 'datefmt',
    aliases: ['date', 'time', 'chronos', 'clock'],
    description: 'Align the sanctuary with the current temporal state.',
    category: 'utility',
    async execute({ reply }) {
        const d = new Date();
        
        return reply(
            `⏳ *Chronos Alignment*\n\n` +
            `The Lotus Prince observes the flow of time:\n\n` +
            `• ISO: \`${d.toISOString()}\`\n` +
            `• Universal: \`${d.toUTCString()}\`\n` +
            `• Mortal: \`${d.toString()}\`\n` +
            `• Day: *${d.toLocaleDateString('en-GB', { weekday: 'long' })}*\n` +
            `• YMD: \`${d.toISOString().slice(0, 10)}\`\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
