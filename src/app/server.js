const express = require('express');
const chefRouter = require('./routers/chefs');

const app = express();

// ... other routes and middleware

app.use('/chefs', chefRouter); // Mount chef router

app.listen(3000, () => console.log('Server listening on port 3000'));
