const router = require('express').Router();
const { filterTypesApi, getTypes, typeFilterById } = require('../controllers/types.controller');
const { validationOrder } = require('../middleware/validationOrder');
const { validationPagination } = require('../middleware/validationPagination');

/**Devuelve todos los tipos */
router.get('/', validationPagination, getTypes);

router.get('/:id', validationPagination, validationOrder, typeFilterById);

/**filtra los pokemon por tipo desde la api */
router.get('/filter-pag/:id/', filterTypesApi);

module.exports = router;
