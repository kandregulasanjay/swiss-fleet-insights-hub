const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleetController');

router.get('/kpis', fleetController.getKPIs);
router.get('/utilization-chart', fleetController.getUtilizationChart);
router.get('/vehicle-types-chart', fleetController.getVehicleTypesChart);
router.get('/maintenance-chart', fleetController.getMaintenanceChart);
router.get('/regional-chart', fleetController.getRegionalChart);
router.get('/vehicle-table', fleetController.getVehicleTable);

module.exports = router; 