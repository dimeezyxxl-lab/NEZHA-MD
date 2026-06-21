/**
 * Predict — Consult the Celestial Oracle
 * Usage: .predict <your inquiry>
 */

const celestialOracles = [
    "✨ The celestial alignment says YES — proceed with confidence!",
    "🔮 The currents of destiny are shifting; fortune favors the bold.",
    "❌ The stars advise caution — wait for the heavens to align in your favor.",
    "⚡ A divine opportunity approaches you from the eastern horizon.",
    "🌙 The truth you seek is a reflection of your inner spirit.",
    "🎯 Sharpen your intent, and the path to success will manifest.",
    "🌊 Tides of change are rising — embrace the flow, do not resist.",
    "🕊️ Serenity and auspicious winds surround your journey.",
    "🔥 Your inner fire shall forge the path to your victory.",
    "⏳ The hourglass demands patience — great wonders require time to bloom."
];

module.exports = {
    name: 'predict',
    aliases: ['prediction', 'future', 'oracle', 'divine'],
    description: 'Consult the Celestial Oracle regarding your path.',
    category: 'fun',
    async execute({ reply, args }) {
        const question = args.join(' ') || 'the unknown';
        const prediction = celestialOracles[Math.floor(Math.random() * celestialOracles.length)];
        
        return reply(
            `🔮 *Celestial Oracle*\n\n` +
            `_Regarding: "${question}"_\n\n` +
            `*${prediction}*`
        );
    }
};
