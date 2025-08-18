
const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: '2 days'
        });
        const refeshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        });

        return {accessToken, refeshToken}
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    createTokenPair
}