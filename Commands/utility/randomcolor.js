/**
 * Color — Manifest Prismatic Essence
 * Usage: .color
 */

module.exports = {
    name: 'color',
    aliases: ['randomcolor', 'hexcolor', 'prism', 'essence'],
    description: 'Manifest a unique Prismatic Essence from the infinite spectrum.',
    category: 'utility',
    async execute({ reply }) {
        const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
        const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        
        const hsl = (() => {
            const rn = r / 255, gn = g / 255, bn = b / 255;
            const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
                    case gn: h = ((bn - rn) / d + 2) / 6; break;
                    default: h = ((rn - gn) / d + 4) / 6; break;
                }
            }
            return `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
        })();

        reply(
            `🎨 *Prismatic Essence Manifested*\n\n` +
            `🖍️ HEX: \`${hex}\`\n` +
            `🔴 RGB: rgb(${r}, ${g}, ${b})\n` +
            `🌈 HSL: hsl(${hsl})\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
