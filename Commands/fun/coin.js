/**
 * Coin — Cast the Celestial Fate Coin
 */
module.exports = {
    name: 'coin',
    aliases: ['cointoss', 'fate', 'cast'],
    description: 'Cast the celestial coin to discern your fortune.',
    category: 'fun',
    async execute({ reply }) {
        const result = Math.random() < 0.5 ? '✨ *HEAVENS (HEADS)*' : '🌑 *VOID (TAILS)*';
        return reply(`🪙 *The Celestial Coin spins...*\n\nThe result of your fate is: ${result}`);
    }
};
