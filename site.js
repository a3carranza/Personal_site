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

document.addEventListener("DOMContentLoaded", () => {
  // Get all images and their corresponding dialogs
  const dinoImage = document.getElementById("dino");
  const armImage = document.getElementById("arm");
  const pcImage = document.getElementById("PC");
  const baseballImage = document.getElementById("Baseball");
  const boogieImage = document.getElementById("Boogie");
  const cameraImage = document.getElementById("camera");

  const dinoDialog = document.getElementById("dialog-dino");
  const armDialog = document.getElementById("dialog-arm");
  const pcDialog = document.getElementById("dialog-pc");
  const baseballDialog = document.getElementById("dialog-baseball");
  const boogieDialog = document.getElementById("dialog-boogie");
  const cameraDialog = document.getElementById("dialog-camera");

  // Function to open a dialog
  function openDialog(image, dialog) {
    image.addEventListener("click", () => {
      dialog.showModal();
    });
  }

  // Function to close a dialog when clicking outside
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
        }
      },
      true
    ); // Use capture phase to ensure it catches clicks before they reach the dialog
  }

  // Attach event listeners to open dialogs
  openDialog(dinoImage, dinoDialog);
  openDialog(armImage, armDialog);
  openDialog(pcImage, pcDialog);
  openDialog(baseballImage, baseballDialog);
  openDialog(boogieImage, boogieDialog);
  openDialog(cameraImage, cameraDialog);

  // Setup click outside to close for each dialog
  [
    dinoDialog,
    armDialog,
    pcDialog,
    baseballDialog,
    boogieDialog,
    cameraDialog,
  ].forEach(setupCloseOnClickOutside);
});
