/**
 * Compliment — Bestow a celestial blessing
 * Usage: .compliment @user
 */

const blessings = [
    "Your spirit shines brighter than a thousand stars.",
    "Your presence brings tranquility to the chaos of the mortal realm.",
    "The heavens favor your kindness and grace.",
    "Your heart possesses the purity of a blossoming lotus.",
    "Like the morning dew, your soul refreshes all who encounter you.",
    "You carry the strength of the mountains and the wisdom of the skies.",
    "Your resolve is as unyielding as the celestial firmament.",
    "Truly, you are a marvel of creation.",
    "Your laughter echoes like sweet chimes across the heavens.",
    "You illuminate the path for those lost in the shadow.",
    "Your benevolence is noted by the gods themselves.",
    "The cosmos celebrates your existence today.",
    "You are a treasure etched into the tapestry of eternity.",
    "Your friendship is a bond forged in celestial light.",
    "You are a pillar of virtue in an ever-changing world."
];

module.exports = {
    name: 'compliment',
    aliases: ['praise', 'nice', 'bless'],
    description: 'Bestow a celestial blessing upon someone',
    category: 'fun',
    async execute({ msg, reply, args }) {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        let targetUser = mentioned[0] || quotedParticipant;
        
        if (!targetUser && args.length > 0) {
            const input = args[0].replace(/[^0-9]/g, '');
            if (input) targetUser = input + '@s.whatsapp.net';
        }

        const blessing = blessings[Math.floor(Math.random() * blessings.length)];

        if (targetUser) {
            reply(
                `✨ *Celestial Blessing*\n\n` +
                `@${targetUser.split('@')[0]}, ${blessing}`,
                { mentions: [targetUser] }
            );
        } else {
            reply(`✨ *Celestial Blessing*\n\n${blessing}`);
        }
    }
};
