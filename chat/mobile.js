document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".mobile-overlay");
    const menu = document.querySelector(".mobile-menu");

    let startX = 0;

    function openSidebar() {
        if (!sidebar || !overlay) return;
        sidebar.classList.add("open");
        overlay.classList.add("show");
    }

    function closeSidebar() {
        if (!sidebar || !overlay) return;
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    }

    if (menu) {
        menu.addEventListener("click", (e) => {
            e.stopPropagation();
            openSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    document.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("touchmove", (e) => {
        const x = e.touches[0].clientX;

        if (!sidebar) return;

        if (!sidebar.classList.contains("open")) {
            if (startX < 25 && x > startX + 80) {
                openSidebar();
            }
        } else {
            if (x < startX - 80) {
                closeSidebar();
            }
        }
    }, { passive: true });

});