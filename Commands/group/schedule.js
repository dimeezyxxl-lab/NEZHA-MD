/**
 * Schedule — Release a Celestial Prophecy
 * Usage: .schedule <minutes> <message>
 */

module.exports = {
    name: 'schedule',
    aliases: ['delay', 'timer', 'prophecy'],
    description: 'Release a celestial prophecy to manifest in the sanctuary after a set time.',
    category: 'group',
    async execute({ sock, from, reply, args, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }
        
        if (args.length < 2) {
            return reply(
                '⏰ *Release Celestial Prophecy*\n\n' +
                'Usage: `.schedule <minutes> <message>`\n' +
                'Example: `.schedule 5 The meeting of souls begins.`'
            );
        }
        
        const mins = parseInt(args[0]);
        if (isNaN(mins) || mins < 1 || mins > 1440) {
            return reply('❌ *Temporal limitation:* The prophecy must manifest within 1 to 1440 minutes.');
        }
        
        const message = args.slice(1).join(' ');
        const sendTime = new Date(Date.now() + mins * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        reply(
            `⏰ *Celestial Prophecy Inscribed*\n\n` +
            `📝 Prophecy: "${message}"\n\n` +
            `🕐 Manifestation time: *${mins} minute(s)* from now (approx. ${sendTime})`
        );
        
        setTimeout(async () => {
            try { 
                await sock.sendMessage(from, { 
                    text: `📢 *Celestial Prophecy Manifested*\n\n${message}` 
                }); 
            }
            catch (e) { 
                console.error('[Prophecy]', e); 
            }
        }, mins * 60000);
    }
};
