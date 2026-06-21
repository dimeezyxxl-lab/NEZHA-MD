/**
 * Define2 — Access the Celestial Lexicon
 * Usage: .define2 <word>
 */

module.exports = {
    name: 'define2',
    aliases: ['lexicon', 'glossary'],
    description: 'Quick access to the celestial mini-glossary.',
    category: 'general',
    async execute({ args, reply }) {
        const word = (args[0] || '').toLowerCase();
        const LEXICON = {
            nezha: 'The Lotus Prince, a divine warrior and protector.',
            celestial: 'Relating to the heavens or the divine spirit realm.',
            lotus: 'A symbol of purity, rebirth, and the essence of the Prince.',
            sanctuary: 'A sacred domain protected by divine authority.',
            oracle: 'An enlightened guide that manifests truth and wisdom.',
            void: 'The eternal emptiness from which all things emerge and return.',
        };

        if (!word) {
            return reply(
                `📖 *Celestial Lexicon*\n\n` +
                `Available terms: ${Object.keys(LEXICON).join(', ')}\n\n` +
                `_Usage: .define2 <word>_`
            );
        }

        return reply(
            LEXICON[word] 
                ? `📖 *${word.toUpperCase()}*\n\n${LEXICON[word]}` 
                : `❌ *Term not found in the Celestial Lexicon.* Use .define for expansive research.`
        );
    }
};
