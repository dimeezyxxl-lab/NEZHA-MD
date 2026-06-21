const database     = require('../../utils/database');
const eventManager = require('../../lib/eventManager');

module.exports = {
    name: 'welcome',
    aliases: ['welcomemsg'],
    description: 'Enable/disable/set/test welcome messages with profile pic',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup, isAdmin, isOwner, sender, phoneNumber }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        
        // Admin Gate
        if (!isOwner && !isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may configure the greeting rites of this realm.');
        }

        const action = (args[0] || '').toLowerCase();
        const group  = database.getGroup(from);

        if (!action) {
            return reply(
                `👋 *Celestial Greeting Settings*\n\n` +
                `Status: ${group.welcome ? '✅ ON' : '❌ OFF'}\n` +
                `Message: ${group.welcomeMessage || '👋 Welcome @user, to the Lotus Realm!'}\n\n` +
                `*Usage:*\n` +
                `• \`.welcome on\` — Initiate greeting rites\n` +
                `• \`.welcome off\` — Cease greeting rites\n` +
                `• \`.welcome set <message>\` — Set custom greeting\n` +
                `• \`.welcome test\` — Preview the celestial banner now\n\n` +
                `_Variables: @user/{name}, @group/{group}, {count}_`
            );
        }

        if (action === 'set') {
            const customMsg = args.slice(1).join(' ').trim();
            if (!customMsg) return reply('❌ Provide a celestial decree!\n\nExample: `.welcome set Welcome @user, to the Lotus Realm!`');
            database.setGroup(from, 'welcomeMessage', customMsg);
            return reply(`✅ Greeting rite set to:\n_${customMsg}_\n\n_Tip: run \`.welcome test\` to preview._`);
        }

        if (action === 'test' || action === 'preview') {
            try {
                const prev = database.getGroup(from).welcome;
                if (!prev) database.setGroup(from, 'welcome', true);
                await eventManager.handleGroupParticipantsEvent(sock, phoneNumber, {
                    id: from,
                    participants: [sender],
                    action: 'add',
                    author: sender,
                });
                if (!prev) database.setGroup(from, 'welcome', false);
            } catch (e) {
                return reply(`❌ A disturbance in the heavens: ${e.message}`);
            }
            return;
        }

        if (!['on', 'off'].includes(action)) {
            return reply('❌ Invalid mandate: Use `.welcome on`, `.welcome off`, `.welcome set <message>`, or `.welcome test`');
        }

        database.setGroup(from, 'welcome', action === 'on');
        reply(
            `🐦‍🔥 Greeting rites have been *${action === 'on' ? 'initiated' : 'ceased'}*!` +
            (action === 'on' ? '\n\n_Tip: run `.welcome test` to preview the celestial banner._' : '')
        );
    }
};
