const connection=async (io)=>{
    try {
io.on('connection',(socket)=>{
    console.log('New client connected'+socket.id);


    socket.on('disconnect',()=>{
        console.log('Client disconnected');
    });
})
        
    } catch (error) { 
        console.error(`Error connecting to the server: ${error.message}`);
        
    }
}
module.exports=connection;