/**
 * SlowMode Command — Toggle slow mode (message delay)
 * Usage: .slowmode <seconds> | .slowmode off
 */
const database = require('../../utils/database');
module.exports = {
    name: 'slowmode',
    aliases: ['cooldown', 'msgdelay'],
    description: 'Set a message cooldown for group members',
    category: 'admin',
    async execute({ reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Admin Gate
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to impose a temporal seal.');

        if (!args.length) return reply(
            '🐢 *Celestial Temporal Seal*\n\n' +
            'Usage:\n' +
            '• .slowmode 30 → Impose a 30s delay\n' +
            '• .slowmode off → Lift the temporal seal'
        );

        if (args[0].toLowerCase() === 'off') {
            database.setGroupData(from, 'slowmode', 0);
            return reply('🔥 *Temporal Seal Lifted!*\n\nThe flow of conversation has been restored.');
        }

        const secs = parseInt(args[0]);
        if (isNaN(secs) || secs < 1 || secs > 3600) return reply('❌ A disturbance in the heavens: Enter a duration between 1 and 3600 seconds.');

        database.setGroupData(from, 'slowmode', secs);
        reply(
            `🐢 *Temporal Seal Imposed!*\n\n` +
            `⏱️ Cooldown: *${secs} seconds*\n\n` +
            `Souls must now wait ${secs}s between messages.`
        );
    }
};
