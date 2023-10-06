import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Warehouse Management API",
    description: "Description",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("./index.js"); // Your project's root file
});
