/**
 * Style1917 — Invoke Cinematic Echo
 * Usage: .style1917 <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'style1917',
        aliases: ['cinematicecho', 'vintage', 'warstyle', '1917'],
        ephotoUrl: 'https://en.ephoto360.com/1917-style-text-effect-523.html',
        label: 'Cinematic Echo',
        emoji: '🎬',
    }),
    description: 'Grant your words a timeless, dramatic presence with the Cinematic Echo.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
