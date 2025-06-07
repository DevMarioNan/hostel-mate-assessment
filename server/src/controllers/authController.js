
const {createUser, findUser} = require("../services/authServices");


const register = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'email and password are required'});
    }

    try {
        const newUser = await createUser(email, password);
        if (newUser.error) {
            return res.status(400).json({message: newUser.error});
        }
        res.status(201).json({message: newUser.message, userId: newUser.userId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
    

}

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'email and password are required'});
    }

    try {
        const user = await findUser(email, password);
        if (user.error) {
            return res.status(400).json({message: user.error});
        }
        res.status(200).json({token: user.token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {
    register,
    login
};