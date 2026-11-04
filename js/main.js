import { initNavigation } from "./modules/navigation.js";
import { initProjects } from "./modules/projects.js";
import { initServices } from "./modules/services.js";
import { initModal } from "./modules/modal.js";
import { initAnimations } from "./modules/animations.js";
import { initContact } from "./modules/contact.js";
import { initBackToTop } from "./modules/backToTop.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initProjects();
    initServices();
    initModal();
    initAnimations();
    initContact();
    initBackToTop();
});