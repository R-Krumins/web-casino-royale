module.exports = (io, socket) => {
  function init() {
    console.log("ASS");

    let i = 0;
    setInterval(() => {
      ++i;

      socket.volatile.emit("update", i);
    }, 1000);
  }

  socket.on("init", init);
};
