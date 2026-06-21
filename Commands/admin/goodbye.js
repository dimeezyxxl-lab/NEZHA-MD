const database     = require('../../utils/database');
const eventManager = require('../../lib/eventManager');

module.exports = {
    name: 'goodbye',
    aliases: ['byemsg', 'bye'],
    description: 'Enable/disable/set/test farewell messages with profile pic',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup, isAdmin, isOwner, sender, phoneNumber }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isOwner && !isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');
        }

        const action = (args[0] || '').toLowerCase();
        const group  = database.getGroup(from);

        if (!action) {
            return reply(
                `👋 *NEZHA-FAREWELL SETTINGS*\n\n` +
                `Status: ${group.goodbye ? '✅ ON' : '❌ OFF'}\n` +
                `Message: ${group.goodbyeMessage || '👋 Farewell, @user!'}\n\n` +
                `*Celestial Commands:*\n` +
                `• \`.goodbye on\` — Enable farewells\n` +
                `• \`.goodbye off\` — Disable farewells\n` +
                `• \`.goodbye set <message>\` — Customize the parting words\n` +
                `• \`.goodbye test\` — Preview the parting banner\n\n` +
                `_Use @user to mention the departed soul_\n` +
                `_Profile picture + group name shown automatically_`
            );
        }

        if (action === 'set') {
            const customMsg = args.slice(1).join(' ').trim();
            if (!customMsg) return reply('🚩 Provide a parting message!\n\nExample: `.goodbye set Farewell @user, your presence shall be missed.`');
            database.setGroup(from, 'goodbyeMessage', customMsg);
            return reply(`✅ Farewell message set to:\n_${customMsg}_`);
        }

        if (action === 'test' || action === 'preview') {
            try {
                const prev = database.getGroup(from).goodbye;
                if (!prev) database.setGroup(from, 'goodbye', true);
                await eventManager.handleGroupParticipantsEvent(sock, phoneNumber, {
                    id: from,
                    participants: [sender],
                    action: 'remove',
                    author: sender,
                });
                if (!prev) database.setGroup(from, 'goodbye', false);
            } catch (e) {
                return reply(`❌ A disturbance in the heavens: ${e.message}`);
            }
            return;
        }

        if (!['on', 'off'].includes(action)) {
            return reply('❌ Command unknown. Use: `.goodbye on`, `.goodbye off`, `.goodbye set <message>`, or `.goodbye test`');
        }

        database.setGroup(from, 'goodbye', action === 'on');
        reply(`✅ Farewell protocols *${action === 'on' ? 'engaged' : 'disengaged'}*!`);
    }
};
