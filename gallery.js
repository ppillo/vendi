// Initialize ScrollMagic Controller
const controller = new ScrollMagic.Controller();

// define movement of panels
var wipeAnimation = new TimelineMax()
  .fromTo("section.panel.panel-2", 1, { x: "-100%" }, { x: "0%", ease: Linear.easeNone })  // in from left
  .fromTo("section.panel.panel-3", 1, { x: "100%" }, { x: "0%", ease: Linear.easeNone })  // in from right
  .fromTo("section.panel.panel-4", 1, { y: "-100%" }, { y: "0%", ease: Linear.easeNone }); // in from top


// Create scenes for each panel
const createScenes = () => {
  new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "400%"
  })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
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