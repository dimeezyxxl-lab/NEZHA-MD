/**
 * Truth — Reveal a Celestial Truth
 * Usage: .truth
 */

const celestialTruths = [
    "What is the deepest fear you harbor within your spirit?",
    "What is the most mortifying event to befall you in this life?",
    "Have you ever woven a falsehood to escape the consequences of your actions? What was the deception?",
    "What is a pleasure you indulge in, yet keep hidden from the world?",
    "What is a truth you have never dared to unveil to those who gave you life?",
    "Who was the first soul to capture your heart?",
    "What is the most regrettable deed you have ever committed?",
    "Have you ever sought to deceive in your pursuit of knowledge or examination?",
    "What is a childish habit you still carry into your maturity?",
    "If you could reshape a single facet of your essence, what would you alter?"
];

module.exports = {
    name: 'truth',
    aliases: ['truthquestion', 'reveal', 'confession'],
    description: 'Baring one\'s soul through a random celestial truth.',
    category: 'fun',
    async execute({ reply }) {
        const truth = celestialTruths[Math.floor(Math.random() * celestialTruths.length)];
        
        return reply(
            `🤍 *Celestial Truth*\n\n` +
            `_${truth}_`
        );
    }
};
