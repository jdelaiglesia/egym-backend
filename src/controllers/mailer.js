const { registerMail } = require("../config/nodeMailer");

const sendRegister = async (req, res) => {
    try {
        await registerMail();
        res.status(200).json({ message: "correo enviado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendRegister };
