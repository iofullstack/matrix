import express from 'express'
import path from 'path'
import boom from 'boom'
/*import { nameModuleRouter } from './routes'*/
import isRequestAjaxOrAPI from './utils/isRequestAjaxOrAPI'
import { config } from './config'
import livereload from 'livereload'
import connectLivereload from 'connect-livereload'

import {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} from './utils/middlewares/errorsHandlers'

const publicDirectory = path.join(__dirname, 'public')

// Livereload
const liveReloadServer = livereload.createServer()
liveReloadServer.watch(publicDirectory)
liveReloadServer.server.once('connection', _ => {
  setTimeout(_ => {
    liveReloadServer.refresh('/')
  }, 100)
})

// App
const app = express()

// Middlewares
app.use(connectLivereload())

// Static files
app.use('/static', express.static(publicDirectory))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Routes
/*app.use('/route', nameModuleRouter)*/

// Main Route
app.get('/', (req, res, next) => {
  try {
    res.render('layout', { dev: config.dev })
  } catch(err) {
    next(err)
  }
})

app.use((req, res, next) => {
  if(isRequestAjaxOrAPI(req)) {
    const {
      output: { statusCode, payload }
    } = boom.notFound()

    res.status(statusCode).json(payload)
  }
  res.status(404).render('404')
})

// Error handlers 
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

export default app
