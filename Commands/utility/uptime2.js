/**
 * Uptime2 — Invoke Vigil of the Prince
 * Usage: .uptime2
 */

module.exports = {
    name: 'uptime2',
    aliases: ['runtime2', 'vigil'],
    description: 'Track the duration of the Prince’s unwavering watch.',
    category: 'utility',
    async execute({ reply }) {
        const s = Math.floor(process.uptime());
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const sec = s % 60;
        
        return reply(
            `🏮 *Vigil of the Prince*\n\n` +
            `The Lotus Prince has stood watch for:\n` +
            `*${h}h ${m}m ${sec}s*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
