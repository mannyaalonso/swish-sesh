const { Router } = require('express');
const router = Router();
const controllers = require('../controllers')

router.get('/', (req, res) => res.send('This is root!'))

router.post('/user', controllers.createUser)
router.get('/users', controllers.getAllUsers)
router.get('/user/:id', controllers.getUserById)
router.put('/user/:id', controllers.updateUser)
router.delete('/user/:id', controllers.deleteUser)

router.post('/run', controllers.createRun)
// router.get('/runs', controllers.getAllRuns)
router.get('/run/:id', controllers.getRunById)
router.put('/run/:id', controllers.updateRun)
router.delete('/run/:id', controllers.deleteRun)

// router.post("/login", controllers.loginUser)


router.get("/runs", controllers.getRuns)


module.exports = router;