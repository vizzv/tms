const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

// Import controllers
const organizationController = require('./controllers/organizationController');
const taskController = require('./Controllers/taskController');
const commentController = require('./controllers/commentController');
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');

// Import middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { validate } = require('./Schemas/userSchema');
const { userSchema, roleSchema, organizationSchema, taskSchema, commentSchema } = require('./Schemas/validationSchema');
const router = require('./Routes/allRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/',(req,res)=>{
    res.send('hii');
})

app.use('/api/users', router);
app.use('/api/roles', roleRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
// Error handling middleware (optional)
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
