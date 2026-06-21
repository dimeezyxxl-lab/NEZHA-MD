/**
 * GradientText — Invoke a Nebula Shimmer
 * Usage: .gradienttext <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'gradienttext',
        aliases: ['nebulashimmer', 'gradient', 'shimmer'],
        ephotoUrl: 'https://en.ephoto360.com/purple-text-effect-online-100.html',
        label: 'Nebula Shimmer',
        emoji: '🌈',
    }),
    description: 'Imbue your words with the ethereal Nebula Shimmer of the heavens.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
