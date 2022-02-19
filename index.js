const app = require('./app');
const port = process.env.PORT || 8050


app.listen(port, () => console.log(`Server successfully run on ${port}`))
