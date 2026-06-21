/**
 * MemberCount Command — Show total member count
 * Usage: .membercount
 */
module.exports = {
    name: 'membercount',
    aliases: ['members', 'count'],
    description: 'Show the total number of group members',
    category: 'admin',
    async execute({ sock, from, reply, isGroup }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        try {
            const meta = await sock.groupMetadata(from);
            const total = meta.participants.length;
            const admins = meta.participants.filter(p => p.admin).length;
            const regular = total - admins;
            
            reply(
                `╭─❒ ◈ *NEZHA · BATTLEFIELD* ❒\n` +
                `│\n` +
                `│ 👥 Total Souls: *${total}*\n` +
                `│ 👑 Celestial Masters: *${admins}*\n` +
                `│ 👤 Mortal Members: *${regular}*\n` +
                `│\n` +
                `│ 📋 Realm: *${meta.subject}*\n` +
                `╰─🔥 𝙫𝙚𝙧𝙞𝙛𝙞𝙚𝙙 𝙗𝙮 𝙇𝙤𝙩𝙪𝙨 𝙋ʳⁱⁿᶜᵉ`
            );
        } catch (e) { 
            reply('❌ A disturbance in the heavens: Failed to fetch the count.'); 
        }
    }
};
