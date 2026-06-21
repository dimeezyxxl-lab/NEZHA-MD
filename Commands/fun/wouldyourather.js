/**
 * WouldYouRather — Pose a Celestial Dilemma
 * Usage: .wyr
 */

module.exports = {
    name: 'wouldyourather',
    aliases: ['wyr', 'dilemma', 'choice'],
    description: 'Pose a profound celestial dilemma to those gathered.',
    category: 'fun',
    async execute({ reply }) {
        const dilemmas = [
            'Would you rather possess the power to *walk unseen* through the realms or *soar above* the clouds?',
            'Would you rather face *one hundred adversaries the size of common fowl* or *a single titan-sized beast*?',
            'Would you rather *behold the tapestry of the future* or *mend the fraying threads of the past*?',
            'Would you rather *command the tongues of all nations* or *master the divine resonance of every instrument*?',
            'Would you rather *transcend space in a heartbeat* or *command the very flow of time to stand still*?',
        ];
        
        return reply(
            `🤔 *Celestial Dilemma*\n\n` +
            `_${dilemmas[Math.floor(Math.random() * dilemmas.length)]}_`
        );
    }
};
