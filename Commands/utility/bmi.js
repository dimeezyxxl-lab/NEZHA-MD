/**
 * BMI — Assess Vessel Equilibrium
 * Usage: .bmi <weight_kg> <height_cm>
 */

module.exports = {
    name: 'bmi',
    aliases: ['bodymass', 'equilibrium', 'vessel'],
    description: 'Assess the physical harmony of your vessel.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `⚖️ *Vessel Equilibrium Assessment*\n\n` +
                `The Lotus Prince measures the harmony of your mortal form:\n\n` +
                `Usage: .bmi <weight_kg> <height_cm>\n` +
                `Example: .bmi 70 175\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        const weight = parseFloat(args[0]);
        const heightCm = parseFloat(args[1]);
        
        if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
            return reply('❌ _The measurements provided are unstable. Provide valid numeric values._');
        }
        
        const h = heightCm / 100;
        const bmi = (weight / (h * h)).toFixed(1);
        let category, emoji;
        
        if (bmi < 18.5) { category = 'Fragile'; emoji = '⚠️'; }
        else if (bmi < 25) { category = 'Balanced'; emoji = '✅'; }
        else if (bmi < 30) { category = 'Heavy'; emoji = '⚠️'; }
        else { category = 'Encumbered'; emoji = '🚨'; }
        
        reply(
            `⚖️ *Vessel Equilibrium Report*\n\n` +
            `• Mass: ${weight} kg\n` +
            `• Stature: ${heightCm} cm\n\n` +
            `📊 Essence Score: *${bmi}*\n` +
            `${emoji} Alignment: *${category}*\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
