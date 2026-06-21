/**
 * Update — Divine Synchronization
 * Usage: .update [check | force | restart]
 */

const fs            = require('fs');
const path          = require('path');
const https         = require('https');
const zlib          = require('zlib');
const { exec }      = require('child_process');
const { promisify } = require('util');
const execAsync     = promisify(exec);

const commandLoader = require('../../utils/commandLoader');

const REPO_URL      = 'https://github.com/pasquawisdom2007-beep/SUKUNA_MD.git';
const REPO_OWNER    = 'pasquawisdom2007-beep';
const REPO_NAME     = 'SUKUNA_MD';
const REPO_BRANCH   = 'main';
const TARBALL_URL   = `https://codeload.github.com/${REPO_OWNER}/${REPO_NAME}/tar.gz/refs/heads/${REPO_BRANCH}`;

const REPO_ROOT     = path.resolve(__dirname, '..', '..');

const PRESERVE = new Set(['sessions', 'data', 'node_modules', '.env', '.env.local', 'package-lock.json', 'bun.lock']);
const RESTART_REQUIRED_PATHS = ['index.js', 'config.js', 'lib/'];

let UPDATE_IN_PROGRESS = false;

// ── helpers ─────────────────────────────────────────────────────────────────
async function run(cmd, opts = {}) {
    return execAsync(cmd, { cwd: REPO_ROOT, timeout: opts.timeout || 120000, maxBuffer: 10 * 1024 * 1024, env: process.env, ...opts });
}

async function hasGit() {
    try {
        if (!fs.existsSync(path.join(REPO_ROOT, '.git'))) return false;
        await run('git --version', { timeout: 5000 });
        return true;
    } catch { return false; }
}

async function gitShortSha(ref = 'HEAD') {
    try { const { stdout } = await run(`git rev-parse --short ${ref}`); return stdout.trim(); } catch { return 'unknown'; }
}

async function gitCommitSubject(ref = 'HEAD') {
    try { const { stdout } = await run(`git log -1 --pretty=%s ${ref}`); return stdout.trim(); } catch { return ''; }
}

async function gitChangedFiles(from, to) {
    try { const { stdout } = await run(`git diff --name-only ${from} ${to}`); return stdout.split('\n').map(s => s.trim()).filter(Boolean); } catch { return []; }
}

async function ensureRemote() {
    try { await run('git remote get-url origin', { timeout: 5000 }); } catch { await run(`git remote add origin ${REPO_URL}`); }
}

function needsRestart(changed) { return changed.some(f => RESTART_REQUIRED_PATHS.some(p => p.endsWith('/') ? f.startsWith(p) : f === p)); }
function needsInstall(changed) { return changed.some(f => f === 'package.json' || f === 'package-lock.json' || f === 'bun.lock'); }

// ── Main command ────────────────────────────────────────────────────────────
module.exports = {
    name: 'update',
    aliases: ['pullupdate', 'gitpull', 'sync', 'synchronize'],
    description: 'Divine Synchronization: Align the sanctuary with the latest celestial code.',
    category: 'owner',
    ownerOnly: true,

    async execute({ reply, args }) {
        const mode = (args[0] || '').toLowerCase();

        if (UPDATE_IN_PROGRESS) return reply('⏳ _The sanctuary is already undergoing synchronization. Please wait._');
        UPDATE_IN_PROGRESS = true;

        const started = Date.now();
        try {
            await reply('🔄 *Initiating Divine Synchronization…*');

            const usingGit = await hasGit();

            // ── CHECK MODE ──
            if (mode === 'check') {
                if (!usingGit) return reply('ℹ️ _The local manifestation lacks a Git heartbeat. Synchronization requires manual intervention._');
                await ensureRemote();
                await run(`git fetch origin ${REPO_BRANCH}`);
                const local  = await gitShortSha('HEAD');
                const remote = await gitShortSha(`origin/${REPO_BRANCH}`);
                const subj   = await gitCommitSubject(`origin/${REPO_BRANCH}`);
                if (local === remote) return reply(`✅ *The sanctuary is already in perfect harmony.*\n_State: \`${local}\`_`);
                
                const changed = await gitChangedFiles('HEAD', `origin/${REPO_BRANCH}`);
                return reply(
                    `🆕 *New celestial manifestations available*\n\n` +
                    `• Current: \`${local}\`\n` +
                    `• Remote:  \`${remote}\` — _${subj || 'No insight provided'}_\n` +
                    `• Magnitude of change: ${changed.length} file(s)\n\n` +
                    `_Use .update to align, or .update restart to align and rebirth._`
                );
            }

            // ... (Git/Tarball logic proceeds)

            const restart = needsRestart(changed);
            const elapsed = ((Date.now() - started) / 1000).toFixed(1);

            await reply(
                `✅ *Divine Synchronization Complete* (${elapsed}s)\n\n` +
                `• Magnitude: ${changed.length} file(s) harmonized\n` +
                `• Reincarnation required: ${restart ? '⚠️ YES (Core architecture modified)' : 'no'}\n\n` +
                `> _𝗡𝗲𝘇𝗵𝗮-𝗺𝗱 · 𝗟𝗼𝘁𝘂𝘀 𝗣𝗿𝗶𝗻𝗰𝗲_`
            );

            if (mode === 'restart' || restart) {
                setTimeout(() => process.exit(0), 3000);
            }
        } catch (err) {
            await reply('❌ *Synchronization failed; the heavens are obscured.*');
        } finally {
            UPDATE_IN_PROGRESS = false;
        }
    },
};
