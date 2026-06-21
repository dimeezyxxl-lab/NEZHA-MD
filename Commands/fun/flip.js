/**
 * Flip — Cast the Celestial Fate Coin
 */
module.exports = {
    name: 'flip',
    aliases: ['coinflip', 'coin', 'cast'],
    description: 'Cast the celestial coin to discern your fortune.',
    category: 'fun',
    async execute({ reply }) {
        const result = Math.random() < 0.5 ? '✨ *HEAVENS (HEADS)*' : '🌑 *VOID (TAILS)*';
        
        return reply(
            `🪙 *The Celestial Coin spins...*\n\n` +
            `The result of your fate is: ${result}`
        );
    }
};
