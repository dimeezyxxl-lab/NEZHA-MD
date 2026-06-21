/**
 * Friendship — Measure the Celestial Bond
 * Usage: .friendship <name1> <name2>
 */
module.exports = {
    name: 'friendship',
    aliases: ['bond', 'compatibility', 'affinity'],
    description: 'Measure the celestial bond between two souls.',
    category: 'fun',
    async execute({ args, reply }) {
        if (args.length < 2) {
            return reply(
                `❌ *Celestial Bond*\n\n` +
                `The heavens require two entities to measure a connection.\n` +
                `Usage: \`.friendship <spirit1> <spirit2>\``
            );
        }
        
        const a = args[0], b = args.slice(1).join(' ');
        let h = 0; 
        for (const c of (a + b).toLowerCase()) h = (h * 17 + c.charCodeAt(0)) >>> 0;
        
        const percentage = h % 101;
        
        return reply(
            `✨ *Celestial Affinity*\n\n` +
            `The alignment between *${a}* and *${b}* is *${percentage}%*.\n\n` +
            `_${percentage > 75 ? 'Their fates are woven together in light.' : percentage > 40 ? 'Their paths cross in gentle harmony.' : 'Their spirits maintain a distant orbit.'}_`
        );
    }
};
