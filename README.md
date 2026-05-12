# 翁碧妤个人网站

这是基于 `个人网站_PRD.md` 搭建的第一版静态个人简历展示网站，当前准备通过 GitHub Pages 发布到 `https://edith.wiki/`。

## 文件结构

```txt
site/
  index.html
  styles.css
  script.js
  assets/
    editorial-contact-sheet.png
    wengbiyu-resume.docx
```

## 本地预览

直接打开 `index.html` 即可预览。也可以在当前目录启动一个静态服务：

```bash
python3 -m http.server 5173
```

然后访问：

```txt
http://localhost:5173
```

## 后续可补充

- 将简历导出为 PDF 后替换下载文件。
- 增加真实作品链接、视频封面、电影节物料图。
- 如果需要继续扩展作品集，可迁移到 Vite + React + TypeScript。

## 上线

GitHub Pages 部署步骤见 `DEPLOYMENT.md`。
