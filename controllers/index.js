const { Run, User } = require('../models/index')

const createUser = async (req, res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id)
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('User deleted');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



const createRun = async (req, res) => {
    try {
        const { id } = req.params
        req.body = { ...req.body, players: id }
        const run = await new Run(req.body)
        await run.save()
        return res.status(201).json({
            run,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllRuns = async (req, res) => {
    try {
        const { id } = req.params
        const runs = await Run.find({ players: id })
        return res.status(200).json(runs)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getRunById = async (req, res) => {
    try {
        const { id } = req.params;
        const run = await Run.findById(id)
        if (run) {
            return res.status(200).json({ run });
        }
        return res.status(404).send('Run with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateRun = async (req, res) => {
    try {
        const run = await Run.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(run)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteRun = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Run.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send('Run deleted');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const loginUser = async (req, res) => {
  const { email } = req.body
  User.findOne({ email }, (error, user) => {
    if (!user) {
      return res.status(401).json({ message: "Email not found" })
    } else {
      res.status(200).json({ message: "Login successful", user: user })
    }
  })
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createRun,
    getAllRuns,
    getRunById,
    updateRun,
    deleteRun,
    loginUser
}