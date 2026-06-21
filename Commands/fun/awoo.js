const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = makeAnimeReaction({
    name: 'awoo',
    emoji: '🐺',
    verb: 'howls at the celestial moon toward',
    selfVerb: 'lets out a primordial celestial howl',
    fallbacks: [
        'https://media.tenor.com/5HWnvc7vGSwAAAAC/awoo-anime.gif'
    ],
    description: 'Release a primordial celestial howl.'
});
