/**
 * Food — Manifest a Celestial Feast
 * Usage: .randomfood
 */
module.exports = {
    name: 'randomfood',
    aliases: ['food', 'feast', 'nourishment'],
    description: 'Manifest a random celestial feast to satisfy your spirit.',
    category: 'fun',
    async execute({ reply }) {
        const feast = [
            "Ramen", "Sushi", "Jollof Rice", "Tacos", "Pad Thai", 
            "Pizza", "Shawarma", "Biryani", "Gnocchi", "Pho", 
            "Curry", "Dumplings", "Egusi", "Samosa", "Katsu"
        ];
        
        const pick = feast[Math.floor(Math.random() * feast.length)];
        
        return reply(
            `🍱 *Celestial Feast*\n\n` +
            `The heavens provide a offering for your palate: *${pick}*`
        );
    }
};
