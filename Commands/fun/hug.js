/**
 * Hug — Bestow a celestial embrace
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'hug',
    emoji: '🤗',
    verb: 'bestows a celestial embrace upon',
    selfVerb: 'longs for the warmth of a celestial embrace',
    aliases: ['cuddle', 'embrace', 'comfort'],
    fallbacks: [
        'https://media.tenor.com/kCZjTqCKiggAAAAC/hug-anime.gif',
        'https://media.tenor.com/MA1Q7HRsZZAAAAAC/anime-hug.gif'
    ],
    description: 'Bestow a celestial embrace upon another spirit'
});
