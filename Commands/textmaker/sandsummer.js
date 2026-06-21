/**
 * SandSummer — Inscribe the Sands of the Shore
 * Usage: .sandsummer <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'sandsummer',
        aliases: ['sandshore', 'beachwrite', 'sands'],
        ephotoUrl: 'https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html',
        label: 'Sands of the Shore',
        emoji: '🏖️',
    }),
    description: 'Inscribe your message upon the ephemeral Sands of the Shore.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
