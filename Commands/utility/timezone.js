/**
 * Timezone — Consult the Universal Meridian
 * Usage: .timezone <city>
 */

const zones = {
    'utc':'UTC','london':'Europe/London','paris':'Europe/Paris','dubai':'Asia/Dubai',
    'moscow':'Europe/Moscow','india':'Asia/Kolkata','lagos':'Africa/Lagos','nairobi':'Africa/Nairobi',
    'tokyo':'Asia/Tokyo','sydney':'Australia/Sydney','newyork':'America/New_York',
    'losangeles':'America/Los_Angeles','chicago':'America/Chicago','toronto':'America/Toronto',
    'singapore':'Asia/Singapore','beijing':'Asia/Shanghai','jakarta':'Asia/Jakarta',
    'cairo':'Africa/Cairo','accra':'Africa/Accra','johannesburg':'Africa/Johannesburg'
};

module.exports = {
    name: 'timezone',
    aliases: ['tz', 'worldtime', 'meridian'],
    description: 'Consult the Universal Meridian for the time in a chosen city.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🌍 *The Universal Meridian*\n\n` +
                `The Lotus Prince maps the pulse of distant lands.\n\n` +
                `Available realms:\n\`${Object.keys(zones).join(', ')}\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const key = args[0].toLowerCase().replace(/\s/g, '');
        const zone = zones[key];
        
        if (!zone) {
            return reply(`❌ _The Lotus Prince does not recognize this realm on the Universal Meridian._`);
        }

        try {
            const now = new Date().toLocaleString('en-US', { 
                timeZone: zone, 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            });
            
            reply(
                `🕐 *Universal Meridian Alignment*\n\n` +
                `🌍 City: ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}\n` +
                `📍 Zone: ${zone}\n` +
                `🕐 Time: *${now}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch { 
            reply('❌ _The threads of time in that realm are currently obscured._'); 
        }
    }
};
