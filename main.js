import * as THREE from 'three';

// --- Background Starfield ---
export function initBackground() {
    const bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;

    const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);

    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 5;

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const posArray = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMaterial = new THREE.PointsMaterial({ size: 0.01, color: 0xffffff, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    bgScene.add(stars);

    function animateBg() {
        requestAnimationFrame(animateBg);
        stars.rotation.y += 0.0001;
        bgRenderer.render(bgScene, bgCamera);
    }
    animateBg();

    window.addEventListener('resize', () => {
        bgCamera.aspect = window.innerWidth / window.innerHeight;
        bgCamera.updateProjectionMatrix();
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize MathJax
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        packages: { '[+]': ['physics'] }
    },
    svg: {
        fontCache: 'global'
    }
};

// Sidebar Active State
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    initBackground();
});
