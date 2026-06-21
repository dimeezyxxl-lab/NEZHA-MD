/**
 * Poll — Invoke a Celestial Consensus
 * Usage: .poll <question> | <option1> | <option2> | ...
 */

module.exports = {
    name: 'poll',
    aliases: ['vote', 'survey', 'consensus'],
    description: 'Invoke a Celestial Consensus to discern the will of the sanctuary.',
    category: 'group',
    async execute({ sock, msg, from, reply, args, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        const input = args.join(' ');
        const parts = input.split('|').map(p => p.trim());
        
        if (parts.length < 3) {
            return reply(
                `📊 *Celestial Consensus Creator*\n\n` +
                `Usage: .poll <question> | <option1> | <option2> | ...\n` +
                `Example: .poll Shall we ascend? | Yes | No | Perhaps`
            );
        }

        const question = parts[0];
        const options = parts.slice(1);

        if (options.length > 10) {
            return reply('❌ *Limitation:* The heavens only permit up to 10 paths for consensus.');
        }

        try {
            await sock.sendMessage(from, {
                poll: {
                    name: question,
                    values: options,
                    selectableCount: 1
                }
            }, { quoted: msg });

        } catch (err) {
            reply('❌ *Manifestation failed:* The Celestial Consensus could not be invoked.');
        }
    }
};
