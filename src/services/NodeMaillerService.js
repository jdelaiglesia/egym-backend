const {transport} = require("../config/nodeMailer")
// const {resetToken} = require("../config/resetToken")

// async..await is not allowed in global scope, must use a wrapper
async function service_RegisterEmail(user_email) {
   
    const info = await transport.sendMail({
        from: "Egym <egym420@gmail.com>", 
        to: user_email, 
        subject: "registro completado ✔", 
        html: `<div style="text-align: center;">
        <h1>¡Bienvenido a Nuestra Página!</h1>
        <p>Estamos encantados de que te hayas registrado con éxito.</p>
        <img src="https://tse1.mm.bing.net/th?id=OIP.qvFyZoUdTcD8GjNeFdopeAHaDo&pid=Api&P=0&h=180" alt="Egym Logo" style="width: 200px; height: auto;">
        <p>Esperamos que disfrutes de nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de E-GYM</p>
    </div>`, 
    });
}



// async function service_RecoveryPasswordMail(user_email, resetToken){
//     const resetPasswordUrl = `ACAVAELLINKPARARECUPERARLACONTRASEÑA${resetToken}`
//     const info = await transport.sendMail({
//         from: "Egym <egym420@gmail.com>", // sender address
//         to: user_email, // list of receivers
//         subject: "Restablece tu contraseña de E-GYM", // Subject line
//         html: `<div style="text-align: center;">
//         <h1>Restablece tu contraseña</h1>
//         <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
//         <p>Por favor, haz clic en el siguiente enlace para establecer una nueva contraseña:</p>
//         <a href="${resetPasswordUrl}" target="_blank" style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Restablecer contraseña</a>
//         <p>Si no has solicitado este cambio, por favor ignora este correo electrónico.</p>
//             <p>Saludos,</p>
//             <p>El equipo de E-GYM</p>
//     </div>`, // html body
// })
// }

async function service_UserOrderEmail(user_email){
    
    const info = await transport.sendMail({
        from: "Egym <egym420@gmail.com>", 
        to: user_email, 
        subject: "Ticket de compra! ✔", 
        html: `<div style="text-align: center;">
        <h1>¡Has finalizado tu compra!!</h1>
        <p>Gracias por comprar en Egym, esperamos que quedes satisfecho con tu producto.</p>
        <p>Saludos,</p>
        <p>El equipo de E-GYM</p>
    </div>`, 
})
}




module.exports = { service_RegisterEmail, service_UserOrderEmail}