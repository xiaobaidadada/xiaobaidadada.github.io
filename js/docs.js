import {getCurrentHtmlFullDir, renderMenuMdCopyButton, renderMenuMdList} from "./util.js";


const markdownItCopyButton = (md) => {
    const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const code = token.content.trim();

        // 添加复制按钮到代码块
        return `
      <div class="code-block-with-copy">
        <button class="copy-btn" data-code="${md.utils.escapeHtml(code)}" >复制</button>
        <pre><code>${md.utils.escapeHtml(code)}</code></pre>
      </div>`;
    };


};

function linkClickPlugin(md) {
    // 用于拦截 `<a>` 标签的渲染
    const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        // 获取链接地址
        const href = token.attrGet('href');
        if(!href.startsWith('http') && !href.startsWith('https')) {
            // 为每个链接添加点击事件，阻止默认跳转行为
            token.attrSet('onclick', `handleLinkClick(event)`);
        }
        // 使用默认渲染
        return defaultRender(tokens, idx, options, env, self);
    };
}

// 初始化 markdown-it
const md = window.markdownit({
    html: true,         // 允许 HTML 标签
    // breaks: true,       // 自动换行
    // linkify: true,      // 自动转换链接
    // highlight: function (str, lang) {
    //     // 代码块高亮（需额外引入 highlight.js）
    //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
    // }
});
md.use(markdownItCopyButton) // 复制插件
md.use(linkClickPlugin);
//
// const md2 = window.markdownit({
//     html: true,         // 允许 HTML 标签
//     // breaks: true,       // 自动换行
//     // linkify: true,      // 自动转换链接
//     // highlight: function (str, lang) {
//     //     // 代码块高亮（需额外引入 highlight.js）
//     //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
//     // }
// });
// md2.use(markdownItCopyButton) // 复制插件
// md2.use(linkClickPlugin);

async function load_md_file(hash) {
    if (!hash || hash === "/") return;
    const path = getCurrentHtmlFullDir();
    if (!hash.startsWith("/")) {
        hash = "/" + hash;
    }
    const res = await fetch(`${path}docs${hash}`);
    const text = await res.text();
    preview.innerHTML = md.render(text);
    renderMenuMdCopyButton();
}

window.addEventListener('DOMContentLoaded', () => {
    const {pathname} = window.location;
    // 检查路径名是否带有文件后缀
    const hasExtension = pathname.lastIndexOf('.') > pathname.lastIndexOf('/');
    if (!hasExtension && !pathname.endsWith("/")) {
        window.location.pathname += "/";
    }
    const hash = location.hash.replace("#", "");
    load_md_file(hash);
});

window.addEventListener('hashchange', () => {
    const hash = location.hash.replace("#", "");
    load_md_file(hash);
});


async function handleLinkClick(event) {
    event.preventDefault();  // 阻止默认的跳转行为
    // 设置 hash，不会刷新页面
    location.hash = event.target.getAttribute('href');
}

window.handleLinkClick = handleLinkClick; // 手动挂载到全局中 由于使用了 type="module" 功能


// 获取 DOM 元素
const preview = document.getElementById('preview');

// 实时渲染函数
async function renderMarkdown() {
    const res = await fetch("docs/home.md");
    const text = await res.text();
    preview.innerHTML = md.render(text);
}

// 在页面加载时绑定事件监听器
document.addEventListener('DOMContentLoaded', async () => {
    // 初始渲染
    renderMarkdown();
    const menu = document.getElementById('menu');
    const res = await fetch("docs/menu.md");
    const text = await res.text();
    menu.innerHTML = md.render(text);
    // console.log(text)
    renderMenuMdCopyButton();
    renderMenuMdList();
});
