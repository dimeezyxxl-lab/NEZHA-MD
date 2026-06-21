/**
 * NEZHA MD - The Lotus Prince configuration
 * Mythological Multi-User WhatsApp Bot
 */

module.exports = {
    botName: 'NEZHA MD',
    version: '1.0.0',
    prefix: '.',

    // ============================================
    // COSMIC ASSETS
    // ============================================
    assets: {
        menuVideo: './assets/nezha_power.mp4',
        menuThumb: './assets/lotus_prince.jpg'
    },

    // ============================================
    // DIVINE OWNER INFO
    // ============================================
    ownerNumber: process.env.OWNER_NUMBER || '2348161199331',
    pairNumber:  process.env.PAIR_NUMBER  || '2349022370895',

    // ============================================
    // HEAVENLY SESSION ID
    // ============================================
    sessionId: process.env.SESSION_ID || '',

    owner: {
        name:     'Xyz',
        number:   process.env.OWNER_NUMBER || '2348161199331',
        github:   'https://github.com/dimeezy-lab/Nezha-md',
        channel:  'https://whatsapp.com/channel/0029Vb7sxbjHVvTcUSLI4M0L',
        telegram: 't.me/Dimeezy1',
    },

    sessions: {
        folder: './sessions/',
        autoReconnect: true
    },

    // ============================================
    // BATTLEFIELD (GROUP) DEFAULTS
    // ============================================
    groupDefaults: {
        antilink: false,
        antilinkAction: 'delete',
        antimention: false,
        antimentionMode: 'normal',
        antimentionAction: 'warn',
        antimentionMax: 5,
        welcome: false,
        welcomeMessage: '🔥 The Lotus Prince welcomes @user to the battlefield: @group!',
        goodbye: false,
        goodbyeMessage: '🌪️ @user has retreated from the heavens of @group.',
        mute: false
    },

    apiKeys: {
        openai: process.env.OPENAI_API_KEY || '',
        weather: process.env.WEATHER_API_KEY || ''
    },

    // ============================================
    // DIVINE COMMAND RESPONSES
    // ============================================
    messages: {
        wait: '🔥 The Fire-Tipped Spear is preparing your request... stand by.',
        success: '✨ The Cosmic Wheel has turned; the command is fulfilled.',
        error: '🌪️ A disturbance in the celestial flow! The magic failed.',
        adminOnly: '🚫 Only those with the authority of the Heavens may command this.',
        groupOnly: '⚔️ This battlefield is restricted; only fight within group boundaries.',
        botAdminNeeded: '🚩 The Lotus Prince requires higher status (Admin) to manifest this power!'
    }
};
