// Importing necessary modules and files
import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';

//

// Setting the default promise library for Mongoose
mongoose.Promise = global.Promise;

// Connecting to the MongoDB database
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the database!");
    });

// Handling database connection errors
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// Setting up the root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Store application. Developed by Slytherin Developers" });
});

// Starting the server
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});
