/**
 * Roast — Deliver a Celestial Scourge
 * Usage: .roast @user
 */

const celestialScourges = [
    "You're like a dark cloud; when you disappear, the heavens shine brighter.",
    "I would agree with you, but then we would both be residing in error.",
    "You are living proof that the celestial cycle can indeed go in reverse.",
    "I am truly jealous of those who remain unaware of your existence.",
    "You are much like an unfinished software update—whenever I see you, I think, 'Not now'.",
    "I would explain this wisdom to you, but I have left my mortal tools elsewhere.",
    "You are not unintelligent; you merely suffer from a misalignment of thoughts.",
    "If laughter were truly the ultimate medicine, your countenance would be curing the entire world.",
    "You are the reason the celestial gene pool is in dire need of a vigilant lifeguard.",
    "I am not casting a judgment; I am merely observing your essence.",
    "If I were granted a coin for every moment you spoke with clarity, I would be destitute.",
    "You are not unsightly; you are simply not your own type.",
    "You bring as much joy as a stone cast into the abyss.",
    "I would teach you the path of the gods, but you seem quite content in the mud.",
    "Your presence is a testament to the fact that even the heavens have their trials."
];

module.exports = {
    name: 'roast',
    aliases: ['burn', 'insult', 'scourge'],
    description: 'Deliver a playful celestial scourge to an unworthy soul.',
    category: 'fun',
    async execute({ sock, msg, from, reply, args, isGroup }) {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        let targetUser = mentioned[0] || quotedParticipant;
        
        if (!targetUser && args.length > 0) {
            const input = args[0].replace(/[^0-9]/g, '');
            if (input) targetUser = input + '@s.whatsapp.net';
        }

        const scourge = celestialScourges[Math.floor(Math.random() * celestialScourges.length)];

        if (targetUser) {
            return reply(
                `🔥 *Celestial Scourge*\n\n` +
                `@${targetUser.split('@')[0]}, ${scourge}`,
                { mentions: [targetUser] }
            );
        } else {
            return reply(`🔥 *Celestial Scourge*\n\n${scourge}`);
        }
    }
};
