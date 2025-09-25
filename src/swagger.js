import swaggerAutogen from "swagger-autogen";
import fs from 'fs';
import glob from 'glob';
import "dotenv/config";
import * as schemas from "./schemas";


function getRouteFilesByPattern() {
  const patterns = [
    "./src/routes/index.js",
    "./src/routes/AdminRoute/**/*.js",
    "./src/routes/UserRoute/**/*.js",
    "./src/routes/AuthRoute/**/*.js",
  ];

  const allFiles = [];

  patterns.forEach((pattern) => {
    try {
      if (pattern.includes("**")) {
        // Handle glob patterns
        const files = glob.sync(pattern);
        allFiles.push(...files);
      } else {
        // Handle direct file paths
        if (fs.existsSync(pattern)) {
          allFiles.push(pattern);
        }
      }
    } catch (error) {
      console.warn(`Could not process pattern: ${pattern}`);
    }
  });

  return allFiles.filter((file) => file.includes("/index.js") && fs.existsSync(file));
}

const doc = {
  info: {
    title: "News API",
    description: "API for News Management System with Admin, User and Auth routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "",
    },
    {
      url: "https://news-api-ko52.onrender.com",
      description: "",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Admin Auth", description: "Admin authentication routes" },
    { name: "User Auth", description: "User authentication routes" },
    { name: "Admin", description: "Admin management routes" },
    { name: "User", description: "User access routes" },
    { name: "Health", description: "Health check endpoint" },
  ],
  components: {
    schemas: { ...schemas },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  }
};

const outputFile = "./src/swagger-output.json";

// Ensure the output file exists or is initialized
if (!fs.existsSync(outputFile)) {
  fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
}

const endpointsFiles = getRouteFilesByPattern();
console.log("🔄 Generating Swagger documentation...");

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ Swagger documentation generated successfully.");
});