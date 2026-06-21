/**
 * Animal — Manifest a Celestial Beast
 * Usage: .randomanimal
 */
module.exports = {
    name: 'randomanimal',
    aliases: ['animal', 'beast', 'spirit'],
    description: 'Manifest a random celestial beast to guide your spirit.',
    category: 'fun',
    async execute({ reply }) {
        const beasts = [
            "Celestial Wolf", "Azure Tiger", "Shadow Panther", "Golden Eagle", 
            "Moonlight Fox", "Divine Lion", "Celestial Bear", "Wise Owl", 
            "Raven of the Void", "Jade Cobra", "Sky Falcon", "Lynx of the Peaks", 
            "Spirit Stag", "Abyssal Shark", "Ascendant Dragon"
        ];
        
        const pick = beasts[Math.floor(Math.random() * beasts.length)];
        
        return reply(
            `✨ *Celestial Manifestation*\n\n` +
            `The heavens bestow upon you the spirit of: *${pick}*`
        );
    }
};
