/**
 * ClearCache — Invoke Sanctuary Purification
 * Usage: .clearcache
 */
module.exports = {
    name: 'clearcache',
    aliases: ['clearram', 'gc', 'purify', 'cleansesanctuary'],
    description: 'Invoke Sanctuary Purification to clear detritus and restore divine memory (Owner only).',
    category: 'owner',
    ownerOnly: true,
    async execute({ reply }) {
        const before = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        
        if (global.gc) global.gc();
        
        Object.keys(require.cache).forEach(key => {
            // Protect vital organs of the sanctuary
            if (!key.includes('node_modules') && !key.includes('sessionManager') && !key.includes('database')) {
                delete require.cache[key];
            }
        });
        
        const after = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        
        reply(
            `🧹 *SANCTUARY PURIFICATION COMPLETE*\n\n` +
            `💾 Memory before the ritual: *${before} MB*\n` +
            `💾 Memory after purification: *${after} MB*\n\n` +
            `_The digital detritus has been expelled; the Lotus Prince’s consciousness is restored to clarity._\n\n` +
            `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
        );
    }
};
