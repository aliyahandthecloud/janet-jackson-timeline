// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function () {
  // Get all the elements we need
  const timelineContainer = document.getElementById('timeline-1');
  const timelineItems = document.querySelectorAll('.timeline-item');

  // Make sure we found the elements
  if (!timelineContainer || timelineItems.length === 0) {
    console.error('Timeline elements not found! Check your HTML.');
    return;
  }

  // Activate the first item by default
  if (timelineItems.length > 0) {
    timelineItems[0].classList.add('timeline-item--active');

    // Set the initial background image from the first timeline item
    const firstImage = timelineItems[0].querySelector('.timeline__img');
    if (firstImage && firstImage.src) {
      timelineContainer.style.backgroundImage = `url(${firstImage.src})`;
    }
  }

  // Function to update which timeline item is active
  function updateActiveItem() {
    // Get how far down the page we've scrolled
    const scrollPosition = window.scrollY;

    // Check each timeline item
    timelineItems.forEach((item, index) => {
      // Get the position of this item on the page
      const itemTop = item.offsetTop;
      const itemBottom = itemTop + item.offsetHeight;

      // Check if this item is currently in view
      // We check if scroll position is within the item's boundaries
      if (
        scrollPosition >= itemTop - 300 &&
        scrollPosition < itemBottom - 300
      ) {
        // Remove active class from all items
        timelineItems.forEach((ti) =>
          ti.classList.remove('timeline-item--active')
        );

        // Add active class to this item
        item.classList.add('timeline-item--active');

        // Change the background image
        const itemImage = item.querySelector('.timeline__img');
        if (itemImage && itemImage.src) {
          timelineContainer.style.backgroundImage = `url(${itemImage.src})`;
        }
      }
    });
  }

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveItem);

  // Run once on page load to set initial state
  updateActiveItem();

  console.log('Timeline initialized successfully!');
});
