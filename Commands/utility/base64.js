/**
 * Base64 — Access the Void Loom
 * Usage: .base64 encode <text> | .base64 decode <text>
 */

module.exports = {
    name: 'base64',
    aliases: ['b64', 'voidloom', 'veil', 'unveil'],
    description: 'Weave or unravel information within the Void Loom.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `🌌 *The Void Loom*\n\n` +
                `The Lotus Prince commands the threads of reality:\n\n` +
                `• .base64 encode <text> (Weave into the void)\n` +
                `• .base64 decode <string> (Unravel from the void)\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const action = args[0].toLowerCase();
        const text = args.slice(1).join(' ');

        try {
            if (action === 'encode') {
                const encoded = Buffer.from(text).toString('base64');
                reply(
                    `🧵 *Void Weaving*\n\n` +
                    `Original: ${text}\n` +
                    `Weaved: \`${encoded}\`\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            } else if (action === 'decode') {
                const decoded = Buffer.from(text, 'base64').toString('utf8');
                reply(
                    `🔮 *Void Unraveling*\n\n` +
                    `Veiled: \`${text}\`\n` +
                    `Revealed: ${decoded}\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            } else {
                reply('❌ _The loom rejects this action. Choose to "encode" or "decode"._');
            }
        } catch (err) {
            reply('❌ _The threads are tangled. The essence provided is incompatible with the Void Loom._');
        }
    }
};
