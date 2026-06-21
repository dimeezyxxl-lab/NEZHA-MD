/**
 * Seer — Divining the threads of destiny
 * Usage: .seer @user
 */

module.exports = {
    name: 'seer',
    aliases: ['hack', 'divine', 'destiny'],
    description: 'Peer into the threads of another spirit’s destiny.',
    category: 'fun',
    async execute({ sock, msg, from, reply, args }) {
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        let targetUser = mentioned[0] || quotedParticipant;
        
        if (!targetUser && args.length > 0) {
            const input = args[0].replace(/[^0-9]/g, '');
            if (input) targetUser = input + '@s.whatsapp.net';
        }

        if (!targetUser) {
            return reply('Usage: .seer @user or reply to a user whose destiny you wish to read.');
        }

        const userNumber = targetUser.split('@')[0];
        const steps = [
            '✨ *Initiating celestial resonance...*',
            '🧘 *Focusing spiritual energy...*',
            '📜 *Unraveling the scrolls of time...*',
            '🌌 *Connecting to the cosmic weave...*',
            '💫 *Analyzing karmic patterns...*',
            '🔮 *Observing trial outcomes...*',
            '⚔️ *Interpreting the warrior’s path...*',
            '🎭 *Vision complete!*'
        ];

        let currentMsg = await reply(`👁️ *Divining the destiny of @${userNumber}...*\n\n${steps[0]}`, { mentions: [targetUser] });

        for (let i = 1; i < steps.length; i++) {
            await new Promise(r => setTimeout(r, 1500));
            try {
                currentMsg = await sock.sendMessage(from, {
                    text: `👁️ *Divining the destiny of @${userNumber}...*\n\n${steps[i]}`,
                    edit: currentMsg.key,
                    mentions: [targetUser]
                });
            } catch (e) {
                currentMsg = await sock.sendMessage(from, {
                    text: `👁️ *Divining the destiny of @${userNumber}...*\n\n${steps[i]}`,
                    mentions: [targetUser]
                });
            }
        }

        await new Promise(r => setTimeout(r, 1000));
        reply(
            `📜 *THE VISION IS CLEAR* 📜\n\n` +
            `Target: @${userNumber}\n` +
            `Celestial Status: ✅ Threads Observed\n` +
            `Karmic Weight: 69,000 Eons\n` +
            `Spiritual Fortune: 4.20 Lotus Petals\n\n` +
            `> *The heavens speak only in riddles!* 🎐`,
            { mentions: [targetUser] }
        );
    }
};
