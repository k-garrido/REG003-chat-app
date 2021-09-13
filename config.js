module.exports.port = process.argv[2] || process.env.PORT || 8080;
module.exports.dbUrl = "postgresql://postgres:postgres@localhost:5432/default_database?schema=public";