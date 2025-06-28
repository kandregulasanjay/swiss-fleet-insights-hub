const db = require('../config/db');

exports.getKPIs = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM kpi_metrics WHERE dashboard_type = @param0 AND month = @param1 AND year = @param2',
      ['afterSales', month, year]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching after sales KPIs:', error);
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};

exports.getRevenueChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['afterSales', 'bar', 'Resolution Time by Agent', month, year]
    );
    res.json({
      name: "Revenue Trend vs Target",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        additional_value: row.additional_value
      }))
    });
  } catch (error) {
    console.error('Error fetching revenue chart:', error);
    res.status(500).json({ error: 'Failed to fetch revenue data' });
  }
};

exports.getTicketStatusChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['afterSales', 'pie', 'Ticket Distribution', month, year]
    );
    res.json({
      name: "Ticket Status Distribution",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        color: row.color
      }))
    });
  } catch (error) {
    console.error('Error fetching ticket status chart:', error);
    res.status(500).json({ error: 'Failed to fetch ticket status data' });
  }
};

exports.getCostByVehicleChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['afterSales', 'bar', 'Resolution Time by Agent', month, year]
    );
    res.json({
      name: "Service Costs by Vehicle Type",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value,
        additional_value: row.additional_value
      }))
    });
  } catch (error) {
    console.error('Error fetching cost by vehicle chart:', error);
    res.status(500).json({ error: 'Failed to fetch cost by vehicle data' });
  }
};

exports.getRegionalDowntimeChart = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM chart_data WHERE dashboard_type = @param0 AND chart_type = @param1 AND name = @param2 AND month = @param3 AND year = @param4',
      ['afterSales', 'pie', 'Ticket Distribution', month, year]
    );
    res.json({
      name: "Average Downtime by Region (Hours)",
      data: rows.map(row => ({
        data_point_name: row.data_point_name,
        data_point_value: row.data_point_value
      }))
    });
  } catch (error) {
    console.error('Error fetching regional downtime chart:', error);
    res.status(500).json({ error: 'Failed to fetch regional downtime data' });
  }
};

exports.getTicketsTable = async (req, res) => {
  try {
    const { month, year } = req.query;
    const rows = await db.executeQuery(
      'SELECT * FROM service_tickets WHERE month = @param0 AND year = @param1',
      [month, year]
    );
    res.json({
      headers: ['Ticket ID', 'Status', 'Resolution Time', 'Profit', 'SLA Compliance'],
      rows: rows.map(row => ({
        'Ticket ID': row.ticket_id,
        'Status': row.status,
        'Resolution Time': `${row.resolution_time}h`,
        'Profit': row.profit,
        'SLA Compliance': row.sla_compliance
      }))
    });
  } catch (error) {
    console.error('Error fetching tickets table:', error);
    res.status(500).json({ error: 'Failed to fetch tickets data' });
  }
}; 