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
    description:
      "API for News Management System with Admin, User and Auth routes",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
    {
      url: "https://news-api-ko52.onrender.com",
      description: "Production server",
    },
  ],
  tags: [
    { name: "Admin Auth", description: "Admin authentication routes" },
    { name: "User Auth", description: "User authentication routes" },
    { name: "Admin Dashboard", description: "Admin dashboard statistics routes" },
    { name: "Admin Post", description: "Post management routes" },
    {
      name: "Admin Group Category",
      description: "Group category management routes",
    },
    { name: "Admin Category", description: "Category management routes" },
    { name: "Admin Tag", description: "Tag management routes" },
    { name: "Admin Author", description: "Author (user) management routes" },
    { name: "Admin Role", description: "Role management routes" },
    { name: "User Post", description: "Public post access routes" },
    { name: "User Group", description: "Public group access routes" },
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

function verifySwagger(outputPath) {
  const generated = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const { schemas = {} } = generated?.components || {};
  const missingRefs = [];

  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (typeof node.$ref === "string") {
      const match = node.$ref.match(/^#\/components\/schemas\/(.+)$/);
      if (match && !schemas[match[1]]) missingRefs.push(node.$ref);
      return;
    }
    Object.values(node).forEach(walk);
  };

  walk(generated.paths);
  if (missingRefs.length > 0) {
    console.warn("⚠️  Unresolved schema refs:");
    missingRefs.forEach((ref) => console.warn(`  - ${ref}`));
  } else {
    console.log("✅ All component schema refs resolved.");
  }

  const pathCount = Object.keys(generated?.paths || {}).length;
  console.log(`📄 Generated ${pathCount} documented path(s).`);
}

const endpointsFiles = getRouteFilesByPattern();
console.log("🔄 Generating Swagger documentation...");

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(() => {
  console.log("✅ Swagger documentation generated successfully.");
  verifySwagger(outputFile);
});