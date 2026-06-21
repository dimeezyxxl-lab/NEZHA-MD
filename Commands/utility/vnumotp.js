/**
 * Vnumotp — Invoke Scribe of the Divined Message
 * Usage: .vnumotp <number>
 */

const {
    fetchVnum, friendlyError, extractList, normalizeMessage, extractOtp
} = require('../../lib/vnum');

module.exports = {
    name: 'vnumotp',
    aliases: ['otp', 'vnummsg', 'getotp', 'sms', 'scribe'],
    description: 'Instruct the Scribe to recover divined messages and codes.',
    category: 'utility',
    async execute({ args, reply }) {
        const raw = args.join(' ').trim();
        if (!raw) {
            return reply(
                `❓ *Scribe of the Divined Message*\n\n` +
                `The Lotus Prince awaits the number to be scrutinized.\n` +
                `Run *.vnumget* to find a vessel first.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        // strip +, spaces, dashes, parens
        const number = raw.replace(/[^\d]/g, '');
        if (number.length < 6) {
            return reply('⚠️ _The sequence is too short to be a valid vessel; provide the full number._');
        }

        let json;
        try {
            json = await fetchVnum('sms24-messages', { number });
        } catch (err) {
            return reply(friendlyError(err));
        }

        const list = extractList(json, ['data', 'messages', 'result', 'data.messages'])
            .map(normalizeMessage);

        if (!list.length) {
            return reply(
                `📭 *The Scribe reports silence.*\n\n` +
                `No messages found for \`${number}\` yet.\n` +
                `Trigger the action on the target site, then invoke the Scribe again in 30 seconds.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const top = list.slice(0, 10);
        const blocks = top.map((m, i) => {
            const otp = m.otp || extractOtp(m.text);
            const header = `*${i + 1}.* ${m.from ? `*${m.from}*` : '_unknown sender_'}${m.time ? `  · ${m.time}` : ''}`;
            const otpLine = otp ? `\n🔑 *Divined OTP: ${otp}*` : '';
            const body = m.text ? `\n_${m.text}_` : '';
            return header + otpLine + body;
        });

        const text =
            `📨 *Divinations for \`${number}\`* (${top.length}${list.length > top.length ? '/' + list.length : ''})\n\n` +
            blocks.join('\n\n') +
            `\n\n_Tip: Invoke the Scribe again to refresh the flow._\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;

        return reply(text);
    }
};
