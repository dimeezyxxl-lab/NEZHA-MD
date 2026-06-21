/**
 * Chinese — Reveal a Celestial Zodiac Sign
 * Usage: .chinese YYYY
 */

module.exports = {
    name: 'chinese',
    aliases: ['chinesezodiac', 'celestialzodiac', 'zodiac'],
    description: 'Determine a spirit\'s Celestial Zodiac sign. Usage: .chinese YYYY',
    category: 'general',
    async execute({ args, reply }) {
        const y = parseInt(args[0]);
        if (isNaN(y) || y < 1900 || y > 2100) {
            return reply('❌ *Invalid period.* Please provide a valid year (e.g., `.chinese 1998`).');
        }
        
        const CELESTIAL_ARCHETYPES = [
            'Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 
            'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'
        ];
        
        return reply(
            `🐉 *Celestial Zodiac*\n\n` +
            `In the year *${y}*, the spirit aligned with the *${CELESTIAL_ARCHETYPES[y % 12]}* archetype.`
        );
    }
};
