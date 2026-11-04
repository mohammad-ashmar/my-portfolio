
export function initProjects() {

    const grid = document.getElementById("projects-grid");
    const filters = document.querySelectorAll(".filter-btn");
    const emptyState = document.getElementById("projects-empty");

    if (!grid) return;

    // Get all projects using their category attribute
    const projects = Array.from(
        grid.querySelectorAll("[data-category]")
    );

    function filterProjects(category) {

        let visibleCount = 0;

        projects.forEach(project => {

            const projectCategory = project.dataset.category;

            const shouldShow =
                category === "all" ||
                projectCategory === category;

            if (shouldShow) {

                project.style.display = "";

                requestAnimationFrame(() => {
                    project.classList.add("visible");
                });

                visibleCount++;

            } else {

                project.style.display = "none";
                project.classList.remove("visible");

            }

        });

        // Show empty message only when no projects match
        if (emptyState) {
            emptyState.style.display =
                visibleCount === 0 ? "block" : "none";
        }

    }

    // Filter button events
    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterProjects(button.dataset.filter);

        });

    });

    // Initial state
    filterProjects("all");

}