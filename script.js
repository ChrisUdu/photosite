
// Event Listener for the Active Dropdown we are creating
document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest('data-dropdown') != null) return

    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })
})

// Adding structure to our carousel. The items can be found at the bottom of the html file!
const images = document.querySelectorAll('.photo img');
const modal = document.getElementById('carousel-modal');
const modalImg = document.getElementById('carousel-image');
const closeBtn = document.getElementById('close-carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;
const imageSources = Array.from(images).map(img => img.src);

images.forEach((img, index) => {
img.addEventListener('click', () => {
    currentIndex = index;
    openCarousel();
});
});


function openCarousel() {
    modalImg.src = imageSources[currentIndex];
    modal.classList.remove('hidden');
}

function closeCarousel() {
    modal.classList.add('hidden');
}

function showNext() {
    modalImg.style.opacity = 0;
    setTimeout(() => {
    currentIndex = (currentIndex + 1) % imageSources.length;
    modalImg.src = imageSources[currentIndex];
    modalImg.style.opacity = 1;
    },
    //play around with ms below for optimal smooth transition
    350);
}

function showPrev() {
    modalImg.style.opacity = 0;
    setTimeout(() => {
    currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    modalImg.src = imageSources[currentIndex];
    modalImg.style.opacity = 1;
    }, 
    350);
}

closeBtn.addEventListener('click', closeCarousel);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCarousel();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});



//See if the touch swipe js below works on mobile
let touchStartX = 0;
let touchEndX = 0;


modalImg.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});


modalImg.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  const swipeDistance = touchEndX - touchStartX;

  const threshold = 50;

  if (swipeDistance > threshold) {
    showPrev();
  } else if (swipeDistance < -threshold) {
    showNext();
  }
}

