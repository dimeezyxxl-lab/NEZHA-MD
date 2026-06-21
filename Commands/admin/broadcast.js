/**
 * Broadcast Command — Broadcasts a message to all group members
 * Usage: .broadcast <message>
 */

module.exports = {
    name: 'broadcast',
    aliases: ['bc'],
    description: 'Broadcast a message to all group members',
    category: 'admin',
    async execute({ sock, reply, args, from, isGroup }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        const text = args.join(' ');
        if (!text) return reply('🚩 Usage: `.broadcast <message>`');

        try {
            const metadata = await sock.groupMetadata(from);
            const participants = metadata.participants.map(p => p.id);
            const msg = `📢 *CELESTIAL ANNOUNCEMENT*\n\n${text}`;
            
            await sock.sendMessage(from, { text: msg, mentions: participants });
            reply(`✅ The message has been broadcast to all ${participants.length} souls on the battlefield!`);
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
