/**
 * GlitchText — Manifest a Reality Fracture
 * Usage: .glitchtext <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'glitchtext',
        aliases: ['realityfracture', 'glitch', 'fracture'],
        ephotoUrl: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
        label: 'Reality Fracture',
        emoji: '⚡',
    }),
    description: 'Manifest your words through a Reality Fracture in the digital fabric.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
