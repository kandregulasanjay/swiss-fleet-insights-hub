const express = require('express');
const router = express.Router();
const afterSalesController = require('../controllers/afterSalesController');

router.get('/kpis', afterSalesController.getKPIs);
router.get('/revenue-chart', afterSalesController.getRevenueChart);
router.get('/ticket-status-chart', afterSalesController.getTicketStatusChart);
router.get('/cost-by-vehicle-chart', afterSalesController.getCostByVehicleChart);
router.get('/regional-downtime-chart', afterSalesController.getRegionalDowntimeChart);
router.get('/tickets-table', afterSalesController.getTicketsTable);

module.exports = router; 