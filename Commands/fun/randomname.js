/**
 * Name — Manifest a Celestial Identity
 * Usage: .randomname
 */
module.exports = {
    name: 'randomname',
    aliases: ['name', 'identity', 'persona'],
    description: 'Manifest a random legendary identity from the celestial records.',
    category: 'fun',
    async execute({ reply }) {
        const personas = [
            "Sukuna", "Yuji", "Nobara", "Megumi", "Gojo", 
            "Aizen", "Naruto", "Sasuke", "Luffy", "Zoro", 
            "Tanjiro", "Inosuke", "Eren", "Xyz", "Levi", 
            "Light", "Oladimeji", "Vegeta", "Goku", "Ichigo"
        ];
        
        const pick = personas[Math.floor(Math.random() * personas.length)];
        
        return reply(
            `👤 *Celestial Identity*\n\n` +
            `The records of the heavens reveal your spirit's name: *${pick}*`
        );
    }
};
