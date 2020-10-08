// Global modules
import express from 'express'
// Local modules
import { permitsMiddleware } from '../utils/middlewares/userPermits'
import { config } from '../config'

function routesApi(app) {
  // Statement and Instances
  const router = express.Router()
  app.use(router)

  router.get('/empleados', permitsMiddleware, async (req, res, next) => {
    const { menu, sub_menu, url } = req
    try {
      res.render('users/listUsers', { dev: config.dev, menu, sub_menu, enlace: url.substring(1) })
    } catch(err) {
      next(err)
    }
  })
}

export default routesApi
