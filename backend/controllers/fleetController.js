const db = require('../config/db');

exports.getKPIs = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM kpi_metrics WHERE dashboard_type = @param0 AND month = @param1 AND year = @param2',
      ['fleet', month, year]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching fleet KPIs:', error);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};

exports.getUtilizationChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['fleet', 'bar', 'Vehicle Status', month, year]
    );
    res.json({
      name: "Fleet Utilization Trend",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        color: row.color
      }))
    });
  } catch (error) {
    console.error('Error fetching utilization chart:', error);
    res.status(500).json({ error: 'Failed to fetch utilization data' });
  }
};

exports.getVehicleTypesChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['fleet', 'bar', 'Vehicle Status', month, year]
    );
    res.json({
      name: "Vehicle Types Breakdown",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        color: row.color
      }))
    });
  } catch (error) {
    console.error('Error fetching vehicle types chart:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle types data' });
  }
};

exports.getMaintenanceChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['fleet', 'line', 'Maintenance Costs', month, year]
    );
    res.json({
      name: "Maintenance Costs vs Target",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        additional_value: row.additional_value
      }))
    });
  } catch (error) {
    console.error('Error fetching maintenance chart:', error);
    res.status(500).json({ error: 'Failed to fetch maintenance data' });
  }
};

exports.getRegionalChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['fleet', 'line', 'Fleet Uptime', month, year]
    );
    res.json({
      name: "Regional Vehicle Activity",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        additional_value: row.additional_value
      }))
    });
  } catch (error) {
    console.error('Error fetching regional chart:', error);
    res.status(500).json({ error: 'Failed to fetch regional data' });
  }
};

exports.getVehicleTable = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM fleet_vehicles WHERE month = @param0 AND year = @param1',
      [month, year]
    );
    res.json({
      headers: ['Vehicle', 'Status', 'Uptime (%)', 'Maintenance Cost', 'Target vs Actual'],
      rows: rows.map(row => ({
        'Vehicle': row.vehicle_id,
        'Status': row.status,
        'Uptime (%)': row.uptime_percentage,
        'Maintenance Cost': row.maintenance_cost,
        'Target vs Actual': row.target_percentage
      }))
    });
  } catch (error) {
    console.error('Error fetching vehicle table:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle data' });
  }
}; 