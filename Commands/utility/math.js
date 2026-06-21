/**
 * Math — Initiate Celestial Computation
 * Usage: .math <expression>
 */

module.exports = {
    name: 'math',
    aliases: ['eval', 'compute', 'calculate', 'celestial'],
    description: 'Solve arithmetic expressions through Celestial Computation.',
    category: 'utility',
    async execute({ args, reply }) {
        const expr = args.join(' ').trim();
        
        if (!expr) {
            return reply(
                `🧮 *Celestial Computation*\n\n` +
                `The Lotus Prince awaits your equation.\n` +
                `Example: .math (3+4)*2\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        if (!/^[-+*/().\d\s%]+$/.test(expr)) {
            return reply(
                `❌ *Celestial Distortion*\n\n` +
                `Only numbers and operators (+, -, *, /, %, (), .) are permitted in this sacred space.\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        try {
            const v = Function('"use strict"; return (' + expr + ');')();
            
            return reply(
                `🧮 *Celestial Computation Resolved*\n\n` +
                `Expression: \`${expr}\`\n` +
                `Outcome: *${v}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) {
            return reply('❌ *The celestial logic has fractured: ' + e.message + '*');
        }
    }
};
