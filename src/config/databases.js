const Sequelize = require('sequelize');

const sequelize = new Sequelize('mini_socialmedia', 'root', '', {
    dialect: 'mysql'
})


const connectDatabase = () => {
    (async () => {
        await sequelize.authenticate()
            .then(() => {
                console.log("Connection Successful");
            })
            .catch((err) => {
                console.log(err)
            })

        await sequelize.sync({ alter: true })
            .then((data) => {
                console.log("Tables synced successfully")
            })
            .catch((err) => {
                console.log(err)
            })
    })()

}


module.exports = {
    sequelize, Sequelize, connectDatabase
}




