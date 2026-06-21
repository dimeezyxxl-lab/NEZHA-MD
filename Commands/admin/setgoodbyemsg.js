/**
 * SetGoodbyeMsg Command — Customize the goodbye message
 * Usage: .setgoodbyemsg <message>
 * Variables: {name} {group} {count} (also @user, @group)
 */
const database = require('../../utils/database');
module.exports = {
    name: 'setgoodbyemsg',
    aliases: ['customgoodbye'],
    description: 'Set a custom goodbye message for leaving members',
    category: 'admin',
    async execute({ reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Admin Gate
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to alter departure rites.');

        if (!args.length) return reply('📝 Usage: .setgoodbyemsg <message>\n\nVariables: {name} {group} {count} (also @user, @group)');
        
        const msg = args.join(' ').trim();
        database.setGroup(from, 'goodbyeMessage', msg);
        
        reply(
            `🔥 *Departure Rite Updated!*\n\n` +
            `Preview:\n${msg.replace(/\{name\}/gi,'[Member]').replace(/@user/gi,'[Member]').replace(/\{group\}/gi,'[Group]').replace(/@group/gi,'[Group]').replace(/\{count\}/gi,'[N]')}\n\n` +
            `_Tip: run \`.goodbye on\` to initiate this ritual._`
        );
    }
};
