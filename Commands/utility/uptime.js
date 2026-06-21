/**
 * Uptime — Observe the Sanctuary Vitality
 * Usage: .uptime
 */

const os = require('os');
const config = require('../../config');
const { renderUptimeCard } = require('../../utils/canvasRender');

const fmt = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
};

module.exports = {
    name: 'uptime',
    aliases: ['runtime', 'system', 'vitality', 'vigil'],
    description: 'Monitor the ongoing vigil and vitality of the Lotus Prince.',
    category: 'utility',
    async execute({ sock, msg, from, reply }) {
        const botUptime = fmt(process.uptime());
        const sysUptime = fmt(os.uptime());
        const platform  = os.platform();
        const arch      = os.arch();
        const totalMem  = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem   = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const botMem    = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

        try {
            const buf = await renderUptimeCard({
                botUptime, sysUptime, platform, arch,
                totalMem, freeMem, botMem,
                botName: (config.botName || 'NEZHA · MD').toUpperCase(),
            });
            const caption =
                `🧘‍♂️ *Sanctuary Vitality*\n\n` +
                `🏮 Vigil of the Prince: *${botUptime}*\n` +
                `🏛️ System Endurance: *${sysUptime}*\n` +
                `⚙️ *${platform}/${arch}* · RAM: *${freeMem}/${totalMem} GB* · Used: *${botMem} MB*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;
            await sock.sendMessage(from, { image: buf, caption }, { quoted: msg });
        } catch (e) {
            await reply(
                `🧘‍♂️ *Sanctuary Vitality*\n\n` +
                `🏮 Vigil of the Prince: *${botUptime}*\n` +
                `🏛️ System Endurance: *${sysUptime}*\n` +
                `⚙️ Platform: ${platform} (${arch})\n` +
                `📊 RAM: ${freeMem}/${totalMem} GB · Bot: ${botMem} MB\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
    }
};
