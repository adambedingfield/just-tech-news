const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create user model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        id: {
            //use special sequelize datatypes object to provide what type of data it is
            type: DataTypes.INTEGER,
            // this is the equivalvent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cant be a duplicate email
            unique: true,
            //if allowNull is set to false we can run our data through validators before creating the table data
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)
        
        //pass in our imported sequelize connection (the direct connection to our db)
        sequelize,
        // dont auto create createdat/updatedat timestamp fields
        timestamps: false,
        // dont pluralize name of db table
        freezeTableName: true,
        // use underscores instead of camel-casing(i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;