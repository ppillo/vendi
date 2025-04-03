// Initialize ScrollMagic Controller
const controller = new ScrollMagic.Controller();

// Get video element
const video = document.querySelector('.panel-video');

// define movement of panels
var wipeAnimation = new TimelineMax()
  .fromTo("section.panel.panel-2", 1, { x: "-100%" }, { x: "0%", ease: Linear.easeNone })  // in from left
  .fromTo("section.panel.panel-3", 1, { x: "100%" }, { x: "0%", ease: Linear.easeNone })  // in from right
  .fromTo("section.panel.panel-4", 1, { y: "-100%" }, { y: "0%", ease: Linear.easeNone }) // in from top
  .fromTo("section.panel.panel-5", 1, { y: "100%" }, { y: "0%", ease: Linear.easeNone }) // in from bottom
  .fromTo("section.panel.panel-6", 1, { y: "-100%" }, { y: "0%", ease: Linear.easeNone }, "playVideo") // in from top
  .fromTo(video, 1, { opacity: 0 }, { opacity: 1 }, "playVideo"); // fade in video

// Create scenes for each panel
const createScenes = () => {
  new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "500%" // Adjusted for 5 panels (100% per panel)
  })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
    .on("progress", function (e) {
      // Check if we're at the video panel (around 80-100% of the scroll)
      if (e.progress >= 0.8) {
        video.play().catch(function (error) {
          console.log("Video play failed:", error);
        });
      } else {
        video.pause();
        video.currentTime = 0;
      }
    })
    .addTo(controller);
};

// Initialize scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  createScenes();
});

// Handle window resize
window.addEventListener('resize', () => {
  controller.update(true);
}); 