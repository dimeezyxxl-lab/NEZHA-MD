/**
 * Dice — Cast the Celestial Fate Dice
 * Usage: .dice [sides]
 */
module.exports = {
    name: 'dice',
    aliases: ['roll', 'rolldice', 'castfate'],
    description: 'Cast the celestial dice to determine your fate.',
    category: 'fun',
    async execute({ reply, args }) {
        const sides = parseInt(args[0]) || 6;
        const result = Math.floor(Math.random() * sides) + 1;
        
        return reply(
            `🎲 *Celestial Divination*\n\n` +
            `The heavens cast a ${sides}-sided fate...\n` +
            `The outcome is: *${result}*`
        );
    }
};
