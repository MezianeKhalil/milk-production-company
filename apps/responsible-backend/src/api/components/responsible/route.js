const router = require('express').Router()
const { createResponsible, deleteResponsible, getResponsibles } = require('./controller')
const { verifyAuthorization, verifyIsAdmin } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, verifyIsAdmin, createResponsible)

router.delete('/:id', verifyAuthorization, verifyIsAdmin, deleteResponsible)

router.get('/', verifyAuthorization, verifyIsAdmin, getResponsibles)

module.exports = router
