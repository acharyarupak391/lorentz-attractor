document.addEventListener("DOMContentLoaded", () => {
  var cnv = document.querySelector("#canvas");
  cnv.width = window.innerWidth - 4;
  cnv.height = window.innerHeight - 4;
  var ctx = cnv.getContext("2d");
  var center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  window.addEventListener("resize", (e) => {
    center.x = window.innerWidth / 2;
    center.y = window.innerHeight / 2;
    cnv.width = window.innerWidth - 4;
    cnv.height = window.innerHeight - 4;
  });
  var x, y, z;
  var color = {h: 200, s: 25, l: 30};
  var lastPoint = null;
  var initialValues = {
    scale: 12,
    a: 5,
    b: 28,
    c: 2,
    dt: 0.01
  }
  
  function draw() {
    calculate();
    // console.log(x, y, z);
    let _x = center.x + x * initialValues.scale;
    let _y = center.y - y * initialValues.scale;
    colorChange();
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${color.h}deg, ${color.s}%, ${color.l}%)`;
    if(lastPoint) ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(_x, _y);
    ctx.lineWidth = 0.5;
    ctx.stroke();
    lastPoint = {x: _x, y: _y};
    window.requestAnimationFrame(draw);
  }
  
  function init() {
    x = 10;
    y = 10;
    z = 10;
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.clearRect(0, 0, center.x * 2, center.y * 2);
    draw();
  }
  
  function calculate() {
    let dx, dy, dz;
    dx = initialValues.a * (y - x) * initialValues.dt;
    dy = (x * (initialValues.b - z) - y) * initialValues.dt;
    dz = (x * y - initialValues.c * z) * initialValues.dt;
    x += dx;
    y += dy;
    z += dz;
  };

  function colorChange() {
    color = {h: color.h + 5, s: 80, l: 50}
  }
  
  function datGuiSetup() {
    var gui = new dat.GUI();
    gui.add(initialValues, 'scale', 1, 100).onChange(init)
    gui.add(initialValues, 'a', 1, 30).onChange(init)
    gui.add(initialValues, 'b', 15, 30).onChange(init)
    gui.add(initialValues, 'c', 1, 5).onChange(init)
    gui.add(initialValues, 'dt', 0.0001, 0.01).onChange(init)
  }
  
  datGuiSetup();
  init();
});
