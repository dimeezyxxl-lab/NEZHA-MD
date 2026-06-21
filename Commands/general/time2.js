/**
 * Time2 — Consult the Celestial Chronology
 * Usage: .time2 [IANA TZ]
 */

module.exports = {
    name: 'time2',
    aliases: ['timezone', 'celestialtime', 'chronology'],
    description: 'Consult the Celestial Chronology for any region. Usage: .time2 [IANA TZ]',
    category: 'general',
    async execute({ args, reply }) {
        const tz = args[0] || 'UTC';
        try {
            const s = new Date().toLocaleString('en-GB', { timeZone: tz, hour12: false });
            return reply(
                `🕒 *Celestial Chronology — ${tz}*\n\n` +
                `The current alignment is: *${s}*`
            );
        } catch (e) { 
            return reply('❌ *Unknown chronometry.* Please provide a valid IANA timezone (e.g., `.time2 Africa/Lagos`).'); 
        }
    }
};
