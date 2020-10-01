// Global modules
import express from 'express'
// Local modules
// import { MenuService } from '../services'
import { config } from '../config'

function routesApi(app) {
  // Statement and Instances
  const router = express.Router()
  // const menuService = new MenuService()
  app.use(router)

  router.get('/menu', async (req, res, next) => {
    // const { tags } = req.query
    try {
      const menu = {
        title: "joder la puta",
        lists: [
          { icon: "fa-list-ul", action: 'Listar Menú', link: '/menu' }
        ],
        records: [
          { icon: "fa-tasks", action: 'Agregar Menú', link: '/menu/agregar' },
          { icon: "fa-save", action: 'Publicar Menú', link: '/menu/publicar' }
        ]
      }
  
      res.render('menu/listMenu', { menu, dev: config.dev })
    } catch(err) {
      next(err)
    }
  })
}

export default routesApi
