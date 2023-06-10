const r180 = Math.PI;
const r90 = Math.PI / 2;
const r15 = Math.PI / 12;
const color = '#88888825';
const random = Math.random;
const len = 6;
const canvas = document.querySelector('canvas');
const width = window.innerWidth;
const height = window.innerHeight;

const size = {
    width,
    height
};

function initCanvas(canvas, width = 400, height = 400, _dpi) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    const dpi = _dpi || dpr / bsr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = dpi * width;
    canvas.height = dpi * height;
    ctx.scale(dpi, dpi);
    return { ctx, dpi };
}

let prevSteps = [];

let peddingTasks = [];

const randomMiddle = () => random() * 0.6 + 0.2;

const init = () => {
    ctx.strokeStyle = color;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    peddingTasks = [
        () => step(randomMiddle() * size.width, -5, r90),
        () => step(randomMiddle() * size.width, size.height + 5, -r90),
        () => step(-5, randomMiddle() * size.height, 0),
        () => step(size.width + 5, randomMiddle() * size.height, r180),
    ];
};

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    return [x + dx, y + dy];
}

const { ctx } = initCanvas(canvas, size.width, size.height);

function step(x, y, rad, depth = 0){
    const length = random() * len;
    const [nx, ny] = polar2cart(x, y, length, rad);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nx, ny);
    ctx.stroke();

    const rad1 = rad + random() * r15;

    const rad2 = rad - random() * r15;

    if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100)
        return;

    const rate = depth <= 5
        ? 0.8
        : 0.5;
    if(random() < rate){
        peddingTasks.push(
            () => step(nx, ny, rad1, depth + 1)
        );
    }
    if(random() < rate){
        peddingTasks.push(
            () => step(nx, ny, rad2, depth + 1)
        );
    }
}

function frame(){
    prevSteps = [...peddingTasks];
    peddingTasks.length = 0;
    prevSteps.forEach((i) => {
        if (random() < 0.5)
            peddingTasks.push(i);
        else
            i();
    });
}
init();
let frameCount = 0;
function startFrame() {
    requestAnimationFrame(()=>{
        frameCount +=1;
        if(frameCount % 3 == 0)
            frame();
        startFrame();
    });
}

startFrame();
