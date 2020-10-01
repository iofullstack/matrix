// Global modules
import express from 'express'
// Local modules
import { config } from '../config'

function routesApi(app) {
  // Statement and Instances
  const router = express.Router()
  app.use(router)

  router.get('/empleados', async (req, res, next) => {
    try {
      const menu = [
        { action: 'Listar Empleados', link: '/empleados'},
        { action: 'Listar Facturas', link: '/facturas'},
        { action: 'Listar Proveedores', link: '/proveedores'}
      ]

      res.render('users/listUsers', { menu, dev: config.dev })
    } catch(err) {
      next(err)
    }
  })
}

export default routesApi