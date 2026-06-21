/**
 * WriteText — Initiate Divine Forgery
 * Usage: .writetext <text>
 */

const { makeTextmakerCommand } = require('../../lib/textmakerFetch');

module.exports = {
    ...makeTextmakerCommand({
        name: 'writetext',
        aliases: ['divineforgery', 'metaltext', 'forge'],
        ephotoUrl: 'https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html',
        label: 'Divine Forgery',
        emoji: '✍️',
    }),
    description: 'Strike your words into reality with the permanent luster of a Divine Forgery.',
    category: 'maker',
    async execute(context) {
        return await context.execute(context);
    }
};
