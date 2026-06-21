/**
 * gameLobby.js — Chamber of Active Trials
 * ─────────────────────────────────────────────────────────────────────────────
 * A celestial registry maintained by the Lotus Prince, tracking the active 
 * challenges currently unfolding within the temple.
 */
'use strict';

// chatId → { kind: 'wcg'|'ttt', addPlayer(jid)→{ok,reason,started?}, hasPlayer(jid)→bool, isFull()→bool }
const activeTrials = new Map();

/**
 * Open a new trial within the Chamber.
 */
function open(chatId, kind, handle) {
    activeTrials.set(chatId, { kind, ...handle });
}

/**
 * Conclude a trial, clearing it from the Chamber.
 */
function close(chatId) {
    activeTrials.delete(chatId);
}

/**
 * Retrieve the status of a trial currently active in the Chamber.
 */
function get(chatId) {
    return activeTrials.get(chatId) || null;
}

module.exports = { open, close, get };
