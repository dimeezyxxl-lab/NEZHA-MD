/**
 * Binary — Access the Pulse Weaver
 * Usage: .binary encode <text> | .binary decode <binary>
 */

module.exports = {
    name: 'binary',
    aliases: ['bin', 'pulseweaver', 'pulse'],
    description: 'Weave language into pulses or unweave pulses into language.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `⚡ *The Pulse Weaver*\n\n` +
                `The Lotus Prince commands the digital rhythm:\n\n` +
                `• .binary encode <text> (Weave into pulses)\n` +
                `• .binary decode <binary> (Unweave into truth)\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const mode = args[0].toLowerCase();
        const input = args.slice(1).join(' ');

        if (mode === 'encode') {
            const result = input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            return reply(
                `🌀 *Pulse Weaving*\n\n` +
                `Input: ${input}\n` +
                `Pulses: \`${result}\`\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } else if (mode === 'decode') {
            try {
                const result = input.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join('');
                return reply(
                    `🔮 *Pulse Unweaving*\n\n` +
                    `Pulses: \`${input}\`\n` +
                    `Revealed: *${result}*\n\n` +
                    `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
                );
            } catch {
                return reply('❌ _The pulses are discordant. Ensure the binary structure is pure._');
            }
        }
        
        reply('❌ _The Pulse Weaver does not recognize this action. Use "encode" or "decode"._');
    }
};
