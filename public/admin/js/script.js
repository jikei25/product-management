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

const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}

const paginationButtons = document.querySelectorAll("[button-pagination]");
if (paginationButtons) {
    paginationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let url = new URL(location.href);
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            location.href = url.href;
        });
    });
}
