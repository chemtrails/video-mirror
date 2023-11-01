const rotatedClass = '__mirror-extension-rotated__';
const duration = 500;

let target = null;

document.onmouseup = e => {
    if (e.button !== 2 || e.shiftKey !== true) return;
    target = e.target.querySelector('video') || e.target;
}

document.oncontextmenu = (e) => {
    target = e.target.querySelector('video') || e.target;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (target === null || request.id !== 'mirror') return;
    mirror();
});

function mirror() {
    if (target.classList.contains(rotatedClass) !== true) {

        target.animate(
            [
                { transform: 'rotateY(0)' },
                { transform: 'rotateY(180deg)' }
            ],
            {
                duration: duration,
                iterations: 1,
                fill: 'both'
            }
        );

        target.classList.add(rotatedClass);
        target.setAttribute('data-mirror-angle', `180`);
    } else {
        const angle = parseInt(target.getAttribute('data-mirror-angle'));

        target.animate(
            [
                { transform: `rotateY(${angle}deg)` },
                { transform: `rotateY(${angle + 180}deg)` },
            ],
            {
                duration: duration,
                iterations: 1,
                fill: 'both'
            }
        );

        target.setAttribute('data-mirror-angle', `${angle + 180}`);
    }

    target = null;
}

