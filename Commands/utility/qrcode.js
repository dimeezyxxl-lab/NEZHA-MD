/**
 * QrCode — Invoke Sigil of Manifestation
 * Usage: .qrcode <text or url>
 */

module.exports = {
    name: 'qrcode',
    aliases: ['qr', 'qrgen', 'sigil', 'manifest'],
    description: 'Weave a Sigil of Manifestation for your text or URL.',
    category: 'utility',
    async execute({ sock, msg, from, reply, args }) {
        if (!args.length) {
            return reply(
                `📱 *Sigil of Manifestation*\n\n` +
                `The Lotus Prince awaits the data to be woven.\n\n` +
                `Usage: .qrcode <text or url>\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const text = args.join(' ');
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;

        try {
            await sock.sendMessage(from, {
                image: { url: qrUrl },
                caption: `📱 *Sigil of Manifestation Woven*\n\n` +
                         `Data: \`${text}\`\n\n` +
                         `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            }, { quoted: msg });
        } catch (err) {
            reply('❌ _The sigil could not be woven; the digital threads are tangled._');
        }
    }
};
