export function initContact() {

    const form =
        document.getElementById("contact-form");

    const status =
        document.getElementById("form-status");

    if (!form || !status) {
        return;
    }


    const fields = {
        name: form.querySelector("#name"),
        email: form.querySelector("#email"),
        message: form.querySelector("#message"),
        website: form.querySelector("#website")
    };


    form.addEventListener("submit", async event => {

        event.preventDefault();

        clearErrors();

        status.textContent = "";
        status.className = "form-status";


        /* Honeypot */

        if (fields.website.value.trim() !== "") {
            return;
        }


        /* Validation */

        let valid = true;


        if (!fields.name.value.trim()) {

            showError(
                "name",
                "Please enter your name."
            );

            valid = false;
        }


        if (!fields.email.value.trim()) {

            showError(
                "email",
                "Please enter your email."
            );

            valid = false;
        }


        if (!fields.message.value.trim()) {

            showError(
                "message",
                "Please enter your message."
            );

            valid = false;
        }


        if (!valid) {
            return;
        }


        const submitButton =
            form.querySelector(
                ".contact-submit"
            );


        submitButton.disabled = true;
        submitButton.textContent = "Sending…";


        /*
            IMPORTANT:

            Replace this URL with your actual form
            service endpoint before using the form
            in production.

            Example providers:
            Formspree
            Web3Forms
            EmailJS
        */

        const FORM_ENDPOINT =
            "YOUR_FORM_ENDPOINT";


        try {

            if (
                FORM_ENDPOINT ===
                "YOUR_FORM_ENDPOINT"
            ) {

                /*
                    Development fallback.

                    Opens the user's email application.
                */

                const name =
                    encodeURIComponent(
                        fields.name.value.trim()
                    );

                const email =
                    encodeURIComponent(
                        fields.email.value.trim()
                    );

                const message =
                    encodeURIComponent(
                        fields.message.value.trim()
                    );


                const subject =
                    encodeURIComponent(
                        `Portfolio contact from ${decodeURIComponent(name)}`
                    );


                window.location.href =
                    `mailto:YOUR_EMAIL@example.com?subject=${subject}&body=Name:%20${name}%0AEmail:%20${email}%0A%0A${message}`;


                submitButton.disabled = false;
                submitButton.textContent = "Send";

                return;
            }


            const formData =
                new FormData(form);


            const response =
                await fetch(
                    FORM_ENDPOINT,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {
                throw new Error("Request failed");
            }


            form.reset();

            status.textContent =
                "Your message has been sent successfully.";

            status.className =
                "form-status success";


        } catch (error) {

            status.textContent =
                "Something went wrong. Please try again.";

            status.className =
                "form-status error";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send";

        }

    });


    function showError(field, message) {

        const error =
            form.querySelector(
                `[data-error-for="${field}"]`
            );

        if (error) {
            error.textContent = message;
        }

    }


    function clearErrors() {

        form.querySelectorAll(".form-error")
            .forEach(error => {
                error.textContent = "";
            });

    }

}