export function initBackToTop() {

    const button =
        document.getElementById("back-to-top");

    if (!button) {
        return;
    }


    function updateButton() {

        if (window.scrollY > 500) {
            button.classList.add("visible");
        } else {
            button.classList.remove("visible");
        }

    }


    updateButton();


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener("click", () => {

        const modal =
            document.getElementById("modal-overlay");


        if (
            modal &&
            modal.classList.contains("active")
        ) {

            modal.classList.remove("active");
            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}