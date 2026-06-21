/**
 * Number — Invoke a Celestial Digit
 * Usage: .randomnumber [min] [max]
 */
module.exports = {
    name: 'randomnumber',
    aliases: ['rng', 'number', 'digit'],
    description: 'Invoke a random celestial digit from the infinite flow.',
    category: 'fun',
    async execute({ args, reply }) {
        const min = parseInt(args[0]);
        const max = parseInt(args[1]);
        
        const lo = isNaN(min) ? 1 : min;
        const hi = isNaN(max) ? 100 : max;
        
        if (hi < lo) return reply('⚠️ The heavens require the upper bound to be greater than or equal to the lower bound.');
        
        const result = Math.floor(Math.random() * (hi - lo + 1)) + lo;
        
        return reply(
            `🎲 *Celestial Digit*\n\n` +
            `The cosmic threads have manifested the number: *${result}*`
        );
    }
};
