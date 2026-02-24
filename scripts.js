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

// 初始化Pagefind搜索
if (window.PagefindUI) {
    new window.PagefindUI({
        element: "#pagefind-search",
        showImages: false,
        translations: {
            placeholder: "搜索内容...",
            zero_results: "未找到匹配内容",
            results: "找到 {{ count }} 个结果"
        }
    });
}

// 动态加载文章（需引入Marked.js）
if (window.location.pathname.includes('escher.html')) {
    fetch('articles/article1.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('article-content').innerHTML = marked.parse(text);
        });
}