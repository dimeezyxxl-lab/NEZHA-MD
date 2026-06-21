const database = require('../../utils/database');

module.exports = {
    name: 'mute',
    aliases: ['silence'],
    description: 'Mute the group (only admins can send)',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        // ── Admin Gate ──
        if (!isAdmin) {
            return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince to silence this realm.');
        }

        const action = args[0]?.toLowerCase();

        if (!action || !['on', 'off'].includes(action)) {
            const group = database.getGroup(from);
            return reply(`🔇 *NEZHA — SILENCE SETTINGS*\n\nStatus: ${group.mute ? '✅ Muted' : '🔊 Unmuted'}\n\nUsage:\n• \`.mute on\`\n• \`.mute off\``);
        }

        try {
            const setting = action === 'on' ? 'announcement' : 'not_announcement';
            await sock.groupSettingUpdate(from, setting);
            database.setGroup(from, 'mute', action === 'on');
            reply(action === 'on' ? '🔇 The Lotus Prince has commanded silence! Only celestial masters may speak.' : '🔊 The silence is lifted! All souls may speak again.');
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
