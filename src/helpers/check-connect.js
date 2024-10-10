
const mongoose = require('mongoose')
const os = require('os');
const process = require('process');

function countConnections() {
    const numConnections = mongoose.connections.length

 
    console.log('countConnections: ' + numConnections)
}

const checkOverloadedConnections = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length
        const numCore = os.cpus().length;
        const memoryProcess = process.memoryUsage().rss;
        const maxConnections = numCore*5

        console.log('memory usage: ' + memoryProcess/1024/1024 + 'mb')
        if (numConnections > maxConnections) {
            console.log('connections is overloaded')
        }
    }, 5000)

}

module.exports = {
    countConnections,
    checkOverloadedConnections
}