# 40KB Image Compressor

A lightweight, client-side web application designed to automatically compress and resize photos until they fit under the **40KB** threshold. Perfect for job application forms, government exam portals, and passport uploads.

<a href="https://patilamar184.github.io/image-compressor/" target="_blank" rel="noopener noreferrer">✨ View Live Demo</a>

## 🚀 Features

- **Drag & Drop Support:** Easily upload images by dragging them right into the browser or selecting them from your device.
- **Client-Side Processing:** All compression happens directly in your browser using the HTML5 Canvas API—no data is uploaded to an external server, ensuring complete privacy.
- **Automatic Compression Loop:** Dynamically adjusts image quality and dimensions until the file size drops below 40KB.
- **Side-by-Side Preview:** Compare the original image size and preview against the compressed result instantly.
- **One-Click Download:** Download your optimized image immediately.

## 🛠️ Built With

- **HTML5:** Semantic structure and file input handling.
- **CSS3:** Modern styling, flexbox/grid layout, and clean UI design.
- **JavaScript (ES6):** File API, `FileReader`, and HTML5 `<canvas>` manipulation.

## 📂 Project Structure

```text
40kb-image-compressor/
├── index.html   # Main HTML layout & upload interface
├── style.css    # Styling, cards, and responsive design
└── script.js    # Image reading, compression algorithm, and download logic