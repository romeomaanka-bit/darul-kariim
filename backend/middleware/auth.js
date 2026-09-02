const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Ka soo qaado token-ka headers-ka
            token = req.headers.authorization.split(' ')[1];

            // Xaqiiji (Verify) token-ka
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Ka hel user-ka database-ka adigoo ka reebaya password-ka
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Isticmaalaha Token-kan leh lama helin' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Fadlan dib ugu soo gal, Token-ku waa qalad ama waa dhacay' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Lama helin wax Token ah, adigoo aan soo gelin ma isticmaali kartid' });
    }
};

module.exports = { protect };