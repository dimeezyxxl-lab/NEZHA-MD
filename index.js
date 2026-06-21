#!/usr/bin/env node
// Load .env if present (no hard dependency)
try { require('dotenv').config(); } catch {}

/**
 * NEZHA MD v1 — The Lotus Prince
 * Entry Point
 *
 * Deploy on a panel (Pterodactyl / VPS). On first boot the console will
 * prompt for a WhatsApp number and print an 8-character pairing code.
 * Enter that code inside WhatsApp → Linked devices → Link with phone
 * number. Sessions persist in ./sessions and auto-reconnect on restart.
 */

const readline       = require('readline');
const chalk          = require('chalk');
const commandLoader  = require('./utils/commandLoader');
const config         = require('./config');
const sessionManager = require('./libs/sessionManager');

console.log(chalk.red(`
╔════════════════════════════════════════════════════════════════╗
║                         NEZHA MD v1.0                          ║
║               The Lotus Prince - WhatsApp Bot                  ║
╚════════════════════════════════════════════════════════════════╝
`));

function ask(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

async function pairFlow() {
    while (true) {
        const raw = await ask(chalk.cyan('\n[NEZHA-PAIR] Enter WhatsApp number (e.g. 2348161199331), or blank to skip: '));
        if (!raw) return;
        const number = raw.replace(/[^0-9]/g, '');
        if (number.length < 8) { console.log(chalk.red('[NEZHA-PAIR] Invalid number, try again.')); continue; }

        console.log(chalk.yellow(`[NEZHA-PAIR] The Lotus Prince is requesting a code for ${number}...`));
        const result = await sessionManager.createSession(number);
        if (!result.success) {
            console.log(chalk.red(`[NEZHA-PAIR] Disturbance detected: ${result.error}`));
            continue;
        }
        if (result.code) {
            console.log(chalk.green.bold(`\n[NEZHA-PAIR] Celestial Code: ${result.code}`));
            console.log(chalk.cyan('[NEZHA-PAIR] Open WhatsApp → Linked Devices → Link with phone number → enter the code above.\n'));
        } else {
            console.log(chalk.green(`[NEZHA-PAIR] ${number} is already bound to the Lotus.`));
        }

        const more = await ask(chalk.cyan('[NEZHA-PAIR] Bind another number? (y/N): '));
        if (more.toLowerCase() !== 'y') return;
    }
}

async function main() {
    console.log(chalk.yellow('[NEZHA-SYSTEM] Loading celestial commands...'));
    commandLoader.loadCommands();
    console.log(chalk.green('[NEZHA-SYSTEM] Commands are ready!'));

    console.log(chalk.yellow('[NEZHA-SYSTEM] Restoring divine sessions...'));
    await sessionManager.loadExistingSessions();

    const active = (sessionManager.sessions && sessionManager.sessions.size) || 0;
    console.log(chalk.green(`[NEZHA-SYSTEM] ${active} soul(s) bound to the lotus.`));

    // Auto-pair using config.pairNumber (or PAIR_NUMBER env override)
    const pairNumberRaw = (process.env.PAIR_NUMBER || config.pairNumber || '').toString();
    const pairNumber = pairNumberRaw.replace(/[^0-9]/g, '');

    // ── SESSION_ID short-circuit ────────────────────────────────────
    const sessionIdRaw = (process.env.SESSION_ID || config.sessionId || '').toString().trim();
    let sessionIdUsed = false;

    if (sessionIdRaw && pairNumber && pairNumber.length >= 8) {
        try {
            const fs   = require('fs');
            const path = require('path');
            const sessionDir = path.resolve(process.cwd(), 'sessions', pairNumber);
            const credsFile  = path.join(sessionDir, 'creds.json');

            if (fs.existsSync(credsFile)) {
                console.log(chalk.green(`[NEZHA-SESSION] Divine energy present for ${pairNumber}; keeping it.`));
                sessionIdUsed = true;
            } else {
                const decoded = Buffer.from(sessionIdRaw, 'base64').toString('utf8');
                JSON.parse(decoded);
                fs.mkdirSync(sessionDir, { recursive: true });
                fs.writeFileSync(credsFile, decoded, 'utf8');
                console.log(chalk.green(`[NEZHA-SESSION] Session restored from Divine ID. Skipping pairing.`));
                sessionIdUsed = true;
            }

            const result = await sessionManager.startSession(pairNumber, false);
            if (result && result.success === false) {
                console.log(chalk.red(`[NEZHA-SESSION] Connection failed: ${result.error}`));
            }
        } catch (e) {
            console.log(chalk.red(`[NEZHA-SESSION] Invalid ID (${e.message}). Falling back to manual ritual.`));
            sessionIdUsed = false;
        }
    } else if (sessionIdRaw && (!pairNumber || pairNumber.length < 8)) {
        console.log(chalk.red('[NEZHA-SESSION] SESSION_ID is set but pairNumber is missing.'));
    }

    if (!sessionIdUsed) {
        if (pairNumber && pairNumber.length >= 8) {
            const alreadyLinked = sessionManager.sessions && sessionManager.sessions.has(pairNumber);
            if (alreadyLinked) {
                console.log(chalk.green(`[NEZHA-PAIR] ${pairNumber} is already bound.`));
            } else {
                console.log(chalk.yellow(`[NEZHA-PAIR] Auto-binding ${pairNumber}...`));
                const result = await sessionManager.createSession(pairNumber);
                if (result.code) {
                    console.log(chalk.green.bold(`\n[NEZHA-PAIR] ╔══════════════════════════════════════╗`));
                    console.log(chalk.green.bold(`[NEZHA-PAIR] ║  CELESTIAL CODE: ${result.code}            `));
                    console.log(chalk.green.bold(`[NEZHA-PAIR] ╚══════════════════════════════════════╝\n`));
                } else if (!result.success) {
                    console.log(chalk.red(`[NEZHA-PAIR] Failed: ${result.error}`));
                }
            }
        } else if (process.stdin.isTTY) {
            console.log(chalk.cyan('[NEZHA-INFO] Manual intervention required.'));
            await pairFlow();
        }
    }

    console.log(chalk.green('\n[NEZHA-SYSTEM] The Lotus Prince is active. Press Ctrl+C to stop.\n'));
}

main().catch((err) => {
    console.error(chalk.red('[NEZHA-ERROR] Fatal incident:'), err.message);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.error(chalk.red('[NEZHA-ERROR] Uncaught Exception:'), err.message);
});
process.on('unhandledRejection', (reason) => {
    console.error(chalk.red('[NEZHA-ERROR] Unhandled Rejection:'), reason);
});
process.on('SIGINT',  () => { console.log(chalk.red('\n[NEZHA-SYSTEM] Returning to the heavens...')); process.exit(0); });
process.on('SIGTERM', () => { console.log(chalk.red('\n[NEZHA-SYSTEM] Returning to the heavens...')); process.exit(0); });
