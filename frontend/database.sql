-- KPI Metrics Table
CREATE  TABLE kpi_metrics (
    id INT IDENTITY(1,1) PRIMARY KEY,
    dashboard_type VARCHAR(20) CHECK (dashboard_type IN ('fleet', 'sales', 'afterSales')) NOT NULL,
    title VARCHAR(100) NOT NULL,
    value DECIMAL(15,2),
    previous_value DECIMAL(15,2),
    trend VARCHAR(4) CHECK (trend IN ('up', 'down')) NOT NULL,
    trend_value VARCHAR(20),
    icon VARCHAR(50),
    month INT NOT NULL,
    year INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Chart Data Table
CREATE  TABLE chart_data (
    id INT IDENTITY(1,1) PRIMARY KEY,
    dashboard_type VARCHAR(20) CHECK (dashboard_type IN ('fleet', 'sales', 'afterSales')) NOT NULL,
    chart_type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    data_point_name VARCHAR(100) NOT NULL,
    data_point_value DECIMAL(15,2),
    additional_value DECIMAL(15,2), -- For target values
    color VARCHAR(20), -- For pie charts
    month INT NOT NULL,
    year INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Fleet Vehicles Table
CREATE TABLE fleet_vehicles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    vehicle_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Active', 'Maintenance', 'Idle')) NOT NULL,
    uptime_percentage DECIMAL(5,2),
    maintenance_cost DECIMAL(15,2),
    target_percentage DECIMAL(5,2),
    month INT NOT NULL,
    year INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Service Tickets Table
CREATE  TABLE service_tickets (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ticket_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Completed', 'In Progress', 'Pending')) NOT NULL,
    resolution_time INT, -- in hours
    profit DECIMAL(15,2),
    sla_compliance DECIMAL(5,2),
    month INT NOT NULL,
    year INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Sales Representatives Table
CREATE  TABLE sales_representatives (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    deals_closed INT,
    revenue DECIMAL(15,2),
    mom_growth DECIMAL(5,2),
    target_achievement DECIMAL(5,2),
    month INT NOT NULL,
    year INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);


-- Create indexes for better performance
CREATE INDEX idx_kpi_dashboard_date ON kpi_metrics(dashboard_type, month, year);
CREATE INDEX idx_chart_dashboard_date ON chart_data(dashboard_type, chart_type, month, year);
CREATE INDEX idx_fleet_date ON fleet_vehicles(month, year);
CREATE INDEX idx_tickets_date ON service_tickets(month, year);
CREATE INDEX idx_sales_date ON sales_representatives(month, year);

-- Create trigger for updated_at timestamp
GO
CREATE TRIGGER trg_kpi_metrics_update ON kpi_metrics AFTER UPDATE AS 
BEGIN
    UPDATE kpi_metrics SET updated_at = GETDATE()
    FROM kpi_metrics k
    INNER JOIN inserted i ON k.id = i.id;
END;

GO
CREATE TRIGGER trg_chart_data_update ON chart_data AFTER UPDATE AS 
BEGIN
    UPDATE chart_data SET updated_at = GETDATE()
    FROM chart_data c
    INNER JOIN inserted i ON c.id = i.id;
END;

GO
CREATE TRIGGER trg_fleet_vehicles_update ON fleet_vehicles AFTER UPDATE AS 
BEGIN
    UPDATE fleet_vehicles SET updated_at = GETDATE()
    FROM fleet_vehicles f
    INNER JOIN inserted i ON f.id = i.id;
END;

GO
CREATE TRIGGER trg_service_tickets_update ON service_tickets AFTER UPDATE AS 
BEGIN
    UPDATE service_tickets SET updated_at = GETDATE()
    FROM service_tickets s
    INNER JOIN inserted i ON s.id = i.id;
END;

GO
CREATE TRIGGER trg_sales_representatives_update ON sales_representatives AFTER UPDATE AS 
BEGIN
    UPDATE sales_representatives SET updated_at = GETDATE()
    FROM sales_representatives s
    INNER JOIN inserted i ON s.id = i.id;
END; 


------------------------------------------------------------------

truncate table kpi_metrics
INSERT INTO kpi_metrics (dashboard_type, title, value, previous_value, trend, trend_value, icon, month, year)
VALUES 
('fleet', 'Active Vehicles', 150, 140, 'up', '7.1%', 'car', 6, 2025),
('fleet', 'Fleet Efficiency', 92.4, 89.6, 'up', '3.1%', 'tachometer', 6, 2025),
('fleet', 'Idle Vehicles', 10, 15, 'down', '33.3%', 'ban', 6, 2025),
('sales', 'Monthly Revenue', 1200000, 1100000, 'up', '9.1%', 'dollar-sign', 6, 2025),
('sales', 'New Clients', 35, 30, 'up', '16.7%', 'users', 6, 2025),
('sales', 'Deals Lost', 4, 2, 'down', '100%', 'times', 6, 2025),
('afterSales', 'Resolved Tickets', 320, 300, 'up', '6.7%', 'check', 6, 2025),
('afterSales', 'Pending Tickets', 10, 12, 'down', '16.7%', 'clock', 6, 2025),
('afterSales', 'SLA Compliance', 95.5, 93.0, 'up', '2.7%', 'shield', 6, 2025),
('fleet', 'Maintenance Cost', 5600, 5800, 'down', '3.4%', 'tools', 6, 2025),
('fleet', 'Fuel Consumption', 10500, 10700, 'down', '1.9%', 'gas-pump', 6, 2025),
('sales', 'Repeat Customers', 45, 42, 'up', '7.1%', 'redo', 6, 2025),
('sales', 'Conversion Rate', 12.5, 11.0, 'up', '13.6%', 'chart-line', 6, 2025),
('afterSales', 'Avg Resolution Time', 6.2, 6.8, 'down', '8.8%', 'stopwatch', 6, 2025),
('fleet', 'Breakdowns', 3, 4, 'down', '25%', 'warning', 6, 2025),
('sales', 'Targets Met', 14, 12, 'up', '16.7%', 'bullseye', 6, 2025),
('afterSales', 'Technician Utilization', 88.0, 84.5, 'up', '4.1%', 'wrench', 6, 2025),
('sales', 'Customer Rating', 4.6, 4.4, 'up', '4.5%', 'star', 6, 2025),
('fleet', 'Avg Vehicle Age', 3.2, 3.5, 'down', '8.6%', 'calendar', 6, 2025),
('afterSales', 'Repairs', 50000, 37500, 'up', '6.7%', 'money', 5, 2025),
('afterSales', 'Profit from Repairs', 40000, 37500, 'up', '6.7%', 'money-bill', 6, 2025);


INSERT INTO fleet_vehicles (vehicle_id, status, uptime_percentage, maintenance_cost, target_percentage, month, year)
VALUES 
('VH1001', 'Active', 97.0, 1100, 98.0, 6, 2025),
('VH1002', 'Active', 95.5, 1200, 97.5, 6, 2025),
('VH1003', 'Maintenance', 89.0, 2500, 90.0, 6, 2025),
('VH1004', 'Idle', 60.0, 800, 85.0, 6, 2025),
('VH1005', 'Active', 96.0, 1300, 98.0, 6, 2025),
('VH1006', 'Maintenance', 85.0, 2000, 90.0, 6, 2025),
('VH1007', 'Idle', 70.0, 700, 88.0, 6, 2025),
('VH1008', 'Active', 98.0, 1000, 98.0, 6, 2025),
('VH1009', 'Maintenance', 90.0, 2300, 92.0, 6, 2025),
('VH1010', 'Active', 95.0, 1500, 97.0, 6, 2025),
('VH1011', 'Active', 97.5, 1200, 99.0, 6, 2025),
('VH1012', 'Idle', 65.0, 600, 86.0, 6, 2025),
('VH1013', 'Active', 94.0, 1400, 95.0, 6, 2025),
('VH1014', 'Maintenance', 88.5, 2200, 90.0, 6, 2025),
('VH1015', 'Idle', 68.0, 750, 87.0, 6, 2025),
('VH1016', 'Active', 96.5, 1350, 98.0, 6, 2025),
('VH1017', 'Maintenance', 87.0, 2100, 89.0, 6, 2025),
('VH1018', 'Active', 98.5, 950, 99.0, 6, 2025),
('VH1019', 'Idle', 63.0, 700, 85.0, 6, 2025),
('VH1020', 'Active', 95.2, 1150, 97.0, 6, 2025),
('VH1021', 'Active', 100, 1150, 100, 5, 2025);


INSERT INTO service_tickets (ticket_id, status, resolution_time, profit, sla_compliance, month, year)
VALUES 
('TK1001', 'Completed', 4, 200, 98.0, 6, 2025),
('TK1002', 'In Progress', 6, 150, 95.0, 6, 2025),
('TK1003', 'Pending', NULL, NULL, 80.0, 6, 2025),
('TK1004', 'Completed', 3, 220, 99.0, 6, 2025),
('TK1005', 'Completed', 5, 250, 97.0, 6, 2025),
('TK1006', 'In Progress', 7, 100, 92.0, 6, 2025),
('TK1007', 'Pending', NULL, NULL, 85.0, 6, 2025),
('TK1008', 'Completed', 6, 180, 96.5, 6, 2025),
('TK1009', 'Completed', 4, 210, 97.5, 6, 2025),
('TK1010', 'In Progress', 8, 160, 90.0, 6, 2025),
('TK1011', 'Pending', NULL, NULL, 84.0, 6, 2025),
('TK1012', 'Completed', 5, 240, 98.0, 6, 2025),
('TK1013', 'Completed', 6, 230, 96.0, 6, 2025),
('TK1014', 'In Progress', 9, 140, 88.0, 6, 2025),
('TK1015', 'Pending', NULL, NULL, 82.0, 6, 2025),
('TK1016', 'Completed', 4, 200, 97.0, 6, 2025),
('TK1017', 'In Progress', 6, 160, 93.0, 6, 2025),
('TK1018', 'Pending', NULL, NULL, 83.0, 6, 2025),
('TK1019', 'Completed', 5, 270, 99.0, 6, 2025),
('TK1020', 'Completed', 4, 210, 98.5, 6, 2025);


INSERT INTO sales_representatives (name, deals_closed, revenue, mom_growth, target_achievement, month, year)
VALUES 
('Alice', 15, 300000, 10.5, 95.0, 6, 2025),
('Bob', 12, 250000, 8.5, 90.0, 6, 2025),
('Charlie', 10, 200000, 7.2, 88.0, 6, 2025),
('Diana', 8, 180000, 6.0, 85.0, 6, 2025),
('Ethan', 16, 320000, 12.0, 98.0, 6, 2025),
('Fiona', 9, 195000, 5.5, 83.0, 6, 2025),
('George', 11, 220000, 9.0, 89.0, 6, 2025),
('Hannah', 14, 280000, 11.0, 93.0, 6, 2025),
('Ian', 7, 160000, 4.0, 80.0, 6, 2025),
('Jane', 13, 270000, 10.0, 92.0, 6, 2025),
('Karl', 12, 240000, 8.0, 90.0, 6, 2025),
('Laura', 10, 210000, 7.5, 87.0, 6, 2025),
('Mike', 15, 300000, 10.0, 95.0, 6, 2025),
('Nina', 9, 185000, 5.0, 84.0, 6, 2025),
('Oscar', 11, 225000, 8.7, 89.5, 6, 2025),
('Paula', 13, 265000, 9.5, 91.0, 6, 2025),
('Quinn', 6, 140000, 3.5, 78.0, 6, 2025),
('Rita', 14, 290000, 11.5, 94.0, 6, 2025),
('Steve', 10, 200000, 6.5, 86.0, 6, 2025),
('Tina', 8, 175000, 4.8, 82.0, 6, 2025);

truncate table chart_data

-- FLEET CHARTS
INSERT INTO chart_data (dashboard_type, chart_type, name, data_point_name, data_point_value, additional_value, color, month, year)
VALUES
('fleet', 'bar', 'Vehicle Status', 'Active', 140, NULL, 'green', 1, 2025),
('fleet', 'bar', 'Vehicle Status', 'Maintenance', 20, NULL, 'orange', 1, 2025),

('fleet', 'line', 'Fleet Uptime', 'VH1001', 96.5, 98.0, NULL, 2, 2025),
('fleet', 'line', 'Fleet Uptime', 'VH1002', 94.2, 96.0, NULL, 2, 2025),

('fleet', 'pie', 'Vehicle Distribution', 'Active', 70, NULL, 'green', 3, 2025),
('fleet', 'pie', 'Vehicle Distribution', 'Idle', 30, NULL, 'gray', 3, 2025),

('fleet', 'area', 'Maintenance Costs', 'VH1003', 1500, 1800, NULL, 4, 2025),
('fleet', 'area', 'Maintenance Costs', 'VH1004', 1300, 1700, NULL, 4, 2025),

-- SALES CHARTS
('sales', 'bar', 'Sales by Rep', 'Alice', 300000, 350000, NULL, 6, 2025),
('sales', 'bar', 'Sales by Rep', 'Bob', 250000, 320000, NULL, 6, 2025),

('sales', 'line', 'Monthly Revenue', 'Jan', 1000000, 1050000, NULL, 6, 2025),
('sales', 'line', 'Monthly Revenue', 'Feb', 2100000, 1120000, NULL, 6, 2025),
('sales', 'line', 'Monthly Revenue', 'March', 31000000, 1050000, NULL, 6, 2025),
('sales', 'line', 'Monthly Revenue', 'Apr', 4000000, 1050000, NULL, 6, 2025),
('sales', 'line', 'Monthly Revenue', 'May', 1500000, 1120000, NULL, 6, 2025),
('sales', 'line', 'Monthly Revenue', 'Jun', 6100000, 1120000, NULL, 6, 2025),

('sales', 'pie', 'Client Type Distribution', 'New', 60, NULL, 'blue', 6, 2025),
('sales', 'pie', 'Client Type Distribution', 'Returning', 40, NULL, 'purple',6, 2025),

('sales', 'area', 'Revenue Growth', 'Q1', 3200000, 3500000, NULL, 6, 2025),
('sales', 'area', 'Revenue Growth', 'Q2', 3600000, 3700000, NULL, 6, 2025),

-- AFTERSALES CHARTS
('afterSales', 'bar', 'Tickets by Status', 'Completed', 310, NULL, 'green', 9, 2025),
('afterSales', 'bar', 'Tickets by Status', 'In Progress', 20, NULL, 'orange', 9, 2025),

('afterSales', 'line', 'SLA Compliance', 'Jan', 95.5, 96.0, NULL, 10, 2025),
('afterSales', 'line', 'SLA Compliance', 'Feb', 94.2, 95.5, NULL, 10, 2025),

('afterSales', 'pie', 'Issue Category', 'Electrical', 35, NULL, 'red', 11, 2025),
('afterSales', 'pie', 'Issue Category', 'Mechanical', 65, NULL, 'blue', 11, 2025),

('afterSales', 'area', 'Resolution Time', 'Team A', 5.5, 6.0, NULL, 12, 2025),
('afterSales', 'area', 'Resolution Time', 'Team B', 6.0, 6.5, NULL, 12, 2025);
