const crypto = require('crypto');

function resetToken() {
    return crypto.randomBytes(20).toString('hex');
}

module.exports = {resetToken}