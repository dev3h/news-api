import swaggerAutogen from "swagger-autogen";

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

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./routes/index.js",
  "./routes/AdminRoute/**/*.js",
  "./routes/UserRoute/**/*.js",
  "./routes/AuthRoute/**/*.js"
];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  // Auto-fix tags after generation
  const fs = await import('fs');
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

  fs.writeFileSync('./src/swagger-output.json', JSON.stringify(swagger, null, 2));
  console.log('✅ Swagger generated with tags!');
  
  await import("./index.js");
});
