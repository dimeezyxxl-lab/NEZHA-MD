/**
 * Rate — Deliver a Celestial Judgment
 * Usage: .rate [anything]
 */
module.exports = {
    name: 'rate',
    aliases: ['rate', 'judge', 'verdict'],
    description: 'Seek the Lotus Prince’s judgment on any matter.',
    category: 'fun',
    async execute({ args, reply }) {
        const subject = args.join(' ').trim() || 'this existence';
        const rating = Math.floor(Math.random() * 11);
        
        return reply(
            `⚖️ *Celestial Judgment*\n\n` +
            `After observing the threads of fate, I rate *${subject}* a *${rating}/10*.`
        );
    }
};
