// async..await is not allowed in global scope, must use a wrapper
async function service_RegisterMail(user_email) {
    // send mail with defined transport object
    const info = await transport.sendMail({
        from: "Egym <egym420@gmail.com>", // sender address
        to: user_email, // list of receivers
        subject: "registro completado ✔", // Subject line
        html: `<div style="text-align: center;">
        <h1>¡Bienvenido a Nuestra Página!</h1>
        <p>Estamos encantados de que te hayas registrado con éxito.</p>
        <img src="https://tse1.mm.bing.net/th?id=OIP.qvFyZoUdTcD8GjNeFdopeAHaDo&pid=Api&P=0&h=180" alt="Egym Logo" style="width: 200px; height: auto;">
        <p>Esperamos que disfrutes de nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de E-GYM</p>
    </div>`, // html body
    });
}

async function service_RecoveryPasswordMail(user_email){
    const info = await transport.sendMail({
        from: "Egym <egym420@gmail.com>", // sender address
        to: user_email, // list of receivers
        subject: "Restablece tu contraseña", // Subject line
        html: `<div style="text-align: center;">
        <h1>Restablece tu contraseña:</h1>
        <p>Estamos encantados de que te hayas registrado con éxito.</p>
        <img src="https://tse1.mm.bing.net/th?id=OIP.qvFyZoUdTcD8GjNeFdopeAHaDo&pid=Api&P=0&h=180" alt="Egym Logo" style="width: 200px; height: auto;">
        <p>Esperamos que disfrutes de nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de E-GYM</p>
    </div>`, // html body
})
}

async function service_UserOrderMail(user_email){
    const info = await transport.sendMail({
        from: "Egym <egym420@gmail.com>", // sender address
        to: user_email, // list of receivers
        subject: "Compra Finalizada con éxito! ✔", // Subject line
        html: `<div style="text-align: center;">
        <h1>¡Has finalizado tu compra!!</h1>
        <p>Estamos encantados de que te hayas registrado con éxito.</p>
        <img src="https://tse1.mm.bing.net/th?id=OIP.qvFyZoUdTcD8GjNeFdopeAHaDo&pid=Api&P=0&h=180" alt="Egym Logo" style="width: 200px; height: auto;">
        <p>Esperamos que disfrutes de nuestros servicios. Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,</p>
        <p>El equipo de E-GYM</p>
    </div>`, // html body
})
}



module.exports = { service_RegisterMail, service_RecoveryPasswordMail, service_UserOrderMail}