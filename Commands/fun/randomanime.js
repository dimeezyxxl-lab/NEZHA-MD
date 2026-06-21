/**
 * Anime — Consult the Celestial Chronicle
 * Usage: .randomanime
 */
module.exports = {
    name: 'randomanime',
    aliases: ['anime', 'chronicle', 'tale'],
    description: 'Manifest a legendary anime chronicle from the celestial archives.',
    category: 'fun',
    async execute({ reply }) {
        const chronicles = [
            "Jujutsu Kaisen", "Bleach", "Naruto", "One Piece", 
            "Demon Slayer", "Attack on Titan", "Death Note", "Code Geass", 
            "Hunter x Hunter", "Dragon Ball Z", "Chainsaw Man", "Vinland Saga"
        ];
        
        const pick = chronicles[Math.floor(Math.random() * chronicles.length)];
        
        return reply(
            `📜 *Celestial Chronicle*\n\n` +
            `The winds of destiny have selected this tale for you: *${pick}*`
        );
    }
};
