/**
 * NHIE — Reveal a Celestial Truth
 * Usage: .nhie
 */
module.exports = {
    name: 'neverhaveiever',
    aliases: ['nhie', 'truth', 'revelation'],
    description: 'Reveal a truth from the scroll of mortal experiences.',
    category: 'fun',
    async execute({ reply }) {
        const truths = [
            'Never have I ever feigned appreciation for a mortal gift.',
            'Never have I ever succumbed to slumber amidst a lecture.',
            'Never have I ever vanished from another’s presence without a word.',
            'Never have I ever shed a tear while witnessing a mortal tale.',
            'Never have I ever peered into the digital path of a former companion.',
        ];
        
        return reply(
            `📜 *Celestial Truths*\n\n` +
            `_“${truths[Math.floor(Math.random() * truths.length)]}”_`
        );
    }
};
