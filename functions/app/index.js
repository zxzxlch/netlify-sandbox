import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

/* My express App */
export default function expressApp(functionName) {
  const app = express();
  const router = express.Router();

  // gzip responses
  router.use(compression());

  // Set router base path for local dev
  const routerBasePath =
    process.env.NODE_ENV === 'dev'
      ? `/${functionName}`
      : `/.netlify/functions/${functionName}`;

  /* define routes */
  router.get('/', (req, res) => {
    res.send(`Try <a href="/.netlify/functions/${routerBasePath}/test">/test</a>`);
  });

  router.get('/test/', function (req, res) {
    res.json({ foo: 'bar' });
  });

  // Setup routes
  app.use(routerBasePath, router);

  // Apply express middlewares
  router.use(cors());
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  return app;
}
