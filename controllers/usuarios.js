

const usuariosGet = (req, res) => {
    const {q, name = 'No name', apikey, page = '1',limit} = req.query;
    
    res.json({
        msg: 'Get API - controlador',
        name,
        q,
        apikey,
        page,
        limit
    })
  }

const usuariosPost = (req, res) => {
    const {name} = req.body;
    
    res.json({
        msg: 'Post API - controlador',
        name,
    })
  }

const usuariosPut = (req, res) => {

    const {id} = req.params

    res.json({
        msg: 'Put API - controlador',
        id
    })
  }
  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    })
  }
  const usuariosDelete = (req, res) => {
    res.json({
        msg: 'Delete API - controlador'
    })
  }

module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
}