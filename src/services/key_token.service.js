'use strict'

const { filter } = require("compression");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async({userId, publicKey, privateKey, refreshToken}) => {
        try {
            // const token  = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKey,
            //     privateKey: privateKey,
            // });


            // return token ? token.publicKey : null
            const filter = {user: userId}
            const update = {
                 publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }

            const options = {upsert: true, new: true}
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey: null
        } catch(error) {
            console.log('error', error)
            return error
        }
    }
}

module.exports = KeyTokenService