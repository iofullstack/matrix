// Global modules
import express from 'express'
// Local modules
import { permitsMiddleware } from '../utils/middlewares/userPermits'
import { config } from '../config'

function routesApi(app) {
  // Statement and Instances
  const router = express.Router()
  app.use(router)

  router.get('/pedidos', permitsMiddleware, async (req, res, next) => {
    const { menu, sub_menu } = req
    try {
      res.render('orders/createOrder', { dev: config.dev, menu, sub_menu })
    } catch(err) {
      next(err)
    }
  })
}

export default routesApi
