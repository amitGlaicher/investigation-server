require('dotenv').config();
require('./DL/db').connect();
const { mainRouter } = require('./Router');
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use(cors());

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: '1.2.0',
//       title: 'psychometry',
//       description: 'psychometryInvestigation',
//       contact: {
//         name: 'Amit Glaicher',
//         email: 'AmitGlaicher98@gmail.com',
//       },
//       servers: ['https://psychometry-rif9.onrender.com'],
//     },
//   },
//   apis: ['index.js', './Router/*.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', mainRouter);

app.listen(PORT, () => {
  
  console.log('server listen to ' + PORT)
});
