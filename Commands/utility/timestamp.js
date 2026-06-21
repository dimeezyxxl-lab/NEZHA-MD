/**
 * Timestamp — Observe the Epoch of the Eternal
 * Usage: .timestamp
 */

module.exports = {
    name: 'timestamp',
    aliases: ['unixtime', 'epoch', 'nowtime'],
    description: 'Measure a moment in the Epoch of the Eternal.',
    category: 'utility',
    async execute({ reply }) {
        const ms = Date.now();
        const sec = Math.floor(ms / 1000);
        const iso = new Date().toISOString();
        
        return reply(
            `⌛ *Epoch of the Eternal*\n\n` +
            `┌─────────────────────────┐\n` +
            `│ ⏱️ Seconds : *${sec}*\n` +
            `│ ⏲️ Millis  : *${ms}*\n` +
            `│ 📅 ISO     : *${iso}*\n` +
            `└─────────────────────────┘\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
