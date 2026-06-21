/**
 * City — Invoke a Celestial Voyage
 * Usage: .randomcity
 */
module.exports = {
    name: 'randomcity',
    aliases: ['city', 'voyage', 'destination'],
    description: 'Invoke a destination for your next celestial voyage.',
    category: 'fun',
    async execute({ reply }) {
        const realms = [
            "Tokyo", "Lagos", "Paris", "Cairo", "Lima", 
            "Berlin", "Mumbai", "Seoul", "Oslo", "Madrid", 
            "Toronto", "Sydney", "Dakar", "Athens", "Prague"
        ];
        
        const pick = realms[Math.floor(Math.random() * realms.length)];
        
        return reply(
            `🌏 *Celestial Voyage*\n\n` +
            `The winds of travel guide your spirit toward: *${pick}*`
        );
    }
};
