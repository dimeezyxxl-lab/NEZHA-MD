/**
 * Hexcolor — Reveal the Celestial Palette
 * Usage: .hexcolor #RRGGBB
 */

module.exports = {
    name: 'hexcolor',
    aliases: ['hex', 'palette', 'color'],
    description: 'Analyze the harmonic frequency of a celestial color. Usage: .hexcolor #RRGGBB',
    category: 'general',
    async execute({ args, reply }) {
        const h = (args[0] || '').trim().replace('#', '');
        
        if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(h)) {
            return reply('❌ *Invalid frequency.* Please provide a valid hex code (e.g., `.hexcolor #FF9800`).');
        }
        
        const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        const r = parseInt(full.slice(0, 2), 16);
        const g = parseInt(full.slice(2, 4), 16);
        const b = parseInt(full.slice(4, 6), 16);
        
        const brightness = (r * 299 + g * 587 + b * 114) / 1000 > 128 ? 'Luminous' : 'Umbral';
        
        return reply(
            `🎨 *Celestial Palette: #${full.toUpperCase()}*\n\n` +
            `• RGB     : ${r}, ${g}, ${b}\n` +
            `• Essence : ${brightness} frequency`
        );
    }
};
