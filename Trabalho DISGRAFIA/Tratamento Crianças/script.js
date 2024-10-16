
const canvas = document.getElementById('caligrafia');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    drawing = true;
    draw(e);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

document.getElementById('clear-canvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


const words = document.querySelectorAll('.word');
const images = document.querySelectorAll('.image');
let stars = 0;

words.forEach(word => {
    word.addEventListener('dragstart', dragStart);
});

images.forEach(image => {
    image.addEventListener('dragover', dragOver);
    image.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.textContent);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const word = e.dataTransfer.getData('text');
    const match = e.target.dataset.match;

    if (word === match) {
        e.target.style.backgroundColor = '#98fb98';
        stars++;
        updateStars();
    }
}

function updateStars() {
    document.getElementById('stars').textContent = '⭐'.repeat(stars);
}
