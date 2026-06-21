/**
 * Chuck Norris — Recount a legend of the Celestial Warrior
 */
module.exports = {
    name: 'chucknorris',
    aliases: ['chuck', 'legend', 'warrior'],
    description: 'Recount a legendary fact about the Celestial Warrior.',
    category: 'fun',
    async execute({ reply }) {
        const lines = [
            'He can split the sky with a single thought.',
            'He does not move through space; he bends reality to meet him.',
            'He can whisper to the stars and command the tides of fate.',
            'When he practices his forms, the very foundations of the earth tremble in reverence.',
            'He once caught a falling star with his bare hands just to light his path.',
            'The sun rises only when he deems the darkness sufficient.'
        ];
        
        return reply('🥋 *Legend of the Celestial Warrior*\n\n_“' + lines[Math.floor(Math.random() * lines.length)] + '”_');
    }
};
