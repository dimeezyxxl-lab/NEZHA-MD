/**
 * Country — Invoke a Celestial Realm
 * Usage: .randomcountry
 */
module.exports = {
    name: 'randomcountry',
    aliases: ['country', 'realm', 'land'],
    description: 'Invoke a random realm across the mortal plane.',
    category: 'fun',
    async execute({ reply }) {
        const realms = [
            "Japan", "Brazil", "Norway", "Egypt", "Canada", 
            "Nigeria", "Kenya", "India", "Germany", "France", 
            "Italy", "Mexico", "Australia", "Turkey", "Spain"
        ];
        
        const pick = realms[Math.floor(Math.random() * realms.length)];
        
        return reply(
            `🌍 *Celestial Realm*\n\n` +
            `Your spirit is currently drawn to the lands of: *${pick}*`
        );
    }
};
