/**
 * Age — Perform a Chronos Inquiry
 * Usage: .age YYYY-MM-DD
 */

module.exports = {
    name: 'age',
    aliases: ['chronos', 'birthdays'],
    description: 'Perform a Chronos Inquiry to determine one\'s age within the mortal cycle.',
    category: 'utility',
    async execute({ args, reply }) {
        const d = new Date(args[0]);
        if (isNaN(d)) {
            return reply('❓ *Chronos Inquiry failed.*\n\n_Provide your birth date in the format: YYYY-MM-DD_');
        }
        
        const ms = Date.now() - d.getTime();
        if (ms < 0) return reply('❌ _The date provided exists beyond the current horizon of time._');
        
        const years = ms / (365.25 * 24 * 3600 * 1000);
        const days = Math.floor(ms / (24 * 3600 * 1000));
        
        return reply(
            `⏳ *Chronos Inquiry*\n\n` +
            `• Cycle Duration: ${years.toFixed(2)} years\n` +
            `• Mortal Days Elapsed: ${days}\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
