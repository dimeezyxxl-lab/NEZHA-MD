/**
 * Vnumget — Manifest the Ephemeral Link
 * Usage: .vnumget <country-code>
 */

const {
    fetchVnum, friendlyError, extractList, normalizeNumber
} = require('../../lib/vnum');

module.exports = {
    name: 'vnumget',
    aliases: ['vnumlist', 'getnumber', 'manifest'],
    description: 'Manifest a fleeting connection from a chosen realm.',
    category: 'utility',
    async execute({ args, reply }) {
        const country = (args[0] || '').trim().toLowerCase();
        
        if (!country) {
            return reply(
                `❓ *Manifestation of the Ephemeral Link*\n\n` +
                `The Lotus Prince requires a realm code to manifest a link.\n` +
                `Run *.vnum* to view the Atlas.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        if (!/^[a-z]{2,}$/i.test(country)) {
            return reply('⚠️ _The realm code is invalid; it must be expressed in letters only._');
        }

        let json;
        try {
            json = await fetchVnum('sms24-numbers', { country });
        } catch (err) {
            return reply(friendlyError(err));
        }

        const list = extractList(json, ['data', 'numbers', 'result', 'data.numbers'])
            .map(normalizeNumber)
            .filter(n => n.number);

        if (!list.length) {
            return reply(`⚠️ _The Lotus Prince found no ephemeral links available in *${country.toUpperCase()}* at this time._`);
        }

        const top = list.slice(0, 15);
        const lines = top.map((n, i) => {
            const tag = n.service ? `  _(${n.service})_` : '';
            const upd = n.updated ? `  · ${n.updated}` : '';
            return `${String(i + 1).padStart(2, ' ')}. \`${n.number}\`${tag}${upd}`;
        });

        const more = list.length > top.length ? `\n…and ${list.length - top.length} more links.` : '';
        const sample = top[0].number;

        const text =
            `📲 *Ephemeral Links — ${country.toUpperCase()}* (${list.length})\n\n` +
            lines.join('\n') + more +
            `\n\n👉 *To claim a vision (OTP), use:* \`.vnumotp ${sample}\`\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;

        return reply(text);
    }
};
