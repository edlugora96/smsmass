module.exports = io =>{
  io.on('connection', ()=>{
    console.log('New user is connect');
  });
};