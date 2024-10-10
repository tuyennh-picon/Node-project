class AuthController {
    signUp = async (req, res, next) => {
        try {
            console.log('test')

            return res.status(201).json({
                code: '201',
                metadat: {userid: 1}
            });
        } catch (error) {
            console.error(error);
        }
    
    }

}


module.exports = new AuthController();