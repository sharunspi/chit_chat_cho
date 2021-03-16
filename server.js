const { timeStamp } = require('console')

const server = require('net').createServer()
const port = 3002
let counter = 1000
let connections = {}
function getTime(){
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes()}`
}
server.on('connection',socket=>{
    socket.id = counter++
    socket.write('Please enter your name ')
    console.log('Connectd')
    socket.on('data',connectionData=>{
       if(!connections[socket.id]){
        socket.name = connectionData.toString().trim()
        socket.write('Welcome '+ socket.name+'\n')
        socket.write(`${socket.name} joined`)
        connections[socket.id] = socket
        return
       }
       Object.entries(connections).forEach(([key,cs])=>{
           if(socket.id ==key) return
           cs.write(`${socket.name} (${getTime()}) :`)
           cs.write(connectionData)
       })
    })
})
server.listen(port,()=>console.log('Connected to server at port:'+port))