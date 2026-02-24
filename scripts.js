// 语言切换
function toggleLanguage() {
    const body = document.body;
    const toggleBtn = document.getElementById('languageToggle');
    if (!toggleBtn) return;

    const chineseTitles = document.querySelectorAll('.chinese-title');
    const englishTitles = document.querySelectorAll('.english-title');

    if (body.lang === 'zh') {
        body.lang = 'en';
        toggleBtn.textContent = '中文 / Chinese';
        chineseTitles.forEach(title => title.style.display = 'none');
        englishTitles.forEach(title => title.style.display = 'block');
    } else {
        body.lang = 'zh';
        toggleBtn.textContent = 'English / 英文';
        chineseTitles.forEach(title => title.style.display = 'block');
        englishTitles.forEach(title => title.style.display = 'block');
    }
}
document.getElementById('languageToggle')?.addEventListener('click', toggleLanguage);

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}


<script src="/post/pagefind/pagefind-ui.js"></script>
    window.addEventListener('DOMContentLoaded', function () {
        console.log("Initializing Pagefind search...");
        try {
            new PagefindUI({
                element: "#pagefind-search",
                showImages: false,
                showSubResults: true,
                resetStyles: false,
                translations: {
                    placeholder: "搜索资源、教程、工具..."
                }
            });
            console.log("Pagefind search initialized successfully");
        } catch (error) {
            console.error("Pagefind search initialization failed:", error);
        }
    });