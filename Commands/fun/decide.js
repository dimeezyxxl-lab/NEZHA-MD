/**
 * Decide — Seek the Celestial Oracle's guidance
 * Usage: .decide option1 option2 option3
 */
module.exports = {
    name: 'decide',
    aliases: ['choose', 'pick', 'oracle'],
    description: 'Seek the guidance of the Celestial Oracle between options.',
    category: 'fun',
    async execute({ reply, args }) {
        if (args.length < 2) {
            return reply(
                `❌ *Celestial Oracle*\n\n` +
                `The heavens require multiple paths to offer guidance.\n` +
                `Usage: \`.decide path1 path2 path3\``
            );
        }
        
        const choice = args[Math.floor(Math.random() * args.length)];
        
        return reply(
            `✨ *The Oracle has spoken!*\n\n` +
            `After scanning the celestial tapestry, I determine the path to be: *${choice}*`
        );
    }
};
