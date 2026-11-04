export function initNavigation() {

    const header = document.getElementById("site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("main-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    if (!header || !menuToggle || !menu) {
        return;
    }


    /* Header on scroll */

    function updateHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* Mobile menu */

    function openMenu() {

        menu.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");

        document.body.classList.add("no-scroll");
    }


    function closeMenu() {

        menu.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        document.body.classList.remove("no-scroll");
    }


    menuToggle.addEventListener("click", () => {

        if (menu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* Close when clicking a link */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", event => {

        if (
            menu.classList.contains("active") &&
            !menu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /* Escape */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* Active navigation */

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-link[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });

}