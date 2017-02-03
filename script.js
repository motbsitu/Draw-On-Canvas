window.addEventListener('load', function(event){

const canvas = document.querySelector('#draw');
//draw on context in 2d
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//strokeStyle (options for lineJoin/cap = bevel, miter)
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
//blend mode
ctx.globalCompositeOperation = 'multiply';

//when let go of click not draw
let isDrawing = false;
//starting and ending x and y
let lastX = 0;
let lastY = 0;
//color with hsl
let hue = 0;
//line width change
let direction = true;

function draw(e){
  //if not drawing (moused down), stop function
  if(!isDrawing) return;
  //check to see if mouse event working
  // console.log(e);
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  // ctx.lineWidth = hue; // if want width of line to change with hue
  ctx.beginPath();
  //start with x/y and move to x/y
  ctx.moveTo(lastX, lastY);
  //Go to: e.offsetX & Y coming from event called
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  //set lastX&Y to end point of draw,
  lastX  = e.offsetX;
  lastY = e.offsetY;
  //in a destructured array
  // [lastX, lastY] = [e.offsetX, e.offsetY];

  //increment hue through spectrum, then reset to 0 when get to top
  hue++;
  if (hue >= 360){
    hue = 0;
  };

//if line greater than or less than, flip direction of width growth
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }

  if(direction){
    ctx.lineWidth++;
    }else {
      ctx.lineWidth--;
    }

};

//decide if drawing or not
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  //to start at mousedown point
  lastX  = e.offsetX;
  lastY = e.offsetY;
});
//move event on canvas
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


});
