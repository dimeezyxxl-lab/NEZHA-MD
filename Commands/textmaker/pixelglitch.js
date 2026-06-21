/**
 * PixelGlitch — Traverse the Jade Lattice
 * Usage: .pixelglitch <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'pixelglitch',
        aliases: ['jadelattice', 'matrix', 'greenrain', 'jadegrid'],
        ephotoUrl: 'https://en.ephoto360.com/matrix-text-effect-154.html',
        label: 'Jade Lattice',
        emoji: '🟩',
    }),
    description: 'Weave your words into the streaming green code of the Jade Lattice.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
