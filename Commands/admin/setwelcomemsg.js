/**
 * SetWelcomeMsg Command — Customize the welcome message
 * Usage: .setwelcomemsg <message>
 * Variables: {name} {group} {count} (also @user, @group)
 */
const database = require('../../utils/database');
module.exports = {
    name: 'setwelcomemsg',
    aliases: ['customwelcome'],
    description: 'Set a custom welcome message for new members',
    category: 'admin',
    async execute({ reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Admin Gate
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to alter greeting rites.');

        if (!args.length) return reply(
            '📝 *Set Celestial Greeting*\n\nUsage: .setwelcomemsg <message>\n\nVariables:\n{name} or @user = New soul\n{group} or @group = Realm name\n{count} = Total souls\n\nExample:\n.setwelcomemsg Welcome {name} to {group}! You are soul #{count}!'
        );
        
        const msg = args.join(' ').trim();
        database.setGroup(from, 'welcomeMessage', msg);
        
        reply(
            `🔥 *Greeting Rite Updated!*\n\n` +
            `Preview:\n${msg.replace(/\{name\}/gi,'[Member]').replace(/@user/gi,'[Member]').replace(/\{group\}/gi,'[Group]').replace(/@group/gi,'[Group]').replace(/\{count\}/gi,'[N]')}\n\n` +
            `_Tip: run \`.welcome on\` to initiate this ritual._`
        );
    }
};
