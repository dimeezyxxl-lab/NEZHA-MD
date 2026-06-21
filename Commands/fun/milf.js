/**
 * Matriarch — Bestow the grace of the Celestial Matriarch
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'matriarch',
    aliases: ['milf', 'grace', 'motherly'],
    emoji: '💖',
    verb: 'bestows the grace of the Celestial Matriarch upon',
    selfVerb: 'is radiating the eternal grace of the Matriarch',
    title: 'Celestial Matriarch',
    fallbacks: [
        'https://media.tenor.com/EZl5VG7iv9MAAAAC/anime-mom.gif'
    ],
    description: 'Bestow a reaction GIF reflecting the grace of the Celestial Matriarch.'
});
