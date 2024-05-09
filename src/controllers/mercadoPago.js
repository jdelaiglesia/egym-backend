require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const axios = require("axios");
const Sale = require("../models/Sale");

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { object } = require("joi");
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

let idPreference = "";

const createPreferenceMercadoPago = (req, res) => {
  const data = req.body;
 
  let items = data.products.map((product) => ({
    id: product._id,
    category_id: product.category,
    currency_id: "ARS",
    description: product.description,
    title: product.name,
    quantity: Number(product.quantity),
    unit_price: Number(product.price),
  }));
  

  const body = {
    items: items,
    payment_methods: {
      excluded_payment_methods: [],
      excluded_payment_types: [],
      installments: 12,
    },
    notification_url:
      "https://fea0-201-231-154-210.ngrok-free.app/api/datapayment?source_news=webhooks",
    statement_descriptor: "PF EGYM",
    external_reference: "Reference_1234",
    expires: false,
    expiration_date_from: "",
    expiration_date_to: "",
  };
 

  const preference = new Preference(client);
  preference
    .create({ body })
    .then((response) => {
     
      idPreference = response.id;

      let objProductsSale = data.products.map((product) => ({
        _id: product._id,
        quantity: Number(product.quantity),
      }));
      const user = data.idUser;

      const createSaleObj = {
        products: objProductsSale,
        //el id es el id de la preferencia el mismo de la variable al principio
        id: response.id,
        user: user,
      };

      axios.post("http://localhost:3001/api/sale", createSaleObj);
      res.status(200).json(response.id);
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          message:
            "ocurrio un error al crear la preferencia en el servidor" +
            error.message,
        });
    });
};

const getDataPayment = async (req, res) => {
  const payment = req.query;
  const paymentId = payment["data.id"];

  console.log(payment)
  console.log(paymentId)

  try {
    const response = await axios(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${client.accessToken}` },
      }
    );

    if (response.data.status === "approved") {
      await axios.put(`http://localhost:3001/api/sale/${idPreference}`);
    }
  
    res.status(200).send("OK");
  } catch (error) {
 
    res.status(500).send("ERROR");
  }
};

module.exports = {
  createPreferenceMercadoPago,
  getDataPayment,
};
