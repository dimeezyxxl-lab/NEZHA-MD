/**
 * .confirmkick — execute the pending .kickall request.
 * Must be sent by the same admin within 60s of .kickall.
 */
const pendingKicks = require('../../utils/pendingKicks');

async function removeInBatches(sock, from, ids, batchSize = 50) {
    let removed = 0;
    const failed = [];
    for (let i = 0; i < ids.length; i += batchSize) {
        const chunk = ids.slice(i, i + batchSize);
        try {
            await sock.groupParticipantsUpdate(from, chunk, 'remove');
            removed += chunk.length;
        } catch (err) {
            failed.push({ chunk, error: err.message });
        }
    }
    return { removed, failed };
}

module.exports = {
    name: 'confirmkick',
    description: 'Confirm and execute a pending .kickall',
    category: 'admin',

    async execute({ sock, reply, from, sender, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        const pending = pendingKicks.get(from);
        if (!pending) {
            return reply('🚩 No pending purge request found (or the window of judgment has expired). Initiate a new *.kickall* to proceed.');
        }
        if (pending.adminJid !== sender) {
            return reply('❌ Only the sovereign who issued the original *.kickall* can confirm this purge.');
        }

        try {
            const meta = await sock.groupMetadata(from);
            const botJid = (sock.user?.id || '').split(':')[0] + '@s.whatsapp.net';
            const targets = meta.participants
                .filter(p => !p.admin)
                .map(p => p.id)
                .filter(id => id !== sender && id !== botJid);

            pendingKicks.clear(from);

            if (targets.length === 0) return reply('✅ The battlefield is already clear.');

            await reply(`🚪 The Lotus Prince is purging *${targets.length}* souls from this realm...`);

            const { removed, failed } = await removeInBatches(sock, from, targets);

            let summary = `✅ *Divine purge complete.*\n\nPurged: *${removed}* / ${targets.length}`;
            if (failed.length) {
                summary += `\nDisturbance in the heavens: ${failed.length} batch failures`;
                summary += `\nError: ${failed[0].error}`;
            }
            await reply(summary);
        } catch (err) {
            reply(`❌ A disturbance in the heavens: ${err.message}`);
        }
    }
};
