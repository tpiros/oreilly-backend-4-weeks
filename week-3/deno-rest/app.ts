import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import {
  displayProducts,
  displayProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from './routes.ts';

const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || 'localhost';

const router = new Router();

router.get('/products', displayProducts);
router.get('/products/:name', displayProduct);
router.post('/products', addProduct);
router.put('/products/:name', updateProduct);
router.delete('/products/:name', deleteProduct);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`REST API running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
