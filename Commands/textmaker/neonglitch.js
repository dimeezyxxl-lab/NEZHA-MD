/**
 * NeonGlitch — Invoke Demonic Resonance
 * Usage: .neonglitch <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'neonglitch',
        aliases: ['demonicresonance', 'devilwings', 'neondevil'],
        ephotoUrl: 'https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html',
        label: 'Demonic Resonance',
        emoji: '😈',
    }),
    description: 'Manifest your words wreathed in the neon Demonic Resonance of the abyss.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
