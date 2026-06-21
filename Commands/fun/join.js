/**
 * Join — Enroll in a celestial challenge
 * Usage: .join
 */
'use strict';

const lobbyRegistry = require('../../lib/gameLobby');

module.exports = {
    name:        'join',
    aliases:     ['enter', 'attend', 'partake'],
    description: 'Enroll in an active celestial challenge in this chat',
    usage:       '.join',
    category:    'fun',

    async execute({ sock, msg, from, sender, reply }) {
        const lobby = lobbyRegistry.get(from);
        if (!lobby) {
            return reply(`❌ *No celestial challenge is currently forming.* Initiate a challenge with *.wcg* or *.ttt*.`);
        }
        if (lobby.hasPlayer(sender)) {
            return reply(`✨ You have already pledged your spirit to the *${lobby.kind.toUpperCase()}* challenge.`);
        }
        if (lobby.isFull && lobby.isFull()) {
            return reply(`❌ *The ranks for this challenge are already filled.*`);
        }
        
        const res = await lobby.addPlayer(sender);
        
        if (res?.ok) {
            return await sock.sendMessage(from, {
                text: `🎮 @${sender.split('@')[0]} *has pledged to join the ${lobby.kind.toUpperCase()} challenge!*`,
                mentions: [sender],
            }, { quoted: msg });
        }
        
        if (res?.reason === 'already') return reply(`✨ You are already part of this assembly.`);
        if (res?.reason === 'full')    return reply(`❌ The ranks are full.`);
        if (res?.reason === 'closed')  return reply(`❌ The portal for this challenge has closed.`);
        
        return reply(`❌ The heavens cannot grant your request at this time.`);
    },
};
