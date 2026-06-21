/**
 * Truth2 — Reveal a Deeper Celestial Truth
 * Usage: .truth2
 */

module.exports = {
    name: 'truth2',
    aliases: ['truthdeep', 'reveal2'],
    description: 'Unveil a deeper truth from the celestial archives.',
    category: 'fun',
    async execute({ reply }) {
        const deeperTruths = [
            'What is the most unsettling secret hidden within your digital archives?',
            'Among those gathered here, to whom would you entrust your most sacred secrets?',
            'What is one clandestine truth you have never dared to utter to anyone in this company?',
            'Have you ever woven a deception to avoid the obligations of the path? When?',
            'What is the most glaring blemish—your greatest red flag—that you carry within your spirit?'
        ];
        
        const selection = deeperTruths[Math.floor(Math.random() * deeperTruths.length)];
        
        return reply(
            `🟢 *Celestial Truth (II)*\n\n` +
            `_${selection}_`
        );
    }
};
