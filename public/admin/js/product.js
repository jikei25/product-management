const changeStatusButtons = document.querySelectorAll("[button-change-status]");
if (changeStatusButtons.length > 0) {
    const form = document.querySelector("#form-change-status");
    const path = form.getAttribute("path");
    changeStatusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");
            const changeStatus = (status == "active") ? "inactive" : "active";
            
            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            form.action = action;

            form.submit();
        });
    });
}
