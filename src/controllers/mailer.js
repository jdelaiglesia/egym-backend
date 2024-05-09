const {
  service_RegisterEmail,
  service_MembershipEmail,
  service_UserOrderEmail,
} = require("../services/NodeMaillerService");

const sendRegisterEmail = async (req, res) => {
  const { body } = req;
  try {
    await service_RegisterEmail(body.email);
    res
      .status(200)
      .json({ message: "Correo de registro enviado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendMembershipEmail = async (req, res) => {
  const { body } = req;
  try {
    await service_MembershipEmail(body);
    res
      .status(200)
      .json({ message: "Correo de membresía enviado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendOrderEmail = async (req, res) => {
  const { body } = req;
  try {
    await service_UserOrderEmail(body)
    res.status(200).json({message:"Correo de compra enviado exitosamente"})
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
module.exports = { sendRegisterEmail, sendMembershipEmail,sendOrderEmail };
