/**
 * Wink — Offer a Celestial Winking Gesture
 * Usage: .wink [@user]
 */

const { makeAnimeReaction } = require('../../lib/animeReaction');

module.exports = {
    ...makeAnimeReaction({
        name: 'wink', 
        emoji: '😉', 
        verb: 'bestows a knowing celestial wink upon', 
        selfVerb: 'winks at the cosmos, finding amusement in the void',
        fallbacks: [
            'https://media.tenor.com/lwt2hsZK7yMAAAAC/anime-wink.gif',
            'https://media.tenor.com/HjqdH-cqfYUAAAAC/anime-wink.gif'
        ],
        description: 'Bestow a playful celestial wink upon another spirit.'
    }),
    aliases: ['wink', 'gesture'],
    category: 'fun'
};
