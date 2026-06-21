/**
 * Match — Observe the Celestial Stadium
 * Usage: .match [team or country]
 */

const API = 'https://apis.prexzyvilla.site/sports/football?detail=&category=&id=&lang=';

function fmtTime(ts) {
    if (!ts) return 'TBD';
    try {
        const d = new Date(Number(ts));
        return d.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
    } catch { return 'TBD'; }
}

function statusOf(m) {
    if (m.state === -1) return '✅ Concluded';
    if (m.state === 0) return '⏳ Awaiting';
    return '🔴 IN DIVINE PROGRESS';
}

function fmtMatch(m) {
    const score = (m.homeScore != null && m.awayScore != null)
        ? `${m.homeScore} - ${m.awayScore}`
        : 'vs';
    const ht = (m.homeHalfScore != null && m.awayHalfScore != null && m.state !== 0)
        ? ` (HT ${m.homeHalfScore}-${m.awayHalfScore})` : '';
    return [
        `🏆 *${m.leagueEn || 'Match'}*`,
        `⚽ ${m.homeName} ${score} ${m.awayName}${ht}`,
        `✨ ${statusOf(m)}`,
        `🕐 ${fmtTime(m.matchTime_t || m.startTime_t)}`,
        m.location ? `🏟️ ${m.location}` : null
    ].filter(Boolean).join('\n');
}

async function fetchJson(url, ms = 12000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    try {
        const r = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'Nezha-md/3.0' } });
        return await r.json();
    } finally { clearTimeout(t); }
}

module.exports = {
    name: 'match',
    aliases: ['livematch', 'football', 'stadium', 'matches'],
    description: 'Observe the celestial stadium for current football matches.',
    category: 'fun',
    async execute({ sock, msg, from, reply, args }) {
        const query = args.join(' ').trim().toLowerCase();

        let payload;
        try {
            payload = await fetchJson(API);
        } catch (err) {
            return reply('⚠️ The celestial archives are currently obscured. Try again shortly.');
        }

        if (!payload || payload.status === false) {
            return reply(`⚠️ Celestial error: ${payload?.error || 'The spirits are silent'}`);
        }

        const matches = Array.isArray(payload?.data?.matches) ? payload.data.matches : [];
        if (!matches.length) {
            return reply('⚽ No celestial matches are currently manifesting.');
        }

        let filtered = matches;
        if (query) {
            filtered = matches.filter(m => {
                const hay = [
                    m.homeName, m.awayName, m.leagueEn,
                    m.countryEn, m.teamLink
                ].filter(Boolean).join(' ').toLowerCase();
                return hay.includes(query);
            });
            if (!filtered.length) {
                return reply(`🔍 No celestial events found matching "*${query}*".`);
            }
        }

        const top = filtered.slice(0, 10);
        const header = query
            ? `⚽ *Celestial Stadium: "${query}"* (${filtered.length} found, showing ${top.length})`
            : `⚽ *Celestial Stadium — ${top.length} of ${matches.length} matches*`;
        const body = top.map(fmtMatch).join('\n\n');
        const text = `${header}\n\n${body}`;

        const logo = top[0]?.homeLogoUrl || top[0]?.leagueLogo;
        if (logo) {
            try {
                await sock.sendMessage(from, { image: { url: logo }, caption: text }, { quoted: msg });
                return;
            } catch { /* fall through */ }
        }
        return reply(text);
    }
};
