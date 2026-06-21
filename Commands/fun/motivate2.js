/**
 * Motivate — Receive a Celestial Proverb
 * Usage: .inspire
 */
module.exports = {
    name: 'motivate2',
    aliases: ['inspire', 'wisdom', 'proverb'],
    description: 'Receive a profound celestial proverb to guide your path.',
    category: 'fun',
    async execute({ reply }) {
        const proverbs = [
            'You do not rise to the level of your goals — you fall to the level of your systems.',
            'Discipline is the bridge between the desires of the present and the destiny you seek most.',
            'The void you fear to enter holds the power you are destined to wield.',
            'Perform a deed today that your future self shall honor in the eons to come.',
            'Divine energy and unwavering persistence conquer all obstacles in the cosmic weave.',
        ];
        
        return reply(
            `✨ *Celestial Wisdom*\n\n` +
            `_“${proverbs[Math.floor(Math.random() * proverbs.length)]}”_`
        );
    }
};
