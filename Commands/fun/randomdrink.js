/**
 * Drink — Dispense a Celestial Elixir
 * Usage: .randomdrink
 */
module.exports = {
    name: 'randomdrink',
    aliases: ['drink', 'elixir', 'refresh'],
    description: 'Dispense a random celestial elixir to rejuvenate your spirit.',
    category: 'fun',
    async execute({ reply }) {
        const elixirs = [
            "Matcha", "Espresso", "Chapman", "Mojito", "Sake", 
            "Kombucha", "Lemonade", "Hibiscus Tea", "Horchata", "Iced Latte"
        ];
        
        const pick = elixirs[Math.floor(Math.random() * elixirs.length)];
        
        return reply(
            `🍹 *Celestial Elixir*\n\n` +
            `The heavens have manifested this refreshment for you: *${pick}*`
        );
    }
};
