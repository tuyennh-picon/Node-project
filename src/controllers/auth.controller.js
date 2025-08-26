const { Created, SuccessResponse } = require("../core/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    signUp = async (req, res, next) => {

        console.log('pass', req.body.password)

        new Created({
            message: "Created oke ",
            metadata: await AuthService.signUp(
            req.body.name,
            req.body.email,
            req.body.password
        )
        }).send(res)
    }

    signIn = async (req, res, next) => {

        console.log('pass', req.body.password)

        new SuccessResponse({
            message: "Login oke",
            metadata: await AuthService.login(req.body)
        }).send(res)
    }

}


module.exports = new AuthController();