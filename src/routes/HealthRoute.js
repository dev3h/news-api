import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  /*
    #swagger.tags = ['Health']
    #swagger.summary = 'Health check endpoint'
    #swagger.description = 'Check if the API is running'
    #swagger.responses[200] = {
        description: 'API is healthy',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'OK' },
                        message: { type: 'string', example: 'API is running' },
                        timestamp: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' }
                    }
                }
            }
        }
    }
  */
  res.status(200).json({
    status: "OK",
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

export default router;