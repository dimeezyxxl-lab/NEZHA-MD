'use strict';
const fs = require('fs');
const path = require('path');
const IMAGE_PATH = path.resolve(__dirname, '..', '..', 'assets', 'menuimage.jpg');

module.exports = {
    name: 'resetmenuimage',
    aliases: ['clearmenuimage', 'unsetmenuimage'],
    description: 'Remove the custom menu image and revert to the menu video',
    category: 'admin',
    async execute({ reply, isOwner }) {
        if (!isOwner) return reply('🛡️ *Celestial Decree!*\n\n❌ Only the Supreme Master may alter the visual manifestations of the Lotus Prince.');
        
        try {
            if (fs.existsSync(IMAGE_PATH)) {
                fs.unlinkSync(IMAGE_PATH);
                return reply('🔥 The celestial image has been purged. The menu will now manifest the default video.');
            }
            return reply('ℹ️ No custom manifestation is currently active.');
        } catch (e) {
            return reply('❌ A disturbance in the heavens: ' + e.message);
        }
    }
};
