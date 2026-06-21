/**
 * Advice — Receive a fragment of celestial wisdom.
 */
module.exports = {
    name: 'advice',
    aliases: ['wisdom', 'insight', 'guidance'],
    description: 'Receive a random piece of celestial wisdom.',
    category: 'fun',
    async execute({ reply }) {
        const lines = [
            'Maintain clarity; the mind is a reflection of the heavens.',
            'Even the lotus rises from the mud—persistence is your greatest asset.',
            'Do not rush to battle; true strength is found in stillness.',
            'Humility is the cloak of the wise.',
            'A journey of ten thousand steps begins with a single act of conviction.',
            'The wind does not bow to the mountain; be like the wind.',
            'Seek balance in all things, for the middle path is rarely traveled.'
        ];
        
        return reply(`💡 *Celestial Wisdom*\n\n_“${lines[Math.floor(Math.random() * lines.length)]}”_`);
    }
};
