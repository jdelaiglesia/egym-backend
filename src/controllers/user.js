const User = require('../models/User')

const getUsers = (req, res) => {
    User.find({deleted: false})
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ message: error.message}))
}

const getUserByEmail = (req, res) => {
    const {email} = req.params
    User.findOne({
        email: email,
        deleted: { $ne: true },
    })
    .then(data => {
        if (data){ res.status(200).json(data)} 
        else{ res.status(404).json({message: "User not found"})}})
    .catch(error => res.status(500).json({ message: error.message}))
}

const postUser = async (req, res) => {
    const {name, last_name, email, password, dni, address, age, rank, phone_number, is_member} = req.body

    if(!name || !last_name || !email || !password || !dni || !address || !age || !rank || !phone_number ){
        return res.status(404).json({ message: "Incomplete information"})
    }
    try {
        let user = await User.findOne({
            email: email,
            deleted: { $ne: true }
            })
        if(user && !user.deleted){ return res.status(404).json({message: "User already exists"})}
        else{
            const user = new User({ 
                name, 
                last_name, 
                email, 
                password, 
                dni, 
                address, 
                age, 
                rank, 
                phone_number, 
                is_member : is_member? true : false,
                })
            await user.save()
            return res.status(200).json(user) 
            }
    } catch (error){
        return res.status(500).json({ message: error.message})
    }
}

const putUser = async (req, res) => {
    try {
        const {name, last_name, email, password, dni, address, age, rank, phone_number, is_member } = req.body
        const userId = req.params.id
        if(!name || !last_name || !email || !password || !dni || !address || !age || !rank || !phone_number || !is_member ){
            return res.status(404).json({ message: "Incomplete information"})
        }
        if(!userId){ return res.status(404).json({ message: "User ID is required"})}
        const user = await User.findById(userId)
        if(!user || user.deleted){ return res.status(404).json({ message: "User not found"})}

        user.name = name; 
        user.last_name = last_name; 
        user.email = email; 
        user.password = password; 
        user.dni = dni; 
        user.address = address; 
        user.age = age; 
        user.rank = rank; 
        user.phone_number = phone_number; 
        user.is_member = is_member;

        await user.save()
        
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        if(!user || user.deleted){
            return res.status(404).json({ message: "User not found"})
        }

        user.deleted = true
        await user.save()

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUserByEmail,
    postUser,
    putUser,
    deleteUser
}