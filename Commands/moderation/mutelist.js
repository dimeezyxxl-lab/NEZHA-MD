/**
 * MuteList — Consult the Vow of Silence Registry
 * Usage: .mutelist
 */

const database = require('../../utils/database');

function formatTimeRemaining(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

module.exports = {
    name: 'mutelist',
    aliases: ['mutedusers', 'listmutes', 'vow', 'silenceregistry'],
    description: 'Consult the Vow of Silence Registry.',
    category: 'moderation',
    async execute({ reply, isGroup, from, database }) {
        if (!isGroup) return reply('❌ _This command manifests only within the bounds of a group._');

        try {
            const mutedUsers = database.getMutedUsers(from);
            
            if (!mutedUsers || Object.keys(mutedUsers).length === 0) {
                return reply(
                    `🔇 *VOW OF SILENCE REGISTRY*\n\n` +
                    `_The registry is empty; all voices in the sanctuary are currently free._`
                );
            }

            const now = Date.now();
            let response = `🔇 *VOW OF SILENCE REGISTRY*\n\n`;
            let count = 0;

            for (const [userId, expiresAt] of Object.entries(mutedUsers)) {
                const timeRemaining = expiresAt - now;
                if (timeRemaining > 0) {
                    const userNumber = userId.split('@')[0];
                    response += `${++count}. @${userNumber}\n`;
                    response += `   ⏱️ Silence remains: ${formatTimeRemaining(timeRemaining)}\n\n`;
                }
            }

            if (count === 0) {
                return reply(
                    `🔇 *VOW OF SILENCE REGISTRY*\n\n` +
                    `_The registry is empty; all voices in the sanctuary are currently free._`
                );
            }

            response += `_Invoke voice restoration with: .unmuteuser @user_\n\n> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`;
            reply(response);

        } catch (err) {
            reply('❌ *Registry access failed:* The scrolls are obscured.');
        }
    }
};
