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
  var color = {r: 200, g: 100, b: 50};
  var lastPoint = null;
  var initialValues = {
    scale: 10,
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
    // ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.strokeStyle = `hsl(${color.r}deg, ${color.g}%, ${color.b}%)`;
    if(lastPoint) ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(_x, _y);
    ctx.lineWidth = 0.5;
    ctx.stroke();
    lastPoint = {x: _x, y: _y};
    window.requestAnimationFrame(draw);
  }
  
  function init() {
    x = 1;
    y = 1;
    z = 1;
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
    Object.keys(color).map(col => {
      // if(color[col] === Math.max(color.r, color.g, color.b)) color[col] = parseInt((color[col] + 100) % 255);
      // else color[col] = parseInt((color[col] + 10) % 255);
    })
    color = {r: color.r + 1, g: 30, b: 50}
  }
  
  function datGuiSetup() {
    var gui = new dat.GUI();
    gui.add(initialValues, 'scale', 1, 25).onChange(init)
    gui.add(initialValues, 'a', 1, 30).onChange(init)
    gui.add(initialValues, 'b', 1, 30).onChange(init)
    gui.add(initialValues, 'c', 1, 5).onChange(init)
    gui.add(initialValues, 'dt', 0.0001, 0.01).onChange(init)
  }
  
  datGuiSetup();
  init();
});
