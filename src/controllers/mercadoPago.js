require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const axios = require("axios");
const Sale = require("../models/Sale");
const DiscountCoupon = require("../models/DiscountCoupon");

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { object } = require("joi");
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

let idPreference = "";

const createPreferenceMercadoPago = async (req, res) => {
  try {
    const { products, idUser } = req.body;

    let coupon = req.body.coupon ? req.body.coupon : "";

    const couponDiscount = await DiscountCoupon.findOne({
      name: coupon.toUpperCase(),
      deleted: { $ne: true },
    });

    let items = products.map((product) => {
      if (!couponDiscount) {
        return {
          id: product._id,
          category_id: product.category,
          currency_id: "ARS",
          description: product.description,
          title: product.name,
          quantity: Number(product.quantity),
          unit_price: Number(product.price),
        };
      } else {
        const discount =
          (Number(product.price) * couponDiscount.percentage) / 100;

        return {
          id: product._id,
          category_id: product.category,
          currency_id: "ARS",
          description: product.description,
          title: product.name,
          quantity: Number(product.quantity),
          unit_price: Number(product.price) - discount,
        };
      }
    });

    const body = {
      items: items,
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },
      notification_url:
        "https://0fe7-201-231-154-210.ngrok-free.app/api/datapayment?source_news=webhooks",
      statement_descriptor: "PF EGYM",
      external_reference: "Reference_1234",
      expires: false,
      expiration_date_from: "",
      expiration_date_to: "",
      back_urls: {
        success: "https://www.localhost:3001/api",
        pending: "https://www.localhost:3001/api",
        failure: "https://www.localhost:3001/api",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    preference
      .create({ body })
      .then((response) => {
        idPreference = response.id;

        let objProductsSale = products.map((product) => ({
          _id: product._id,
          quantity: Number(product.quantity),
        }));
        const user = idUser;

        const createSaleObj = {
          products: objProductsSale,
          //el id es el id de la preferencia el mismo de la variable al principio
          id: response.id,
          user: user,
          coupon: coupon,
        };

        axios
          .post("http://localhost:3001/api/sale", createSaleObj)
          .catch((error) => console.log(error));
        res.status(200).json(response.id);
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "ocurrio un error al crear la preferencia en el servidor" + error,
        });
      });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getDataPayment = async (req, res) => {
  const payment = req.query;
  const paymentId = payment["data.id"];

  try {
    const response = await axios(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Bearer ${client.accessToken}` },
      }
    );

    if (response.data.status === "approved") {
      await axios.put(
        `https://pf-backend-production-883c.up.railway.app:3001/api/sale/${idPreference}`
      );
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
