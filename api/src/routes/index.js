const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRoutes = require('./types.routes.js');
const pokemonRoutes = require('./pokemon.routes.js');
const userRoutes = require('./user.routes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typesRoutes);
router.use('/pokemon', pokemonRoutes);
router.use('/user', userRoutes);

module.exports = router;
