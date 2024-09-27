const User = require("../models/users");
const statusCodes = require("http-status-codes");

const login = async (req, res) => {
    const { email, password } = req.body;

  
    if (!email || !password) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: "Input email and password" });
    }


    const user = await User.findOne({ email });


    if (!user) {
        return res.status(statusCodes.UNAUTHORIZED).json({ error: "Please input correct user details" });
    }


    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
        return res.status(statusCodes.UNAUTHORIZED).json({ error: "Authentication failed" });
    }

   
    const jwtToken = user.createJWT();

  
    return res.status(statusCodes.OK).json({
        user: {
            name: user.name
        
        },
        jwtToken
    });
};

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
        return res.status(statusCodes.BAD_REQUEST).json({ error: "Please provide all required fields: name, email, and password" });
    }

    try {
       
        const _user = await User.create({ name, email, password });

       
        const jwtToken = _user.createJWT();

        
        return res.status(statusCodes.CREATED).json({
            user: { name: _user.name },
            token: jwtToken,
        });
    } catch (error) {
        console.log(error);
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error during sign up" });
    }
};

module.exports = { login, signUp };
