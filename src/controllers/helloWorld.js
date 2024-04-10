const helloWorld = (req, res)=>{
    res.status(200).json("Hola Mundo!");
}
module.exports = helloWorld