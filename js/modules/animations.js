
export function initAnimations() {

    const loadingScreen =
        document.getElementById("loading-screen");

    /* =========================
       LOADING SCREEN
    ========================= */

    if (loadingScreen) {

        window.addEventListener("load", () => {

            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";

            setTimeout(() => {
                loadingScreen.remove();
            }, 300);

        });

    }


    /* =========================
       REVEAL ANIMATIONS
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    } else {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    }


    /* =========================
       DYNAMIC STATISTICS
    ========================= */

    const stats =
        document.querySelectorAll(".stat-number");


    // Count actual projects
    const projects =
        document.querySelectorAll(
            "#projects-grid [data-category]"
        );

    const projectCount = projects.length;


    // Count actual technologies
    const technologyCount =
        document.querySelectorAll(".skill-card").length;


    // Count unique project categories
    const categories =
        new Set(
            Array.from(projects)
                .map(project => project.dataset.category)
                .filter(Boolean)
        ).size;


    const values = {
        projects: projectCount,
        technologies: technologyCount,
        categories: categories
    };


    /* =========================
       STATS ANIMATION
    ========================= */

    if (prefersReducedMotion) {

        stats.forEach(element => {

            const key = element.dataset.stat;

            element.textContent = values[key] ?? 0;

        });

        return;
    }


    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target;

                    const key = element.dataset.stat;

                    const target = values[key] ?? 0;

                    animateNumber(element, target);

                    statsObserver.unobserve(element);

                });

            },
            {
                threshold: 0.5
            }
        );


    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

}


/* =========================
   NUMBER ANIMATION
========================= */

function animateNumber(element, target) {

    if (target === 0) {
        element.textContent = "0";
        return;
    }

    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {

        const elapsed = currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const value =
            Math.floor(progress * target);

        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);

}