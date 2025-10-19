const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// --- Load Environment Variables FIRST (FIX) ---
dotenv.config({ path: path.resolve(__dirname, './.env') });

const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // 1. Import analytics routes
const userRoutes = require('./routes/userRoutes'); // Import user routes

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Use All Routes ---
app.use('/api/tasks', taskRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/analytics', analyticsRoutes); // 2. Register the new route
app.use('/api/users', userRoutes); // Use the new user routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});