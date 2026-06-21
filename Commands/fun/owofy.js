/**
 * Celestial-ify — Transform speech into a Celestial Whisper
 * Usage: .celestialify <text>
 */
module.exports = {
    name: 'owofy',
    aliases: ['owo', 'celestialify', 'whisper'],
    description: 'Transform your words into a Celestial Whisper.',
    category: 'fun',
    async execute({ args, reply }) {
        const text = args.join(' ').trim();
        if (!text) return reply('Provide a message to be whispered by the heavens.');
        
        // Transforming speech into a celestial rhythm
        const out = text
            .replace(/[rl]/g, 'w').replace(/[RL]/g, 'W')
            .replace(/n([aeiou])/gi, (m, c) => 'ny' + c)
            .replace(/!+/g, ' ✨!') + ' ✨';
            
        return reply(`🎐 *Celestial Whisper*\n\n_“${out}”_`);
    }
};
