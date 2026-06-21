/**
 * Time — Consult the Celestial Calendar
 * Usage: .time [timezone]
 */

module.exports = {
    name: 'time',
    aliases: ['clock', 'date', 'now', 'calendar', 'celestial'],
    description: 'Consult the Celestial Calendar to observe the shifting tides of time.',
    category: 'utility',
    async execute({ reply, args }) {
        const now = new Date();

        if (args.length) {
            const tz = args.join('/').replace(/ /g, '_');
            try {
                const formatted = now.toLocaleString('en-US', { timeZone: tz, dateStyle: 'full', timeStyle: 'long' });
                return reply(
                    `🕐 *Celestial Alignment (${tz})*\n\n` +
                    `📅 ${formatted}\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            } catch {
                return reply('❌ _The Lotus Prince cannot locate this timezone in the celestial sphere._');
            }
        }

        const zones = [
            { emoji: '🇺🇸', name: 'New York', tz: 'America/New_York' },
            { emoji: '🇬🇧', name: 'London', tz: 'Europe/London' },
            { emoji: '🇳🇬', name: 'Lagos', tz: 'Africa/Lagos' },
            { emoji: '🇮🇳', name: 'Mumbai', tz: 'Asia/Kolkata' },
            { emoji: '🇯🇵', name: 'Tokyo', tz: 'Asia/Tokyo' },
            { emoji: '🇦🇺', name: 'Sydney', tz: 'Australia/Sydney' },
        ];

        const fmtTime = (tz) => now.toLocaleString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const fmtDate = (tz) => now.toLocaleString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const utcStr = now.toLocaleString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        
        let worldClocks = zones.map(z => `${z.emoji} *${z.name}*: ${fmtTime(z.tz)}`).join('\n');
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
        const weekNum = Math.ceil(dayOfYear / 7);

        reply(
            `🕐 *THE CELESTIAL CALENDAR*\n\n` +
            `┌─────────────────────────┐\n` +
            `│  📅 *${fmtDate('UTC')}*\n` +
            `│  🕛 UTC: *${utcStr}*\n` +
            `│  📆 Week ${weekNum} • Day ${dayOfYear}/365\n` +
            `└─────────────────────────┘\n\n` +
            `🌍 *World Alignments*\n\n` +
            `${worldClocks}\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
