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

// 编号查询逻辑
document.getElementById('query-btn')?.addEventListener('click', function() {
    const serial = document.getElementById('serial-input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = serial ? 
        查询中... / Querying... : 
        请输入编号 / Please enter serial number;
});

// 动态加载文章（需引入Marked.js）
if (window.location.pathname.includes('escher.html')) {
    fetch('articles/article1.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('article-content').innerHTML = marked.parse(text);
        });
}
