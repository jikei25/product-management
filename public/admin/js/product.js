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

// Change Status Multi

const checkAllButton = document.querySelector("input[name='checkall']");
const checkIdButtons = document.querySelectorAll("input[name='id']");
if (checkAllButton) {
    checkAllButton.addEventListener("click", () => {
        checkIdButtons.forEach(button => {
            if (checkAllButton.checked) {
                button.checked = true;
            } else {
                button.checked = false;
            }
        });
    });
    
    checkIdButtons.forEach(button => {
        button.addEventListener("click", () => {
            const checkCount = document.querySelectorAll("input[name='id']:checked").length;
            if (checkCount == checkIdButtons.length) {
                checkAllButton.checked = true;
            } else {
                checkAllButton.checked = false;
            }
        });
    });
}

const formChangeMulti = document.querySelector("[form-change-multi]");
formChangeMulti.addEventListener("submit", (event) => {
    const isCheckedButtons = document.querySelectorAll("input[name='id']:checked");
    const statusIds = formChangeMulti.querySelector("input[name='ids']");
    if (isCheckedButtons.length > 0) {
        let ids = [];
        isCheckedButtons.forEach(button => {
            ids.push(button.getAttribute("value"));
        });
        statusIds.value = ids.join(", ");
        //formChangeMulti.submit();
    } else {
        event.preventDefault();
        alert("Vui lòng chọn ít nhất một ô");
    }
});
// End Change Status Multi
