const app = require("./src/app");

const port = 3005;

const server = app.listen(port, ()=> {
    console.log('Connect port: ' + port)
});

process.on("SIGINT", () => {
    server.close(() => console.log('exit nodejs'));
});