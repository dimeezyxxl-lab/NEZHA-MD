/**
 * Percent — Perform Proportional Analysis
 * Usage: .percent <value> <mode> <total/new>
 */

module.exports = {
    name: 'percent',
    aliases: ['percentage', 'pct', 'analysis'],
    description: 'Perform Proportional Analysis on numerical data.',
    category: 'utility',
    async execute({ reply, args }) {
        if (args.length < 3) {
            return reply(
                `📐 *Proportional Analysis*\n\n` +
                `The Lotus Prince measures the shifting tides of data.\n\n` +
                `Modes:\n` +
                `• .percent 25 of 200 → What is 25% of 200?\n` +
                `• .percent 50 out 200 → 50 is what % of 200?\n` +
                `• .percent 100 to 150 → % change from 100 to 150?\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }

        const a = parseFloat(args[0]), mode = args[1].toLowerCase(), b = parseFloat(args[2]);
        
        if (isNaN(a) || isNaN(b)) {
            return reply('❌ _The numerical foundation is unstable. Provide valid numbers for analysis._');
        }

        if (mode === 'of') {
            const result = ((a / 100) * b).toFixed(2);
            return reply(
                `📐 *Proportional Analysis (Fraction)*\n\n` +
                `${a}% of ${b} is *${result}*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } else if (mode === 'out') {
            const result = ((a / b) * 100).toFixed(2);
            return reply(
                `📐 *Proportional Analysis (Ratio)*\n\n` +
                `${a} out of ${b} is *${result}%*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        } else if (mode === 'to') {
            const result = (((b - a) / a) * 100).toFixed(2);
            const arrow = b > a ? '📈 Ascending' : '📉 Descending';
            return reply(
                `📐 *Proportional Analysis (Trend)*\n\n` +
                `Shift: ${a} to ${b}\n` +
                `${arrow} Change: *${result}%*\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );
        }
        
        reply('❌ _The mode requested is unknown to the Lotus Prince. Use `of`, `out`, or `to`._');
    }
};
