/**
 * Colorname — Manifest a celestial hue
 */
module.exports = {
    name: 'colorname',
    aliases: ['hue', 'color', 'shades'],
    description: 'Manifest a random celestial hue.',
    category: 'fun',
    async execute({ reply }) {
        const items = [
            "Crimson Nebula", "Obsidian Void", "Azure Firmament", "Emerald Lotus", 
            "Violet Ethereal", "Amber Radiance", "Ivory Moonbeam", "Magenta Spirit", 
            "Cyan Aura", "Onyx Shadow", "Saffron Dawn", "Indigo Abyss", 
            "Coral Sunset", "Teal Depth", "Lavender Essence"
        ];
        
        const pick = items[Math.floor(Math.random() * items.length)];
        
        return reply(
            `🎨 *Celestial Hue*\n\n` +
            `The heavens manifest: *${pick}*`
        );
    }
};
