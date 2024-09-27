//mobile nav
const menu_btn = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-nav");
const aboutpage = document.getElementById("aboutme");
const cards = document.querySelectorAll(".card");

menu_btn.addEventListener("click", function () {
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

document.addEventListener("DOMContentLoaded", () => {
  function makeImageDance(id, startRotation, endRotation) {
    const element = document.getElementById(id);

    // Check if element exists
    if (!element) {
      return; // Exit the function if the element is not found
    }

    let rotatingForward = true;

    const danceInterval = setInterval(() => {
      if (!element.matches(":hover")) {
        // Only animate if not hovered
        if (rotatingForward) {
          element.style.transform = `rotate(${endRotation}deg)`;
        } else {
          element.style.transform = `rotate(${startRotation}deg)`;
        }
        rotatingForward = !rotatingForward;
      }
    }, 500); // 500ms for smooth animation
  }

  // Apply the dance effect only if the element exists
  const idsToAnimate = [
    { id: "dino", startRotation: 0, endRotation: 20 },
    { id: "arm", startRotation: -40, endRotation: 0 },
    { id: "PC", startRotation: -25, endRotation: -50 },
    { id: "Baseball", startRotation: 0, endRotation: 30 },
    { id: "Boogie", startRotation: -80, endRotation: -50 },
    { id: "camera", startRotation: 0, endRotation: -40 },
    { id: "hint", startRotation: 10, endRotation: -10 },
  ];

  idsToAnimate.forEach(({ id, startRotation, endRotation }) => {
    makeImageDance(id, startRotation, endRotation);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Get all images and their corresponding dialogs
  const images = [
    {
      image: document.getElementById("dino"),
      dialog: document.getElementById("dialog-dino"),
    },
    {
      image: document.getElementById("arm"),
      dialog: document.getElementById("dialog-arm"),
    },
    {
      image: document.getElementById("PC"),
      dialog: document.getElementById("dialog-pc"),
    },
    {
      image: document.getElementById("Baseball"),
      dialog: document.getElementById("dialog-baseball"),
    },
    {
      image: document.getElementById("Boogie"),
      dialog: document.getElementById("dialog-boogie"),
    },
    {
      image: document.getElementById("camera"),
      dialog: document.getElementById("dialog-camera"),
    },
  ];

  // Function to open the dialog from the clicked image
  function openDialogFromImage(image, dialog) {
    image.addEventListener("click", () => {
      // Get the image's position on the screen
      const imgPosition = image.getBoundingClientRect();
      const dialogBox = dialog.querySelector(".dialog-box");

      // Set initial dialog position to the image's position
      dialog.style.top = `${imgPosition.top}px`;
      dialog.style.left = `${imgPosition.left}px`;
      dialog.showModal();

      // Animate the dialog to its final position
      setTimeout(() => {
        dialog.classList.add("active");
        dialog.style.top = "50%";
        dialog.style.left = "50%";
        dialog.style.transform = "translate(-50%, -50%)"; // Use your existing CSS transitions for fade-in and scaling
      }, 5);
    });
  }

  // Function to close the dialog when clicking outside
  function setupCloseOnClickOutside(dialog) {
    document.addEventListener(
      "click",
      (e) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialog.close();
          dialog.classList.remove("active");
        }
      },
      true // Use capture phase to ensure it catches clicks before they reach the dialog
    );
  }

  //Tarot cards

  // Attach event listeners to open dialogs from the clicked image
  images.forEach(({ image, dialog }) => {
    openDialogFromImage(image, dialog);
  });

  // Setup click outside to close for each dialog
  images.forEach(({ dialog }) => {
    setupCloseOnClickOutside(dialog);
  });
});

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("active"); // Toggle the 'active' class on the clicked card
  });
});

// Stars
const starContainer = document.querySelector(".star-container");
const numberOfStars = 400; // Adjust as needed

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  // Check screen width
  const screenWidth = window.innerWidth;
  const maxVh = screenWidth < 870 ? 200 : 100;

  // Random position
  star.style.top = `${getRandomNumber(0, maxVh)}vh`;
  star.style.left = `${getRandomNumber(0, 100)}vw`;

  // Random size
  const size = getRandomNumber(1, 3); // Star size between 1px and 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Random animation duration
  const animationDuration = getRandomNumber(1.5, 3); // Animation duration between 1.5s and 3s
  star.style.animationDuration = `${animationDuration}s`;

  return star;
}

function createStars() {
  starContainer.innerHTML = ""; // Clear existing stars
  for (let i = 0; i < numberOfStars; i++) {
    const star = createStar();
    starContainer.appendChild(star);
  }
}

// Initial star creation
createStars();

// Recreate stars on window resize
window.addEventListener("resize", createStars);
