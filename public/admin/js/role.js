const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
    const button = document.querySelector("[button-submit]");
    if (button) {
        button.addEventListener("click", () => {
            let permissions = [];
            const ids = tablePermissions.querySelectorAll("[role-id]");
            for (const id of ids) {
                const val = id.getAttribute("role-id");
                permissions.push({
                    id: val,
                    permissions: [],
                });
            }
            const rows = document.querySelectorAll("[data-name]");
            rows.forEach((row) => {
                const inputs = row.querySelectorAll("input");
                const name = row.getAttribute("data-name");

                inputs.forEach((input, idx) => {
                    if (input.checked) {
                        permissions[idx].permissions.push(name);
                    }
                });
            });
            const formChangePermissions = document.querySelector("#form-change-permissions");
            console.log(formChangePermissions);
            if (formChangePermissions) {
                const input = formChangePermissions.querySelector("input");
                input.value = JSON.stringify(permissions);
                formChangePermissions.submit();
            }
        });
    }
}

// Permissions Default
if (tablePermissions) {
    let dataPermissions = tablePermissions.getAttribute("table-permissions");
    dataPermissions = JSON.parse(dataPermissions);
    dataPermissions.forEach((item, idx) => {
        item.permissions.forEach((permission) => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[idx];
            input.checked = true;
        });
        
    });
}