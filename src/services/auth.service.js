const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");

const roles = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    
};

class AuthService {

    static signUp = async (name, email, password) => {
        try {
            const hoderShop = await shopModel.findOne({
                email: email
            }).lean();

            if (hoderShop) {
                return {
                    code: 401,
                    message: 'Email already in use'
                };
            }

            const passwordHashed = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, passwordHashed, roles:[roles.SHOP]
            });

            if (newShop) {
                
            }


        } catch (err) {
            return {
                code: 401,
                message: err.message,
                status: err.status
            };
        }
    }
}

module.exports = AuthService;