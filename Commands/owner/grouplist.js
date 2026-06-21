/**
 * GroupList — Consult the Sanctuary Registry
 * Usage: .grouplist
 */
module.exports = {
    name: 'grouplist',
    aliases: ['mygroups', 'listgroups', 'sanctuaries', 'registry'],
    description: 'Consult the Sanctuary Registry (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ sock, reply }) {
        try {
            const groups = await sock.groupFetchAllParticipating();
            const list = Object.values(groups);
            
            if (!list.length) {
                return reply('📜 *SANCTUARY REGISTRY*\n\n_The Lotus Prince currently dwells within no sanctuaries._');
            }
            
            const formatted = list.slice(0, 30).map((g, i) => 
                `${i + 1}. *${g.subject}*\n   👥 ${g.participants.length} inhabitants`
            ).join('\n\n');
            
            reply(
                `📋 *SANCTUARY REGISTRY* (${list.length} total)\n\n` +
                `${formatted}${list.length > 30 ? `\n\n_...and ${list.length - 30} more hidden from view_` : ''}\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } catch (e) { 
            reply('❌ *Registry failure:* The chronicles are currently veiled.'); 
        }
    }
};
