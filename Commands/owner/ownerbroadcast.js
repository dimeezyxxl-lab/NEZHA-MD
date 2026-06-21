/**
 * OwnerBroadcast — Issue a Lotus Decree
 * Usage: .ownerbroadcast <message>
 */
module.exports = {
    name: 'ownerbroadcast',
    aliases: ['globalbroadcast', 'sendall', 'decree', 'broadcast'],
    description: 'Issue a Divine Decree to all sanctuaries (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ sock, reply, args }) {
        if (!args.length) return reply('📡 _Usage: .ownerbroadcast <message>_');
        
        const text = args.join(' ');
        
        try {
            const groups = await sock.groupFetchAllParticipating();
            const groupIds = Object.keys(groups);
            
            if (!groupIds.length) return reply('❌ _The Prince dwells in no sanctuaries._');
            
            await reply(`📡 *Issuing Lotus Decree to ${groupIds.length} sanctuaries...*`);
            
            let sent = 0, failed = 0;
            for (const gid of groupIds) {
                try {
                    await sock.sendMessage(gid, { 
                        text: `📢 *LOTUS PRINCE DECREE*\n\n${text}\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_` 
                    });
                    sent++;
                    await new Promise(r => setTimeout(r, 500));
                } catch { 
                    failed++; 
                }
            }
            
            reply(
                `✅ *DECREE DISSEMINATION COMPLETE*\n\n` +
                `✅ Delivered to: ${sent}\n` +
                `❌ Failed to reach: ${failed}\n` +
                `📊 Total Sanctuaries: ${groupIds.length}`
            );
        } catch (e) { 
            reply('❌ *Decree failure:* The celestial network is currently obscured.'); 
        }
    }
};
