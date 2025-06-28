require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fleetRoutes = require('./routes/fleetRoutes');
const salesRoutes = require('./routes/salesRoutes');
const afterSalesRoutes = require('./routes/afterSalesRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN
  // origin: ['http://localhost:8081', 'http://localhost:8001']
}));
app.use(express.json());

// Routes
app.use('/api/fleet', fleetRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/after-sales', afterSalesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 