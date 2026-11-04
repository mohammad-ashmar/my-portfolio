let activeModalType = null;

export function initModal() {

    const overlay =
        document.getElementById("modal-overlay");

    const modal =
        overlay?.querySelector(".modal");

    const closeButton =
        document.getElementById("modal-close");

    const content =
        document.getElementById("modal-content");

    if (!overlay || !modal || !closeButton || !content) {
        return;
    }


    /* Close button */

    closeButton.addEventListener("click", closeModal);


    /* Outside click */

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {
            closeModal();
        }

    });


    /* Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            overlay.classList.contains("active")
        ) {
            closeModal();
        }

    });


    /* Project cards */

    document.addEventListener("click", event => {

        const projectCard =
            event.target.closest(".project-card");

        if (!projectCard) {
            return;
        }

        openProjectModal(projectCard);

    });


    /* Get in touch */

    document.addEventListener("click", event => {

        const contactButton =
            event.target.closest(".modal-contact-btn");

        if (!contactButton) {
            return;
        }

        event.preventDefault();

        closeModal();

        setTimeout(() => {

            document
                .getElementById("contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }, 100);

    });


    /* Focus trap */

    modal.addEventListener("keydown", event => {

        if (
            event.key !== "Tab" ||
            !overlay.classList.contains("active")
        ) {
            return;
        }

        const focusable =
            modal.querySelectorAll(
                'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

        if (!focusable.length) {
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {

            event.preventDefault();
            last.focus();

        } else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {

            event.preventDefault();
            first.focus();

        }

    });


    function openProjectModal(card) {

        let projectData;

        try {

            projectData =
                JSON.parse(card.dataset.project);

        } catch {
            return;
        }


        activeModalType = "project";


        const technologies =
            (projectData.technologies || [])
                .map(
                    technology =>
                        `<span class="tech-tag">${technology}</span>`
                )
                .join("");


        const githubButton =
            projectData.github
                ? `
                    <a
                        href="${projectData.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-secondary"
                    >
                        GitHub
                    </a>
                `
                : "";


        const liveButton =
            projectData.live
                ? `
                    <a
                        href="${projectData.live}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-primary"
                    >
                        Live Website
                    </a>
                `
                : "";


        content.innerHTML = `

            <img
                class="modal-image"
                src="${projectData.image || ""}"
                alt="${projectData.name || "Project"}"
                onerror="this.style.display='none';"
            >

            <div class="modal-body">

                <h2 id="modal-title">
                    ${projectData.name}
                </h2>

                <p>
                    ${projectData.description}
                </p>

                <div class="modal-technologies">
                    ${technologies}
                </div>

                <div class="modal-actions">
                    ${githubButton}
                    ${liveButton}
                </div>

            </div>
        `;


        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        closeButton.focus();

    }


    function closeModal() {

        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        content.innerHTML = "";

        activeModalType = null;

    }

}