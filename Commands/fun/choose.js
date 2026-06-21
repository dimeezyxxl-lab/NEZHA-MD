/**
 * Choose — Perform a celestial divination
 * Usage: .choose option1, option2, option3
 */

module.exports = {
    name: 'choose',
    aliases: ['pick', 'decide', 'divine'],
    description: 'Let the heavens decide between your options.',
    category: 'fun',
    async execute({ args, reply }) {
        const opts = args.join(' ').split(/[,|]/).map(s => s.trim()).filter(Boolean);
        
        if (opts.length < 2) {
            return reply(
                `❌ *Celestial Divination*\n\n` +
                `The fates require multiple paths to discern the truth.\n` +
                `Usage: \`.choose path1, path2, path3\``
            );
        }
        
        const selection = opts[Math.floor(Math.random() * opts.length)];
        
        return reply(
            `✨ *The Heavens Have Spoken*\n\n` +
            `After consulting the stars, the path chosen is: *${selection}*`
        );
    }
};
