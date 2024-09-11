//mobile nav
const menu_btn = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-nav");

menu_btn.addEventListener("click", function () {
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

// dancing images
function makeImageDance(id, startRotation, endRotation) {
  const element = document.getElementById(id);
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

// Apply the dance effect to each image
makeImageDance("dino", 0, 20);
makeImageDance("arm", -40, 0);
makeImageDance("PC", -25, -50);
makeImageDance("Baseball", 0, 30);
makeImageDance("Boogie", -80, -50);
makeImageDance("camera", 0, -40);
makeImageDance("hint", 10, -10);

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

  // Attach event listeners to open dialogs from the clicked image
  images.forEach(({ image, dialog }) => {
    openDialogFromImage(image, dialog);
  });

  // Setup click outside to close for each dialog
  images.forEach(({ dialog }) => {
    setupCloseOnClickOutside(dialog);
  });
});
