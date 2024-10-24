// Button Status
const buttons = document.querySelectorAll("[button-status]");
if (buttons.length > 0) {
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let url = new URL(window.location.href);
            const buttonStatus = button.getAttribute("button-status");
            if (buttonStatus) {
                url.searchParams.set("status", buttonStatus);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url;
        });
    });
}
