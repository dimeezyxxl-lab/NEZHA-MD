/**
 * .approve all          — approve every pending join request
 * .approve <N>          — approve only the first N pending requests
 * .approve              — show current pending count and usage
 */

async function approveInBatches(sock, from, ids, batchSize = 50) {
    let approved = 0;
    const failed = [];
    for (let i = 0; i < ids.length; i += batchSize) {
        const chunk = ids.slice(i, i + batchSize);
        try {
            const res = await sock.groupRequestParticipantsUpdate(from, chunk, 'approve');
            if (Array.isArray(res)) {
                approved += res.filter(r => String(r.status) === '200' || r.status === 200).length;
            } else {
                approved += chunk.length;
            }
        } catch (err) {
            failed.push({ chunk, error: err.message });
        }
    }
    return { approved, failed };
}

module.exports = {
    name: 'approve',
    description: 'Approve pending group join requests (.approve all | .approve <N>)',
    category: 'admin',

    async execute({ sock, reply, args, from, isGroup, isAdmin }) {
        if (!isGroup) return reply('⚔️ This battlefield is restricted; this command only works within groups!');
        if (!isAdmin) return reply('🛡️ *Celestial Decree!*\n\n❌ Only those with administrative authority may command the Lotus Prince.');

        let pending;
        try {
            pending = await sock.groupRequestParticipantsList(from);
        } catch (err) {
            return reply(`❌ The heavens are blocked: ${err.message}`);
        }

        const total = pending?.length || 0;

        if (!args[0]) {
            return reply(
                `📋 *Pending petitions for entry:* ${total}\n\n` +
                `*Divine Commands:*\n` +
                `• *.approve all* — Grant entry to all petitioners\n` +
                `• *.approve <N>* — Grant entry to N petitioners`
            );
        }

        if (total === 0) return reply('✅ No petitioners currently await judgment.');

        const arg = args[0].toLowerCase();
        let take;
        if (arg === 'all') {
            take = total;
        } else {
            const n = parseInt(arg, 10);
            if (!Number.isFinite(n) || n <= 0) {
                return reply('❌ Invalid count. Usage: *.approve all* or *.approve <number>*');
            }
            take = Math.min(n, total);
        }

        const ids = pending.slice(0, take).map(r => r.jid);
        await reply(`⏳ The Lotus Prince is granting entry to *${ids.length}* of *${total}* petitioners...`);

        const { approved, failed } = await approveInBatches(sock, from, ids);

        let summary = `✅ *Judgment complete.*\n\nRequested: *${ids.length}*\nApproved: *${approved}*\nRemaining pending: *${total - approved}*`;
        if (failed.length) {
            summary += `\nDisturbance in the heavens: ${failed.length} batch failures\nError: ${failed[0].error}`;
        }
        await reply(summary);
    }
};
