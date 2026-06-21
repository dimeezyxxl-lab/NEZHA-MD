/**
 * Announce — Issue a Celestial Proclamation
 * Usage: .announce <message>
 */

module.exports = {
    name: 'announce',
    aliases: ['announcement', 'notice', 'proclamation'],
    description: 'Issue a formal celestial proclamation to the group sanctuary.',
    category: 'group',
    async execute({ reply, args, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        
        if (!args.length) {
            return reply('📢 *Usage:* `.announce <your proclamation here>`');
        }
        
        const text = args.join(' ');
        const now = new Date().toLocaleString('en-US', { hour:'2-digit', minute:'2-digit', month:'short', day:'numeric' });
        
        reply(
            `📢 *CELESTIAL PROCLAMATION*\n` +
            `${'━'.repeat(25)}\n\n` +
            `${text}\n\n` +
            `${'━'.repeat(25)}\n` +
            `✨ Issued at: ${now}`
        );
    }
};
