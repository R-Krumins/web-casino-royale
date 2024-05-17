module.exports = (io, socket) => {
  function init() {
    console.log("ASS");
  }

  socket.on("init", init);
};
