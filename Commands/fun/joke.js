/**
 * Joke — Share a Celestial Jest
 * Usage: .joke
 */

const celestialJests = [
    "Why don't celestial masters trust atoms? Because they make up everything! ✨",
    "I told my peer their brow markings were too high. They looked surprised. ✨",
    "Why can't you give a frost spirit a balloon? Because they'll let it go! ✨",
    "I'm reading a scroll about anti-gravity. It's impossible to put down! ✨",
    "Did you hear about the scholar who's afraid of negative numbers? They'll stop at nothing to avoid them! ✨",
    "Why do celestial cows wear bells? Because their horns don't work! ✨",
    "What do you call a false noodle? An impasta! ✨",
    "Why did the scarecrow win a divine award? Because he was outstanding in his field! ✨",
    "What do you call cheese that isn't yours? Nacho cheese! ✨",
    "Why can't a celestial chariot stand on its own? It's two-tired! ✨"
];

module.exports = {
    name: 'joke',
    aliases: ['jokes', 'funny', 'jest'],
    description: 'Recount a jest from the celestial archives.',
    category: 'fun',
    async execute({ reply }) {
        const joke = celestialJests[Math.floor(Math.random() * celestialJests.length)];
        
        return reply(
            `✨ *Celestial Jest*\n\n` +
            `_“${joke}”_`
        );
    }
};
