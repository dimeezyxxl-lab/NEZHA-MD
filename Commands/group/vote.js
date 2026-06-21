/**
 * VoteKick — Initiate a Celestial Banishment
 * Usage: .votekick @user
 */

const voteKicks = new Map();

module.exports = {
    name: 'votekick',
    aliases: ['vkick', 'votek', 'banish'],
    description: 'Initiate a Celestial Banishment vote to remove a disruptive soul.',
    category: 'group',
    async execute({ sock, msg, from, reply, args, isGroup }) {
        if (!isGroup) {
            return reply('👥 *This command governs group sanctuaries.* Use it within a group domain.');
        }

        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant;
        
        let targetUser = mentioned[0] || quotedParticipant;
        
        if (!targetUser && args.length > 0) {
            const input = args[0].replace(/[^0-9]/g, '');
            if (input) targetUser = input + '@s.whatsapp.net';
        }

        if (!targetUser) {
            return reply(
                `🗳️ *Initiate Celestial Banishment*\n\n` +
                `Usage: .votekick @user\n` +
                `Or reply to a message from the target with .votekick`
            );
        }

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;
            
            // Check if target is a Guardian
            const targetParticipant = participants.find(p => p.id === targetUser);
            if (targetParticipant && (targetParticipant.admin === 'admin' || targetParticipant.admin === 'superadmin')) {
                return reply('❌ *The heavens forbid:* Cannot initiate banishment against a Guardian.');
            }

            const requiredVotes = Math.ceil(participants.length / 3);
            const voteKey = `${from}_${targetUser}`;
            
            if (!voteKicks.has(voteKey)) {
                voteKicks.set(voteKey, new Set());
            }
            
            const votes = voteKicks.get(voteKey);
            const voter = msg.key.participant || msg.key.remoteJid;
            
            if (votes.has(voter)) {
                return reply('❌ *Your intent is already recorded:* You have already cast your vote.');
            }
            
            votes.add(voter);
            
            const userNumber = targetUser.split('@')[0];
            
            if (votes.size >= requiredVotes) {
                await sock.groupParticipantsUpdate(from, [targetUser], 'remove');
                voteKicks.delete(voteKey);
                reply(
                    `🚫 *Celestial Banishment Confirmed*\n\n` +
                    `@${userNumber} has been removed from the sanctuary.\n` +
                    `Consensus: ${votes.size}/${requiredVotes} votes met.`,
                    { mentions: [targetUser] }
                );
            } else {
                reply(
                    `🗳️ *Celestial Banishment Vote*\n\n` +
                    `Target: @${userNumber}\n` +
                    `Current Consensus: ${votes.size}/${requiredVotes}\n\n` +
                    `_Cast your vote to confirm the Banishment by invoking .votekick @${userNumber}_`,
                    { mentions: [targetUser] }
                );
            }
        } catch (err) {
            reply('❌ *Celestial Banishment failed:* The order of the sanctuary could not be enforced.');
        }
    }
};
