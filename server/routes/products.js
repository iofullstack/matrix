// Global modules
import express from 'express'
// Local modules
import { config } from '../config'

function routesApi(app) {
  // Statement and Instances
  const router = express.Router()
  app.use(router)

  router.get('/pedidos', async (req, res, next) => {
    try {
      const menu = [
        { action: 'Listar Pedidos', link: '/pedidos'},
        { action: 'Listar Clientes', link: '/clientes'},
        { action: 'Aperturas de Caja', link: '/pedidos/caja'}
      ]
  
      res.render('warehouse/listProducts', { menu, dev: config.dev })
    } catch(err) {
      next(err)
    }
  })
}

export default routesApi
