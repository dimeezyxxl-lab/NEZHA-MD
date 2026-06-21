/**
 * Brainteaser — Contemplate a celestial enigma.
 */
module.exports = {
    name: 'brainteaser',
    aliases: ['puzzle', 'enigma', 'riddle'],
    description: 'Contemplate a celestial enigma.',
    category: 'fun',
    async execute({ reply }) {
        const list = [
            { q: 'What has keys but cannot open locks?', a: 'A piano.' },
            { q: 'I speak without a mouth and hear without ears. What am I?', a: 'An echo.' },
            { q: 'The more you take, the more you leave behind. What are they?', a: 'Footsteps.' },
            { q: 'What can fill a room but takes no space?', a: 'Light.' },
            { q: 'What gets wetter the more it dries?', a: 'A towel.' },
            { q: 'I have cities, but no houses. I have mountains, but no trees. What am I?', a: 'A map.' },
            { q: 'What is always coming but never arrives?', a: 'Tomorrow.' }
        ];
        
        const x = list[Math.floor(Math.random() * list.length)];
        return reply(
            `🧩 *Celestial Enigma*\n\n` +
            `_${x.q}_\n\n` +
            `_Reveal the truth:_ ||${x.a}||`
        );
    }
};
