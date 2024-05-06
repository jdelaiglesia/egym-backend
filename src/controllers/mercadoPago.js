require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const axios = require("axios")
const Sale = require("../models/Sale");

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

let idPreference = ""

const createPreferenceMercadoPago = (req, res)=>{
  
  const data = req.body
  
  let items = data.products.map(product=>(
    {
      id: product._id,
      category_id: product.category,
      currency_id: "ARS",
      description: product.description,
      title: product.name,
      quantity: Number(product.quantity),
      unit_price: Number(product.price)
    }
))
  
const body = {
  items: items,
  // payer: {
  //     name: "Juan",
  //     surname: "Lopez",
  //     email: "user@email.com",
  //     phone: {
  //         area_code: "11",
  //         number: "4444-4444"
  //     },
  //     identification: {
  //         type: "DNI",
  //         number: "12345678"
  //     },
  //     address: {
  //         street_name: "Street",
  //         street_number: 123,
  //         zip_code: "5700"
  //     }
  // },
  // back_urls: {
  //     success: "",
  //     failure: "",
  //     pending: ""
  // },
  // auto_return: "approved",
  payment_methods: {
      excluded_payment_methods: [],
      excluded_payment_types: [],
      installments: 12
  },
  notification_url: "https://2b36-181-1-77-15.ngrok-free.app/api/datapayment?source_news=webhooks",
  statement_descriptor: "PF EGYM",
  external_reference: "Reference_1234",
  expires: false,
  expiration_date_from: "",
  expiration_date_to: ""
};

  const preference = new Preference(client);
  preference.create({body})
.then((response)=>{
  console.log(response)
  idPreference=response.id

  let objProductsSale = data.products.map(product=>(
    {
      _id: product._id,
      quantity: Number(product.quantity)
    }
  ))
  const user = data.idUser

  const createSaleObj = {
    products: objProductsSale,
    //el id es el id de la preferencia el mismo de la variable al principio
    id : response.id,
    user: user
  }

  axios.post("http://localhost:3001/api/sale", createSaleObj)
    
  res.status(200).json(response.id)
})
.catch((error)=>{
  res.status(500).json({message: "ocurrio un error al crear la preferencia en el servidor"+error.message})
});
}

const getDataPayment = async(req, res)=>{
  const payment = req.query
  const paymentId = payment['data.id']
  
  console.log(req.query)
  console.log(paymentId)
  
    try {
      const response = await axios(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {"Authorization": `Bearer ${client.accessToken}`}
      })
      if(response.data.status==="approved"){
        await axios.put(`http://localhost:3001/api/sale/${idPreference}`)
      }
      // console.log(idPreference)
      res.status(200).send('OK')
    } catch (error) {
      console.error("Error al obtener datos de pago en servidor", error)
      res.status(500).send('ERROR')
    }
  
}

module.exports = {
  createPreferenceMercadoPago,
  getDataPayment
}























// const mercadoPago = (req, res)=>{
//   let data = req.body
//   // console.log(data)
//   // SDK de Mercado Pago
//   // Agrega credenciales
// const { MercadoPagoConfig, Preference } = require('mercadopago');
// const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
// const preference = new Preference(client);
// let dataPreference = {}
// let items = data.map(product=>(
//     {
//       id: product._id,
//       category_id: product.category,
//       currency_id: "ARS",
//       description: product.description,
//       title: product.name,
//       quantity: product.quantity,
//       unit_price: product.price
//     }
// ))
// // console.log(items)
// preference.create({
//   body: {
//     false: false,
//     items: items
//   },
//   back_urls: {
//     "success": "https://www.soyhenry.com/",
//     "failure": "https://www.facebook.com/",
//     "pending": "https://www.instagram.com/"
//   },
//   auto_return: "approved",
// })
// .then(response=>{
//   dataPreference=response
//   res.status(200).json(dataPreference.id)
// })
// .catch(error=>{
//   res.status(500).json({message: "ocurrio un error en servidor al procesar Mercado Pago"+ error.message})
// })
// }
// module.exports = {
//     mercadoPago
// }