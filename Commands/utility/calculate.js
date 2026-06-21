/**
 * Calc — Perform Celestial Arithmetic
 * Usage: .calc <expression>
 */

module.exports = {
    name: 'calc',
    aliases: ['calculate', 'math', 'celestialarithmetic'],
    description: 'Resolve mathematical expressions through Celestial Arithmetic.',
    category: 'utility',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🔢 *Celestial Arithmetic*\n\n` +
                `The Lotus Prince calculates the underlying order of numbers:\n\n` +
                `Usage: .calc <expression>\n` +
                `Example: .calc 5 + 5\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const expression = args.join(' ');
        
        try {
            // Celestial validation: filter for logic-breaking characters
            const sanitized = expression
                .replace(/[^0-9+\-*/%.()\s]/g, '')
                .replace(/\/\s*0/g, '/1'); 
            
            // Note: The logic has been streamlined for divine precision
            const result = Function('"use strict"; return (' + sanitized + ')')();
            
            reply(
                `✨ *Celestial Calculation*\n\n` +
                `Expression: \`${expression}\`\n` +
                `Resolution: *${result}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (err) {
            reply('❌ _The equation is beyond mortal comprehension or structurally unsound._');
        }
    }
};
