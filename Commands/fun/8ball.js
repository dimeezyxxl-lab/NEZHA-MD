/**
 * 8Ball Command — Consult the Celestial Oracle
 * Usage: .8ball <question>
 */

const responses = [
    '🎱 It is certain.',
    '🎱 It is decidedly so.',
    '🎱 Without a doubt.',
    '🎱 Yes definitely.',
    '🎱 You may rely on it.',
    '🎱 As I see it, yes.',
    '🎱 Most likely.',
    '🎱 Outlook good.',
    '🎱 Yes.',
    '🎱 Signs point to yes.',
    '🎱 Reply hazy, try again.',
    '🎱 Ask again later.',
    '🎱 Better not tell you now.',
    '🎱 Cannot predict now.',
    '🎱 Concentrate and ask again.',
    '🎱 Don\'t count on it.',
    '🎱 My reply is no.',
    '🎱 My sources say no.',
    '🎱 Outlook not so good.',
    '🎱 Very doubtful.'
];

module.exports = {
    name: '8ball',
    aliases: ['magicball', 'ask', 'oracle'],
    description: 'Consult the Celestial Oracle for divine guidance',
    category: 'fun',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `🎱 *Celestial Oracle*\n\n` +
                `The heavens are silent. Please present your query.\n` +
                `Usage: \`.8ball <question>\`\n` +
                `Example: \`.8ball Will I achieve enlightenment?\``
            );
        }

        const question = args.join(' ');
        const answer = responses[Math.floor(Math.random() * responses.length)];

        reply(
            `🎱 *Celestial Oracle*\n\n` +
            `📜 Query: _${question}_\n` +
            `✨ Revelation: *${answer}*`
        );
    }
};
