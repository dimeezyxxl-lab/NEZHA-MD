/**
 * LoveCalc — Calculate the Celestial Union
 * Usage: .lovecalc <spirit1> <spirit2>
 */
module.exports = {
    name: 'lovecalc',
    aliases: ['matchup', 'union', 'affinity'],
    description: 'Calculate the celestial union between two spirits.',
    category: 'fun',
    async execute({ args, reply }) {
        if (args.length < 2) {
            return reply(
                `❌ *Celestial Union*\n\n` +
                `The heavens require two spirits to determine a union.\n` +
                `Usage: \`.lovecalc <spirit1> <spirit2>\``
            );
        }
        
        const a = args[0], b = args.slice(1).join(' ');
        let h = 0; 
        for (const c of (a + b).toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
        
        const pct = h % 101;
        const bars = '✨'.repeat(Math.round(pct / 10)).padEnd(10, '🌑');
        
        return reply(
            `💞 *Celestial Union Calculator*\n\n` +
            `*${a}* 💖 *${b}*\n\n` +
            `[${bars}] *${pct}%*\n\n` +
            `_${pct > 80 ? 'A match forged in the stars.' : pct > 50 ? 'Their destinies are entwined in harmony.' : 'Their paths may diverge, yet fate is fickle.'}_`
        );
    }
};
