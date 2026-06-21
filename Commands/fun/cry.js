/**
 * Cry — Shed a celestial tear
 */
const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'cry',
    emoji: '😭',
    verb: 'sheds a celestial tear for',
    selfVerb: 'is overcome with celestial sorrow',
    aliases: ['sob', 'mourn', 'grieve'],
    fallbacks: [
        'https://media.tenor.com/9SkU1IzkLG0AAAAC/anime-cry.gif',
        'https://media.tenor.com/IZmh-3VLCY8AAAAC/anime-sad.gif'
    ],
    description: 'Express profound celestial sorrow, optionally toward another spirit'
});
