const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typesRoutes = require('./types.routes.js');
const pokemonRoutes = require('./pokemon.routes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/types', typesRoutes);
router.use('/pokemon', pokemonRoutes);

module.exports = router;
