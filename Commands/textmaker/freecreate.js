/**
 * FreeCreate — Manifest in Divine Ink
 * Usage: .freecreate <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'freecreate',
        aliases: ['divineink', 'painttext', '3dtext'],
        ephotoUrl: 'https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html',
        label: 'Divine Ink',
        emoji: '🎨',
    }),
    description: 'Manifest your words in vibrant, 3D Divine Ink.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
