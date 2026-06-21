/**
 * Emoji — Interpret the Celestial Glyphs
 * Usage: .emoji <emoji>
 */

const celestialGlyphs = {
    '😀': 'Radiant Grin', '😃': 'Expansive Joy', '😄': 'Luminous Smile',
    '😁': 'Beaming Celestial Radiance', '😆': 'Squinting Merriment', '😅': 'Humble Perspiration',
    '🤣': 'Rolling in Celestial Laughter', '😂': 'Tears of Divine Joy', '🙂': 'Subtle Serenity',
    '🙃': 'Perspective of the Upside-Down Realm', '😉': 'Winking Star', '😊': 'Smiling Soul',
    '😇': 'Halo of Purity', '🥰': 'Affectionate Spirit', '😍': 'Heart of Devotion',
    '🤩': 'Star-Struck by the Cosmos', '😘': 'Whispered Blessing', '😗': 'Kiss of the Wind', 
    '😚': 'Sealed Affection', '😙': 'Smiling Benediction', '😋': 'Savoring the Earthly Nectar', 
    '😛': 'Playful Spirit', '😜': 'Winking Mischief', '🤪': 'Zany Cosmic Energy', 
    '😝': 'Squinting Humor', '🤑': 'Greed of the Mortal Realm', '🤗': 'Celestial Embrace', 
    '🤭': 'Subtle Amusement', '🤫': 'Hushed Secret', '🤔': 'Contemplating the Infinite', 
    '🤐': 'Sealed Wisdom', '🤨': 'Query of the Heavens', '😐': 'Neutral Stasis', 
    '😑': 'Expressionless Void', '😶': 'Silence of the Depths', '😏': 'Smirk of the Lotus Prince', 
    '😒': 'Unamused Reflection', '🙄': 'Observing Mortal Folly', '😬': 'Grimace of Tension', 
    '🤥': 'Falsehood of the Shadow', '😌': 'Relieved Harmony', '😔': 'Pensive Solitude', 
    '😪': 'Sleepy Tranquility', '🤤': 'Desire for Mortal Delights', '😴': 'Dreaming of the Heavens', 
    '😷': 'Veiled Expression', '🤒': 'Mortal Frailty', '🤕': 'Wounded Warrior', 
    '🤢': 'Nausea of the Corrupt', '🤮': 'Expelling Corruption', '🤧': 'Cleansing Breath', 
    '🥵': 'Heat of the Sun', '🥶': 'Frost of the Abyss', '🥴': 'Woozy Flux', 
    '😵': 'Dizzying Reality', '🤯': 'Expansion of Enlightenment', '🤠': 'Spirit of the Frontier', 
    '🥳': 'Celestial Jubilee', '😎': 'Radiant Composure', '🤓': 'Scholar of the Scrolls', 
    '🧐': 'Scrutinizing the Truth', '😕': 'Confused Path', '😟': 'Concern for the Realm', 
    '🙁': 'Slightly Frowning Spirit', '☹️': 'Frowning Shadow', '😮': 'Wonderment of Creation', 
    '😯': 'Hushed Awe', '😲': 'Astonished by the Infinite', '😳': 'Flushed with Humility', 
    '🥺': 'Pleading for Grace', '😦': 'Anguished Query', '😨': 'Fear of the Unknown', 
    '😰': 'Anxious Effort', '😥': 'Sadness Transmuted', '😢': 'Shedding Sorrow', 
    '😭': 'Loudly Crying for Justice', '😱': 'Terror of the Void', '😖': 'Confounded by Chaos', 
    '😣': 'Persevering through Trial', '😞': 'Disappointed Soul', '😓': 'Sweat of Exhaustion', 
    '😩': 'Weary Spirit', '😫': 'Tired of Mortal Cycles', '🥱': 'Yawning Eternity', 
    '😤': 'Determination of the Lotus', '😡': 'Pouting Wrath', '😠': 'Angry Storm', 
    '🤬': 'Symbols of Unchecked Rage', '😈': 'Mischievous Horns', '👿': 'Angry Shadow', 
    '💀': 'Mortal Remains', '☠️': 'Sign of Peril', '💩': 'Mortal Dross', '🤡': 'Fool of the Stage', 
    '👹': 'Ogre of the Wilds', '👺': 'Goblin of the Mountains', '👻': 'Whispering Spirit', 
    '👽': 'Visitor from Distant Stars', '👾': 'Monstrous Entity', '🤖': 'Construct of Steel', 
    '😺': 'Grinning Feline Spirit', '😸': 'Joyful Feline', '😹': 'Laughing Feline', 
    '😻': 'Loving Feline', '😼': 'Wry Feline Smile', '😽': 'Kissing Feline', 
    '🙀': 'Weary Feline', '😿': 'Crying Feline', '😾': 'Pouting Feline', 
    '❤️': 'Heart of Passion', '🧡': 'Heart of Dawn', '💛': 'Heart of Enlightenment', 
    '💚': 'Heart of Nature', '💙': 'Heart of the Firmament', '💜': 'Heart of Royalty', 
    '🖤': 'Heart of Shadow', '🤍': 'Heart of Purity', '🤎': 'Heart of the Earth', 
    '💔': 'Heart of Fragmented Spirit', '❣️': 'Emphasis of the Soul', '💕': 'Bond of Two Spirits', 
    '💞': 'Revolving Cycle of Love', '💓': 'Pulse of Life', '💗': 'Growing Affection', 
    '💖': 'Sparkling Radiance', '💘': 'Pierced by Cupid', '💝': 'Heart of a Gift'
};

module.exports = {
    name: 'emoji',
    aliases: ['emojimeaning', 'whatemoji', 'glyph'],
    description: 'Interpret the meaning of a celestial glyph (emoji).',
    category: 'fun',
    async execute({ reply, args }) {
        if (!args.length) {
            return reply(
                `✨ *Celestial Glyphs*\n\n` +
                `Usage: \`.emoji <emoji>\`\n` +
                `Example: \`.emoji 😂\``
            );
        }

        const emoji = args[0];
        const meaning = celestialGlyphs[emoji];

        if (meaning) {
            reply(
                `✨ *Celestial Glyph Interpretation*\n\n` +
                `Glyph: ${emoji}\n` +
                `Interpretation: *${meaning}*`
            );
        } else {
            reply(`❌ The heavens do not recognize this glyph: ${emoji}. Perhaps it is a cipher from another realm?`);
        }
    }
};
