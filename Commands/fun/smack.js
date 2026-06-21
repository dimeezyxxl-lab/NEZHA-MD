/**
 * Smack — Deliver a Celestial Strike
 * Usage: .smack [@user]
 */

module.exports = {
    name: 'smack',
    aliases: ['strike', 'impact'],
    description: 'Deliver a swift celestial strike to another spirit.',
    category: 'fun',
    async execute({ args, reply, msg }) {
        const target = (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
            || msg.message?.extendedTextMessage?.contextInfo?.participant
            || args.join(' ').trim()
            || 'a wandering spirit').split('@')[0];
            
        const strikes = [
            "{target} has been struck into the next celestial cycle.",
            "A precise, resonant strike for {target}.",
            "{target} has felt the weight of a divine palm."
        ];
        
        const line = strikes[Math.floor(Math.random() * strikes.length)];
        
        // Ensure mentions are formatted correctly
        const mention = target.includes('s.whatsapp.net') || /^\d+$/.test(target) ? `@${target}` : target;
        
        return reply(
            `✋ *Celestial Strike*\n\n` + 
            line.replace('{target}', mention),
            { mentions: [target.includes('@') ? target : target + '@s.whatsapp.net'] }
        );
    }
};
