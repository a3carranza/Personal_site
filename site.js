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
    { id: "Nacho", startRotation: 20, endRotation: -15 },
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
      image: document.getElementById("Nacho"),
      dialog: document.getElementById("dialog-Nacho"),
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
    if (!image || !dialog) return; // <-- FIX

    image.addEventListener("click", () => {
      const imgPosition = image.getBoundingClientRect();

      dialog.style.top = `${imgPosition.top}px`;
      dialog.style.left = `${imgPosition.left}px`;
      dialog.showModal();

      requestAnimationFrame(() => {
        dialog.classList.add("active");
        dialog.style.top = "50%";
        dialog.style.left = "50%";
        dialog.style.transform = "translate(-50%, -50%)";
      });
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
      true, // Use capture phase to ensure it catches clicks before they reach the dialog
    );
  }

  // Attach event listeners to open dialogs from the clicked image
  images.forEach(({ image, dialog }) => {
    openDialogFromImage(image, dialog);
  });

  // Setup click outside to close for each dialog
  images.forEach(({ dialog }) => {
    setupCloseOnClickOutside(dialog);
  });
});

//Tarot cards

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints;

if (isTouchDevice) {
  // Handle click effect for touch devices
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("active"); // Toggle the 'active' class on the clicked card
    });
  });
} else {
  // For non-touch devices, use hover effect
  // No additional JS needed; it's handled by CSS
}
// === FLICKERING STARFIELD ===
const starContainer = document.querySelector(".star-container");
if (starContainer) {
  const style = document.createElement("style");
  document.head.appendChild(style);

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function buildStarSet(count) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        `${Math.floor(rand(0, w))}px ${Math.floor(
          rand(0, h),
        )}px rgba(255,255,255,${rand(0.4, 1).toFixed(2)})`,
      );
    }
    return stars.join(",");
  }

  function buildStars() {
    const set1 = buildStarSet(180);
    const set2 = buildStarSet(100);

    style.textContent = `
      @keyframes flicker1 {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 0.2; }
      }
      @keyframes flicker2 {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.9; }
      }
      .star-container::before {
        content: "";
        position: absolute;
        inset: 0;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: ${set1};
        animation: flicker1 3s ease-in-out infinite;
      }
      .star-container::after {
        content: "";
        position: absolute;
        inset: 0;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        box-shadow: ${set2};
        animation: flicker2 3s ease-in-out infinite;
      }
    `;
  }

  buildStars();
  window.addEventListener("resize", () => {
    clearTimeout(window.__stars);
    window.__stars = setTimeout(buildStars, 300);
  });
}

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
