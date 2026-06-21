/**
 * Word — Invoke a Celestial Lexicon
 * Usage: .randomword
 */
module.exports = {
    name: 'randomword',
    aliases: ['word', 'lexicon', 'term'],
    description: 'Invoke a single celestial term from the universal lexicon.',
    category: 'fun',
    async execute({ reply }) {
        const lexicon = [
            "nebula", "phantom", "vortex", "ember", "glacier", 
            "sonnet", "rune", "oracle", "crimson", "solstice", 
            "mirage", "umbra", "TowTow", "cipher", "requiem"
        ];
        
        const pick = lexicon[Math.floor(Math.random() * lexicon.length)];
        
        return reply(
            `🔠 *Celestial Lexicon*\n\n` +
            `The heavens bestow upon you the word: *${pick}*`
        );
    }
};
