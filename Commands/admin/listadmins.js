/**
 * ListAdmins Command — List all group admins (real numbers, not @lid)
 * Usage: .listadmins
 */
function realJid(p) {
    if (p.phoneNumber) return p.phoneNumber.includes('@') ? p.phoneNumber : `${p.phoneNumber}@s.whatsapp.net`;
    if (p.jid && p.jid.endsWith('@s.whatsapp.net')) return p.jid;
    if (p.id && p.id.endsWith('@s.whatsapp.net')) return p.id;
    return p.id;
}

module.exports = {
    name: 'listadmins',
    aliases: ['admins', 'getadmins'],
    description: 'List all admins in the group',
    category: 'admin',
    async execute({ sock, from, reply, isGroup }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        try {
            const meta = await sock.groupMetadata(from);
            const admins = meta.participants.filter(p => p.admin);
            if (!admins.length) return reply('🛡️ *Celestial Registry*\n\nNo masters found in this realm.');

            const adminJids = admins.map(realJid);
            const list = admins.map((a, i) => {
                const jid = adminJids[i];
                const num = jid.split('@')[0].split(':')[0];
                const tag = a.admin === 'superadmin' ? '👑' : '⭐';
                return `${i + 1}. @${num} ${tag}`;
            }).join('\n');

            await sock.sendMessage(from, {
                text: `👑 *Celestial Masters* (${admins.length})\n\n${list}\n\n👑 = High Sovereign  ⭐ = Celestial Guardian`,
                mentions: adminJids,
            });
        } catch (e) {
            console.error('[NEZHA-ADMINS]', e.message);
            reply('❌ A disturbance in the heavens: Failed to fetch the master list.');
        }
    }
};
