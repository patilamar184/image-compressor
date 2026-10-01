const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const uploadTrigger = document.getElementById('upload-trigger');
const resultSection = document.getElementById('result-section');

const originalImg = document.getElementById('original-img');
const originalSize = document.getElementById('original-size');
const compressedImg = document.getElementById('compressed-img');
const compressedSize = document.getElementById('compressed-size');

const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

let compressedBlob = null;
let originalFileName = 'compressed-image.jpg';

// Trigger file select window on click
uploadTrigger.addEventListener('click', () => fileInput.click());

// Handle file selection
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        processImage(e.target.files[0]);
    }
});

// Drag & Drop handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--accent-color)';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'var(--border-color)';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--border-color)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processImage(e.dataTransfer.files[0]);
    }
});

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}

function processImage(file) {
    originalFileName = file.name;
    originalSize.textContent = formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
        originalImg.src = e.target.result;

        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            compressToTargetSize(img, file.type);
        };
    };
    reader.readAsDataURL(file);
}

function compressToTargetSize(img, fileType) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let width = img.width;
    let height = img.height;

    // Scale down dimensions slightly if the image is massive to help hit target size easier
    const MAX_DIMENSION = 1200;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
        } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
        }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Target size: 40KB = 40 * 1024 bytes
    const targetBytes = 40 * 1024;
    let quality = 0.9;
    let mimeType = fileType === 'image/png' ? 'image/jpeg' : fileType; // JPEG/WebP compress better for size goals

    function attemptCompression() {
        canvas.toBlob((blob) => {
            compressedBlob = blob;
            compressedSize.textContent = formatBytes(blob.size);
            
            const compressedUrl = URL.createObjectURL(blob);
            compressedImg.src = compressedUrl;

            // If still too big and quality can be lowered, reduce quality and loop
            if (blob.size > targetBytes && quality > 0.1) {
                quality -= 0.1;
                attemptCompression();
            } else {
                // Show results
                dropZone.classList.add('hidden');
                resultSection.classList.remove('hidden');
            }
        }, mimeType, quality);
    }

    attemptCompression();
}

// Download action
downloadBtn.addEventListener('click', () => {
    if (!compressedBlob) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedBlob);
    link.download = `compressed_40kb_${originalFileName}`;
    link.click();
});

// Reset action
resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    compressedBlob = null;
    resultSection.classList.add('hidden');
    dropZone.classList.remove('hidden');
});