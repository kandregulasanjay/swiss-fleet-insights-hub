# Dashboard Backend

This is the backend service for the Dashboard application. It provides APIs for Fleet, Sales, and After Sales dashboards.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=5000
DB_HOST=your_server_name     # Example: localhost or server_ip
DB_USER=your_username        # SQL Server authentication username
DB_PASSWORD=your_password    # SQL Server authentication password
DB_NAME=dashboard_db
CORS_ORIGIN=http://localhost:5173
```

3. Set up the database:
   - Open SQL Server Management Studio
   - Connect to your SQL Server instance
   - Open the `database.sql` file
   - Execute the script to create the database and tables
   - Make sure the SQL Server authentication credentials in `.env` match your setup
   - Ensure SQL Server Authentication is enabled on your SQL Server instance

4. Start the development server:
```bash
npm run dev
```

## SQL Server Configuration Notes

1. Enable SQL Server Authentication:
   - In SQL Server Management Studio, right-click your server > Properties
   - Go to Security
   - Select "SQL Server and Windows Authentication mode"
   - Restart SQL Server for changes to take effect

2. Create SQL Server Login:
   - In SQL Server Management Studio
   - Expand Security > Logins
   - Right-click Logins > New Login
   - Create a SQL Server authentication login
   - Grant necessary permissions to the database

3. Enable TCP/IP:
   - Open SQL Server Configuration Manager
   - SQL Server Network Configuration > Protocols for MSSQLSERVER
   - Enable TCP/IP
   - Restart SQL Server

## API Endpoints

### Fleet Dashboard
- GET `/api/fleet/kpis` - Get Fleet KPIs
- GET `/api/fleet/utilization-chart` - Get Fleet Utilization Chart
- GET `/api/fleet/vehicle-types-chart` - Get Vehicle Types Chart
- GET `/api/fleet/maintenance-chart` - Get Maintenance Chart
- GET `/api/fleet/regional-chart` - Get Regional Chart
- GET `/api/fleet/vehicle-table` - Get Vehicle Table

### Sales Dashboard
- GET `/api/sales/kpis` - Get Sales KPIs
- GET `/api/sales/growth-chart` - Get Sales Growth Chart
- GET `/api/sales/product-chart` - Get Product Sales Chart
- GET `/api/sales/region-chart` - Get Region Sales Chart
- GET `/api/sales/conversion-chart` - Get Conversion Funnel Chart
- GET `/api/sales/sales-rep-table` - Get Sales Rep Table

### After Sales Dashboard
- GET `/api/after-sales/kpis` - Get After Sales KPIs
- GET `/api/after-sales/revenue-chart` - Get Revenue Chart
- GET `/api/after-sales/ticket-status-chart` - Get Ticket Status Chart
- GET `/api/after-sales/cost-by-vehicle-chart` - Get Cost by Vehicle Chart
- GET `/api/after-sales/regional-downtime-chart` - Get Regional Downtime Chart
- GET `/api/after-sales/tickets-table` - Get Tickets Table

## Query Parameters

All endpoints accept the following query parameters:
- `month` (number) - The month for which data is requested
- `year` (number) - The year for which data is requested

Example: `/api/fleet/kpis?month=1&year=2024`

## Troubleshooting

1. Connection Issues:
   - Verify SQL Server is running
   - Check if TCP/IP is enabled
   - Ensure firewall allows SQL Server port (default 1433)
   - Verify SQL Server authentication credentials
   - Check if the user has appropriate permissions

2. Common Errors:
   - "Login failed for user": Check SQL Server authentication settings
   - "Cannot connect to server": Check TCP/IP settings and firewall
   - "Database does not exist": Run the database creation script 