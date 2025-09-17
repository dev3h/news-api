import swaggerAutogen from "swagger-autogen";
import fs from 'fs';
import glob from 'glob';

function getRouteFilesByPattern() {
  const patterns = [
    "./src/routes/HealthRoute.js",
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

  return allFiles.filter((file) => !file.includes("/index.js") && fs.existsSync(file));
}

const doc = {
  info: {
    title: "News API",
    description: "API for News Management System with Admin, User and Auth routes",
    version: "1.0.0",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Admin Auth", description: "Admin authentication routes" },
    { name: "User Auth", description: "User authentication routes" },
    { name: "Admin", description: "Admin management routes" },
    { name: "User", description: "User access routes" },
    { name: "Health", description: "Health check endpoint" }
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    }
  }
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = getRouteFilesByPattern();

console.log('🔄 Generating Swagger documentation...');

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  // Auto-fix tags after generation
  const swagger = JSON.parse(fs.readFileSync('./src/swagger-output.json', 'utf8'));

  const rules = [
    ['/auth/admin/', 'Admin Auth', false],
    ['/auth/user/', 'User Auth', false],
    ['/api/v1/user/', 'User', true],
    ['/api/v1/', 'Admin', true],
    ['/health', 'Health', false]
  ];
  const noAuth = ['/login', '/register', '/refresh-token', '/forgot-password'];

  Object.entries(swagger.paths).forEach(([path, methods]) =>
    Object.values(methods).forEach(route => {
      if (route.tags) return;
      const rule = rules.find(([pattern]) => path.includes(pattern));
      if (rule) {
        const [, tag, needsAuth] = rule;
        route.tags = [tag];
        if (needsAuth && !noAuth.some(p => path.includes(p))) {
          route.security = [{ bearerAuth: [] }];
        }
      }
    })
  );

  // Write to both locations to ensure compatibility
  fs.writeFileSync('./src/swagger-output.json', JSON.stringify(swagger, null, 2));
  console.log('✅ Swagger generated with tags - build mode!');
  process.exit(0);
});