const { Router } = require('express');
const router = Router();
const controllers = require('../controllers')

router.get('/', (req, res) => res.send('This is root!'))

router.post('/user', controllers.createUser)
router.get('/users', controllers.getAllUsers)
router.get('/user/:id', controllers.getUserById)
router.put('/user/:id', controllers.updateUser)
router.delete('/user/:id', controllers.deleteUser)

// router.post("/login", controllers.loginUser)

router.post('/user/:id/run', controllers.createRun)
router.get('/user/:id/runs', controllers.getAllRuns)
router.get('/user/:id/run/:id', controllers.getRunById)
router.put('/user/:id/run/:id', controllers.updateRun)
router.delete('/user/:id/run/:id', controllers.deleteRun)

router.get("/runs", controllers.getRuns)


module.exports = router;