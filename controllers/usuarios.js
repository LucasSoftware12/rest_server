const Usuario = require('../models/usuarios')
const bcryptjs = require('bcryptjs')


const usuariosGet = async(req, res) => {
    //const {q, name = 'No name', apikey, page = '1',limit} = req.query;
    const query = {estado:true}

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)

    ])


    res.json({
        msg: 'Get API - controlador',
       total,
       usuarios
    })
  }

const usuariosPost = async(req, res) => {
   

    const {nombre,correo,password,rol} = req.body
    const usuario = new Usuario({nombre,correo,password,rol})

    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password, salt)


    // Guardar en DB
    await usuario.save()
    res.json({
        msg: 'Post API - controlador',
        usuario,
    })
  }

const usuariosPut = async(req, res) => {

    const {id} = req.params
    const {password,correo,google, ...resto} = req.body

    //Validar todo contra base de datos
    if (password){
      const salt = bcryptjs.genSaltSync()
      resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        msg: 'Put API - controlador',
        usuario
    })
  }


  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    })
  }
  const usuariosDelete = async (req, res) => {
    
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})

    res.json({
        msg: 'Delete API - controlador',
        usuario
    })
  }

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
}