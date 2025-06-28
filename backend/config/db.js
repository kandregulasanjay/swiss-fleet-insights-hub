const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// Create a pool that we can reuse
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
  console.error('Database pool error:', err);
});

// Helper function to execute queries
async function executeQuery(query, params = []) {
  await poolConnect; 
  try {
    const request = pool.request();
    
    // Add parameters to the request
    params.forEach((param, index) => {
      request.input(`param${index}`, param);
    });
    
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

module.exports = {
  executeQuery,
  pool,
  sql
}; 