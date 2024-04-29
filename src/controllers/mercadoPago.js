require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require('mercadopago');
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

const createPreferenceMercadoPago = (req, res)=>{
  
  const data = req.body

  let items = data.map(product=>(
    {
      id: product._id,
      category_id: product.category,
      currency_id: "ARS",
      description: product.description,
      title: product.name,
      quantity: product.quantity,
      unit_price: product.price
    }
))

  const preference = new Preference(client);
  preference.create({
    body: {
    payment_methods: {
    excluded_payment_methods: [],
    excluded_payment_types: [],
    installments: 12
},
      items: items
    }
  })
.then((response)=>{
  // console.log(response.id)
  res.status(200).json(response.id)
})
.catch((error)=>{
  res.status(500).json({message: "ocurrio un error al crear la preferencia en el servidor"+error.message})
});

  
}
module.exports = {
  createPreferenceMercadoPago
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