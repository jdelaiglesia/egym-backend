const { service_RegisterMail } = require("../services/NodeMaillerService");

const sendRegister = async (req, res) => {
    const {body} = req
    try {
        await service_RegisterMail(body.email);
        res.status(200).json({ message: "correo enviado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sendRegister };
