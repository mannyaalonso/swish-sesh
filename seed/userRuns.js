const db = require('../db')
const { User, Run } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const user1 = await new User({
        name: 'John Doe',
        email: 'johndoe00@gmail.com',
        picture: 'https://i.imgur.com/stv7eih.png',
        experience: 'Elite',
        pastRuns: [],
        hasPayment: true,
    })
    user1.save()
    const user2 = await new User({
        name: 'Jane Doe',
        email: 'janedoey00@gmail.com',
        picture: 'https://i.imgur.com/y2D0mBK.jpg',
        experience: 'Competitive',
        pastRuns: [],
        hasPayment: false,
    })
    user2.save()


    const runs = [
        {
            date: '03/30/2023',
            time: '6:00 PM EST',
            host: 'Jimmy Doe',
            players: user1._id,
            location: 'Winder Recreation Center',
            isFull: false
        },
        {
            date: '02/28/2023',
            time: '7:00 PM EST',
            host: 'Martha Doe',
            players: user2._id,
            location: 'Atlanta Recreation Center',
            isFull: false
        }
    ]
    await Run.insertMany(runs)
    console.log('Added Runs!')
}

const run = async () => {
    await main()
    // db.close()
}

run()