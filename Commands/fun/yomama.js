/**
 * Yomama — Recount a Legend of Celestial Ancestry
 * Usage: .yomama
 */

module.exports = {
    name: 'yomama',
    aliases: ['ancestry', 'legend', 'yomama'],
    description: 'Recount a legendary jest regarding celestial ancestry.',
    category: 'fun',
    async execute({ reply }) {
        const legends = [
            'The Great Matriarch is so immense that she steps over the celestial moon.',
            'The Great Matriarch is so ancient that her records are etched in Roman stone.',
            'The Great Matriarch is so benevolent that she bows to the very furniture she encounters.',
            'The Great Matriarch is so wise that she solved the cosmic cube with a single rotation.',
            'The Great Matriarch is so composed that her presence radiates the chill of the eternal void.',
        ];
        
        return reply(
            `🤡 *Celestial Ancestry*\n\n` +
            `_${legends[Math.floor(Math.random() * legends.length)]}_`
        );
    }
};
