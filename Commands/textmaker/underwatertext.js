/**
 * UnderwaterText — Manifest within the Glacial Abyss
 * Usage: .underwatertext <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'underwatertext',
        aliases: ['glacialabyss', 'ice', 'frozen', 'underwater'],
        ephotoUrl: 'https://en.ephoto360.com/ice-text-effect-online-101.html',
        label: 'Glacial Abyss',
        emoji: '🧊',
    }),
    description: 'Immerse your words within the frozen, crystalline depths of the Glacial Abyss.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
