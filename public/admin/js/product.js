// Change status
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
// End Change status

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
    const selected = document.querySelector("#change-status-multi");
    const isCheckedButtons = document.querySelectorAll("input[name='id']:checked");
    const statusIds = formChangeMulti.querySelector("input[name='ids']"); // will be sent to BE
    
    event.preventDefault();
    if (selected.value == "not-selected") {
        alert("Vui lòng chọn ít nhất một hành động");
        return;
    } 

    if (isCheckedButtons.length > 0) {
        if (selected.value == "delete-all") {
            const isConfirm = confirm("Bạn chắc chắn muốn xóa các sản phẩm này?");
            if (!isConfirm) {
                return;
            }
        }

        let ids = [];
        isCheckedButtons.forEach(button => {
            ids.push(button.getAttribute("value"));
        });
        statusIds.value = ids.join(", ");
        formChangeMulti.submit();
    } else {
        alert("Vui lòng chọn ít nhất một ô sản phẩm");
    }
});
// End Change Status Multi

// Delete Item
const deleteButtons = document.querySelectorAll("[button-delete]");
deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
        if (!isConfirm) {
            return;
        }
        const formDelete = document.querySelector("#form-delete");
        const id = button.getAttribute("item-id");

        const action = formDelete.getAttribute("path") + `/${id}?_method=DELETE`;
        formDelete.setAttribute("action", action);
        formDelete.submit();
    });
});
// End Delete Item
