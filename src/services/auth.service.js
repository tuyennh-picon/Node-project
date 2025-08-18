const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const KeyTokenService = require("./key_token.service");
const { createTokenPair } = require("../auth/auth.until");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { findByEmail } = require("./shop.service");

const roles = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    
};

class AuthService {

    static login = async({email, password, refeshToken =null}) => {
        const foundShop = await findByEmail({email});
        if (!foundShop) {
            throw new BadRequestError('Shop not found');
        }

        const matchedPassword = bcrypt.compare(password, foundShop.password);
        if(!matchedPassword) {
            throw new AuthFailureError('Auth err');
        }

        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');
        
        const tokens = await createTokenPair({
                    userId: foundShop._id,
                    email,
                },
                 publicKey,
                 privateKey
                );   

        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refeshToken: tokens.refeshToken
        })   
        return {
                shop: {
                    _id: foundShop._id,
                    name: foundShop.name,
                    email: foundShop.email
                }, 
                tokens
        }
    }

    static signUp = async (name, email, password) => {
        try {
            const hoderShop = await shopModel.findOne({
                email: email
            }).lean();

            if (hoderShop) {
                throw new BadRequestError('error shop already registered')
            }
            

            const passwordHashed = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password:passwordHashed, roles:[roles.SHOP]
            });

            if (newShop) {
                // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                //     modulusLength: 4096,
                //     publicKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     },
                //     privateKeyEncoding: {
                //         type: 'pkcs1',
                //         format: 'pem'
                //     }
                // })

                // const arr = new Uint8Array(64);
                const publicKey = crypto.randomBytes(64).toString('hex');
                const privateKey = crypto.randomBytes(64).toString('hex');
                
                console.log('a')
                const keyStore = await KeyTokenService.createKeyToken({
                     userId: newShop._id,
                     publicKey: publicKey,
                     privateKey: privateKey
                });
                if(!keyStore) {
                     return {
                        code: 401,
                        message: err.message,
                        status:  'error1'
                    };
                }

                const tokens = await createTokenPair({
                    userId: newShop._id,
                    email,
                },
                 publicKey,
                 privateKey
                );   

                return {
                    code: 201,
                    metadata: {
                        shop: {
                            _id: newShop._id,
                            name: newShop.name,
                            email: newShop.email
                        }, 
                        tokens
                    }
                }
             }

         return {
                    code: 200,
                    metadata: null
                }    

        } catch (err) {
            console.log(err)
            return {
                code: 401,
                message: err.message,
                status:  'error2'
            };
        }
    }
}

module.exports = AuthService;