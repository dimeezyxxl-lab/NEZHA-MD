/**
 * Blush — A moment of celestial shyness
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'blush',
    emoji: '☺️',
    verb: 'is rendered shy and blushes toward',
    selfVerb: 'is overcome with a celestial blush',
    fallbacks: [
        'https://media.tenor.com/QXMlGn3jOOcAAAAC/anime-blush.gif',
        'https://media.tenor.com/0xK0bF5IZkkAAAAC/anime-shy.gif'
    ],
    description: 'Express celestial shyness, optionally toward another spirit'
});
