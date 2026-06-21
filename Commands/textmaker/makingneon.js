/**
 * MakingNeon — Manifest Violet Luminescence
 * Usage: .makingneon <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'makingneon',
        aliases: ['violetluminescence', 'neon', 'glow'],
        ephotoUrl: 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html',
        label: 'Violet Luminescence',
        emoji: '🟣',
    }),
    description: 'Illuminate your words with the radiant Violet Luminescence of the heavens.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
