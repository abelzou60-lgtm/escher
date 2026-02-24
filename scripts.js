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

// 搜索函数
let pagefindInstance = null;

async function initializePagefind() {
    if (!pagefindInstance && window.Pagefind) {
        try {
            pagefindInstance = await window.Pagefind.create();
            return pagefindInstance;
        } catch (error) {
            console.error('Failed to initialize Pagefind:', error);
            throw error;
        }
    }
    return pagefindInstance;
}

async function searchSerial(serial) {
    const resultDiv = document.getElementById('result');
    
    if (!serial) {
        resultDiv.textContent = '';
        return;
    }
    
    resultDiv.textContent = '查询中... / Querying...';
    
    try {
        // 确保Pagefind已加载
        if (!window.Pagefind) {
            throw new Error('Pagefind not loaded');
        }
        
        // 使用单例模式初始化Pagefind
        const pagefind = await initializePagefind();
        const search = await pagefind.search(serial);
        
        if (search.results.length === 0) {
            resultDiv.innerHTML = '<p>未找到匹配的编号 / No matching serial number found</p>';
        } else {
            let resultsHTML = '<h3>查询结果 / Search Results</h3><ul>';
            for (const result of search.results) {
                const data = await result.data();
                resultsHTML += `
                    <li>
                        <a href="${data.url}" target="_blank">${data.title}</a>
                        <p>${data.excerpt || '无摘要 / No excerpt'}</p>
                    </li>
                `;
            }
            resultsHTML += '</ul>';
            resultDiv.innerHTML = resultsHTML;
        }
    } catch (error) {
        console.error('Search error:', error);
        resultDiv.textContent = '搜索出错，请重试 / Search error, please try again';
    }
}

// 编号查询逻辑
const debouncedSearch = debounce(searchSerial, 300);

document.getElementById('serial-input')?.addEventListener('input', function() {
    const serial = this.value;
    debouncedSearch(serial);
});

document.getElementById('query-btn')?.addEventListener('click', async function() {
    const serial = document.getElementById('serial-input').value;
    await searchSerial(serial);
});

// 动态加载文章（需引入Marked.js）
if (window.location.pathname.includes('escher.html')) {
    fetch('articles/article1.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('article-content').innerHTML = marked.parse(text);
        });
}