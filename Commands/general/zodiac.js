/**
 * Zodiac — Consult the Celestial Constellations
 * Usage: .zodiac MM-DD
 */

module.exports = {
    name: 'zodiac',
    aliases: ['constellation', 'sign', 'fate'],
    description: 'Consult the Celestial Constellations for a given date.',
    category: 'general',
    async execute({ args, reply }) {
        const m = (args[0] || '').match(/^(\d{1,2})[-/](\d{1,2})$/);
        if (!m) {
            return reply('❌ *Invalid alignment.* Please use the format: `.zodiac MM-DD` (e.g., `.zodiac 06-15`).');
        }
        
        const mo = +m[1], d = +m[2];
        const CONSTELLATIONS = [
            ['Capricorn',  '♑', 1, 19], ['Aquarius',   '♒', 2, 18], ['Pisces',     '♓', 3, 20],
            ['Aries',      '♈', 4, 19], ['Taurus',     '♉', 5, 20], ['Gemini',     '♊', 6, 20],
            ['Cancer',     '♋', 7, 22], ['Leo',        '♌', 8, 22], ['Virgo',      '♍', 9, 22],
            ['Libra',      '♎', 10,22], ['Scorpio',    '♏', 11,21], ['Sagittarius','♐', 12,21], ['Capricorn','♑',12,31],
        ];
        
        let constellation = CONSTELLATIONS[CONSTELLATIONS.length - 1];
        for (const c of CONSTELLATIONS) {
            if (mo < c[2] || (mo === c[2] && d <= c[3])) {
                constellation = c;
                break;
            }
        }
        
        return reply(
            `🔮 *Celestial Constellation*\n\n` +
            `Alignment Date: ${mo}-${d}\n` +
            `Constellation: ${constellation[1]} *${constellation[0]}*`
        );
    }
};
