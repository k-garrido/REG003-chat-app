module.exports.port = process.env.PORT || 8080;
module.exports.dbUrl =  process.env.DB_URL || "postgresql://postgres:postgres@localhost:5432/default_database?schema=public";
module.exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
module.exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
module.exports.adminPassword = process.env.ADMIN_PASSWORD || 'superAdmin';