/**
 * Revoke — Seal the Celestial Gateway
 * Usage: .revoke
 */

module.exports = {
    name: 'revoke',
    aliases: ['revokelink', 'resetlink', 'sealgateway'],
    description: 'Seal the current celestial gateway and render old paths obsolete.',
    category: 'group',
    async execute({ sock, from, reply, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const botParticipant = groupMetadata.participants.find(p => p.id.includes(botId.split('@')[0]));
            const isBotAdmin = botParticipant && (botParticipant.admin === 'admin' || botParticipant.admin === 'superadmin');
            
            if (!isBotAdmin) {
                return reply('🤖 *Insufficient divinity:* The Oracle must be a Guardian to seal the gateway.');
            }

            await sock.groupRevokeInvite(from);
            
            reply(
                `🔄 *Celestial Gateway Sealed*\n\n` +
                `The previous path has been dissolved into the void.\n` +
                `Use *.link* to manifest a new Celestial Gateway.`
            );
        } catch (err) {
            reply('❌ *Seal failure:* Could not dissolve the path. Ensure the Oracle possesses Guardian authority.');
        }
    }
};
