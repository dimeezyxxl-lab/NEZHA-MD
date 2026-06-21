/**
 * Ship — Observe a Celestial Union
 * Usage: .ship [Name1] [Name2]
 */

module.exports = {
    name: 'ship',
    aliases: ['love', 'couple', 'union'],
    description: 'Observe the celestial compatibility between two spirits.',
    category: 'fun',
    async execute({ reply, args }) {
        if (args.length < 2) return reply('❌ *Celestial Guidance:* Please invoke this command with two names: `.ship [Spirit1] [Spirit2]`');
        
        const spirit1 = args[0];
        const spirit2 = args[1];
        const alignment = Math.floor(Math.random() * 101);
        
        // Visual representation of the celestial bond
        const celestialBond = '✨'.repeat(Math.floor(alignment / 10)) + '🌑'.repeat(10 - Math.floor(alignment / 10));
        
        let verdict = alignment > 80 ? '💘 A fated match made in the stars!' : 
                      alignment > 50 ? '💕 A promising celestial harmony.' : 
                      alignment > 30 ? '💛 The spirits remain uncertain...' : 
                      '💔 The threads of fate do not align.';
                      
        return reply(
            `💞 *Celestial Union*\n\n` +
            `*${spirit1}* & *${spirit2}*\n\n` +
            `${celestialBond}\n` +
            `✨ Alignment: *${alignment}%*\n\n` +
            `${verdict}`
        );
    }
};
