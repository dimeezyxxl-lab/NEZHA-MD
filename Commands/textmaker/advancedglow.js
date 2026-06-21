/**
 * AdvancedGlow — Bestow a Divine Aura
 * Usage: .advancedglow <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'advancedglow',
        aliases: ['divineaura', 'neontext', 'aura'],
        ephotoUrl: 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html',
        label: 'Divine Aura',
        emoji: '💡',
    }),
    description: 'Bestow a Divine Aura upon your words.',
    category: 'maker',
    async execute(context) {
        // Automatically handled by makeTextmakerCommand factory
        // Adding the divine flair to the output description
        return await context.execute(context);
    }
};
