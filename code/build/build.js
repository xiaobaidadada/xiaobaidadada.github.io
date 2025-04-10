const fs = require("fs");
const path = require("path");
const {rimraf} = require("rimraf");
const markdownit = require('markdown-it');

let md_render;
async function loadModule() {
    if(md_render) {
        return;
    }
    const u = await import('../js/md_util.mjs');
    md_render = markdownit({
        html: true,         // 允许 HTML 标签
        // breaks: true,       // 自动换行
        // linkify: true,      // 自动转换链接
        // highlight: function (str, lang) {
        //     // 代码块高亮（需额外引入 highlight.js）
        //     return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`;
        // }
    });
    md_render.use(u.markdownItCopyButton) // 复制插件
    md_render.use(u.linkClickPlugin);
}

const root = path.join(__dirname,"..","..","docs");

async function handle(target_path) {
    const stats = await fs.promises.stat(target_path);
    if(stats.isFile()){
        if(!target_path.endsWith(".md")) return;
        var data = await fs.promises.readFile(target_path);
        const t_dir = path.join(path.dirname(target_path), 'dist',`${path.basename(target_path,path.extname(target_path))}.html`);
        await fs.promises.writeFile(t_dir, md_render.render(data.toString()));
        return;
    }
    // 删除目录下的构建目录
    await rimraf(path.join(target_path,"dist"));
    await fs.promises.mkdir(path.join(target_path,"dist"));
    // 遍历目录下的文件
    const files = await fs.promises.readdir(target_path);
    for (const filename of files) {
        if(filename === "dist") continue;
        handle(path.join(target_path, filename)); // 不需要按顺序
    }
}

async function run() {
    await loadModule();
    handle(root);
}
run() ;



