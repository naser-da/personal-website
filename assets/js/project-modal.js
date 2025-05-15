// Project Modal Carousel
class ProjectCarousel {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.carousel = document.querySelector('.carousel-container');
    this.prevBtn = document.querySelector('.carousel-btn.prev-btn');
    this.nextBtn = document.querySelector('.carousel-btn.next-btn');
    this.dotsContainer = document.querySelector('.carousel-dots');
  }

  init() {
    if (this.prevBtn && this.nextBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }
  }

  setImages(images) {
    this.images = images;
    this.currentIndex = 0;
    this.updateImage();
    this.updateDots();
  }

  updateImage() {
    if (this.images.length === 0) return;
    
    const img = document.createElement('img');
    img.src = this.images[this.currentIndex];
    img.alt = 'Project screenshot';
    img.className = 'carousel-image';
    
    this.carousel.innerHTML = '';
    this.carousel.appendChild(img);
  }

  updateDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i < this.images.length; i++) {
      const dot = document.createElement('button');
      dot.className = `dot ${i === this.currentIndex ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateImage();
        this.updateDots();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
    this.updateDots();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
    this.updateDots();
  }
}

// Initialize carousel
const carousel = new ProjectCarousel();
carousel.init();

// Project modal functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get modal elements
  const modalContainer = document.querySelector('[data-projects-modal-container]');
  const modal = document.querySelector('.project-modal');
  const closeBtn = document.querySelector('[data-modal-projects-close-btn]');
  const overlay = document.querySelector('[data-projects-overlay]');

  // Add click event listeners to project items
  document.querySelectorAll('[data-projects-item]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const title = item.querySelector('[data-project-title]').textContent;
      const text = item.querySelector('[data-project-text]').textContent;
      const link = item.querySelector('[data-project-modal-link]').textContent;
      const images = item.querySelector('[data-project-images]').textContent.split('\n').map(img => img.trim()).filter(img => img);
      
      // Update modal content
      modal.querySelector('[data-project-modal-title]').textContent = title;
      modal.querySelector('[data-project-modal-text]').innerHTML = text;
      modal.querySelector('[data-project-modal-link]').href = link;
      
      // Set carousel images
      carousel.setImages(images);
      
      // Show modal
      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal when clicking close button
  closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when clicking overlay
  overlay.addEventListener('click', () => {
    modalContainer.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
      modalContainer.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  });
}); 