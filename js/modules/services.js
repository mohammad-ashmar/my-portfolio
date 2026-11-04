const services = {

    website: {
        name: "Website Development",

        description:
            "I build modern responsive websites with clean structure, clear navigation, and a strong focus on usability and performance.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript"
        ]
    },


    frontend: {
        name: "Frontend Development",

        description:
            "I create responsive and interactive frontend interfaces that work smoothly across desktop, tablet, and mobile devices.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ]
    },


    backend: {
        name: "Backend Development",

        description:
            "I develop structured backend systems and APIs that connect application logic with databases and frontend applications.",

        technologies: [
            "Node.js",
            "Express.js",
            "JavaScript"
        ]
    },


    fullstack: {
        name: "Full-Stack Development",

        description:
            "I build complete web applications by connecting frontend interfaces, backend APIs, business logic, and databases.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Express.js"
        ]
    },


    database: {
        name: "Database Development",

        description:
            "I design structured databases around application requirements, relationships, and data management needs.",

        technologies: [
            "SQL",
            "Prisma"
        ]
    },


    ui: {
        name: "UI Implementation",

        description:
            "I transform UI designs into responsive and maintainable interfaces while keeping the implementation clean and consistent.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ]
    }

};


export function initServices() {

    const serviceCards =
        document.querySelectorAll(".service-card");

    const modalOverlay =
        document.getElementById("modal-overlay");

    const modalContent =
        document.getElementById("modal-content");

    if (!modalOverlay || !modalContent) {
        return;
    }


    serviceCards.forEach(card => {

        card.addEventListener("click", () => {

            const service =
                services[card.dataset.service];

            if (!service) {
                return;
            }


            const technologies =
                service.technologies
                    .map(
                        technology =>
                            `<span class="tech-tag">${technology}</span>`
                    )
                    .join("");


            modalContent.innerHTML = `

                <div class="service-modal-content">

                    <div class="service-modal-header">
                        <span>Service</span>
                    </div>

                    <div class="modal-body">

                        <h2 id="modal-title">
                            ${service.name}
                        </h2>

                        <p>
                            ${service.description}
                        </p>

                        <div class="modal-technologies">
                            ${technologies}
                        </div>

                        <a
                            href="#contact"
                            class="btn btn-primary modal-contact-btn"
                        >
                            Get in Touch
                        </a>

                    </div>

                </div>

            `;


            modalOverlay.classList.add("active");
            modalOverlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");


            const closeButton =
                document.getElementById("modal-close");

            closeButton?.focus();

        });

    });

}