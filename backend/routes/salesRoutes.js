const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/kpis', salesController.getKPIs);
router.get('/growth-chart', salesController.getSalesGrowthChart);
router.get('/product-chart', salesController.getProductSalesChart);
router.get('/region-chart', salesController.getRegionSalesChart);
router.get('/conversion-chart', salesController.getConversionFunnelChart);
router.get('/sales-rep-table', salesController.getSalesRepTable);

module.exports = router; 