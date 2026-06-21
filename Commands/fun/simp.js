/**
 * Simp — Declare a Celestial Devotion
 * Usage: .simp [@user]
 */

module.exports = {
    name: 'simp',
    aliases: ['devotion', 'worship'],
    description: 'Declare your unwavering celestial devotion to another spirit.',
    category: 'fun',
    async execute({ args, reply, msg }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            || msg.message?.extendedTextMessage?.contextInfo?.participant
            || args.join(' ').trim()
            || 'a mystery spirit').split('@')[0];
            
        const devotions = [
            "{target} is radiating pure, unyielding devotion right now.",
            "Certified celestial devotee alert for {target}.",
            "{target} would traverse the fiery depths of the afterlife for their chosen one."
        ];
        
        const line = devotions[Math.floor(Math.random() * devotions.length)];
        
        // Ensure mentions are formatted correctly if a JID is present
        const mention = target.includes('s.whatsapp.net') || /^\d+$/.test(target) ? `@${target}` : target;
        
        return reply(
            `💘 *Celestial Devotion*\n\n` + 
            line.replace('{target}', mention),
            { mentions: [target.includes('@') ? target : target + '@s.whatsapp.net'] }
        );
    }
};
