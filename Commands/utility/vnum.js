/**
 * Vnum — Consult the Atlas of Distant Realms
 * Usage: .vnum
 */

const {
    fetchVnum, friendlyError, extractList, normalizeCountry
} = require('../../lib/vnum');

module.exports = {
    name: 'vnum',
    aliases: ['vnumcountries', 'numbers', 'atlas', 'distants'],
    description: 'Consult the Atlas of Distant Realms to find available virtual domains.',
    category: 'utility',
    async execute({ reply }) {
        let json;
        try {
            json = await fetchVnum('sms24-countries');
        } catch (err) {
            return reply(friendlyError(err));
        }

        const rawList = extractList(json, ['data', 'countries', 'result', 'data.countries']);
        const countries = rawList.map(normalizeCountry).filter(c => c.code);

        if (!countries.length) {
            return reply('⚠️ _The Atlas remains blank; the Lotus Prince could not locate any distant realms at this time._');
        }

        const top = countries.slice(0, 60);
        const lines = top.map((c, i) =>
            `${String(i + 1).padStart(2, ' ')}. ${c.flag ? c.flag + ' ' : ''}${c.name} — \`${c.code}\``
        );

        const more = countries.length > top.length
            ? `\n…and ${countries.length - top.length} more realms.`
            : '';

        const text =
            `📞 *Atlas of Distant Realms* (${countries.length})\n\n` +
            lines.join('\n') + more +
            `\n\n👉 *To manifest a presence, use:* \`.vnumget <code_from_above>\`\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;

        return reply(text);
    }
};
