/**
 * Database configuration module
 *
 * This module sets up the PostgreSQL database connection using the postgres
 * library and environment variables for configuration.
 */

import postgres from "postgres";
import "dotenv/config";

/**
 * Create and export the database connection instance
 *
 * Uses the DATABASE_URL environment variable to establish connection
 * to the PostgreSQL database. The connection is configured with default
 * settings suitable for the application's needs.
 */
const sql = postgres(process.env.DATABASE_URL);

export default sql;
