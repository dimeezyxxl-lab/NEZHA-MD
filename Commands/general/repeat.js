/**
 * Repeat — Project a Celestial Echo
 * Usage: .repeat <1-50> <text>
 */

module.exports = {
    name: 'repeat',
    aliases: ['echo', 'multiply'],
    description: 'Project a celestial echo N times. Usage: .repeat <1-50> <text>',
    category: 'general',
    async execute({ args, reply }) {
        const n = parseInt(args[0]);
        if (isNaN(n) || n < 1 || n > 50) {
            return reply('❌ *Invalid resonance.* Please specify a projection count between 1 and 50 (e.g., `.repeat 5 Divine`).');
        }
        
        const text = args.slice(1).join(' ');
        if (!text) {
            return reply('❌ *No essence provided.* Please provide the text you wish to echo.');
        }
        
        return reply(
            `🏵️ *Celestial Echo*\n\n` +
            `_${(text + ' ').repeat(n).trim()}_`
        );
    }
};
