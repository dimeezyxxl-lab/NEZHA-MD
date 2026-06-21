/**
 * GroupInfo Command — Get details about the current battlefield
 * Usage: .groupinfo
 */
module.exports = {
    name: 'groupinfo',
    aliases: ['ginfo', 'groupdesc'],
    description: 'Get group information',
    category: 'admin',
    async execute({ sock, reply, from, isGroup }) {
        if (!isGroup) return reply('⚔️ This command is restricted to group battlefields.');
        try {
            const meta = await sock.groupMetadata(from);
            const admins = meta.participants
                .filter(p => p.admin)
                .map(p => `+${p.id.split('@')[0]}`)
                .join(', ');
                
            reply(
                `╭─❒ ◈ *NEZHA · GROUP INFO* ❒\n` +
                `│\n` +
                `│ 👥 Name: *${meta.subject}*\n` +
                `│ 📝 Desc: ${meta.desc || 'None'}\n` +
                `│ 👤 Members: *${meta.participants.length}*\n` +
                `│ 🛡️ Admins: ${admins || 'None'}\n` +
                `│ 🆔 ID: \`${from}\`\n` +
                `│\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋𝙧𝙞𝙣𝙘𝙚`
            );
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
