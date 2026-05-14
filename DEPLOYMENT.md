# GitHub Pages 上线说明

当前网站是纯静态站，可以直接用 GitHub Pages 发布。推荐使用根域名：

```txt
https://edith.wiki/
```

仓库根目录需要包含：

```txt
index.html
styles.css
script.js
404.html
robots.txt
sitemap.xml
CNAME
.nojekyll
assets/
```

其中 `CNAME` 文件已经写好，内容为：

```txt
edith.wiki
```

## 1. 创建 GitHub 仓库

建议仓库名：

```txt
edith.wiki
```

也可以叫：

```txt
personal-website
```

仓库名不影响最终域名，只要 GitHub Pages 绑定 `edith.wiki` 即可。

## 2. 上传文件

把桌面 `website` 文件夹里的所有文件上传到 GitHub 仓库根目录。

注意：不要只上传 `site` 或 `website` 文件夹本身，而是上传文件夹里面的内容，让 `index.html` 位于仓库根目录。

## 3. 开启 GitHub Pages

进入仓库：

```txt
Settings -> Pages
```

配置：

```txt
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

保存后等待 GitHub Pages 构建完成。

## 4. 绑定自定义域名

在同一个 Pages 页面中找到 `Custom domain`，填入：

```txt
edith.wiki
```

保存。

GitHub 会确保仓库根目录存在 `CNAME` 文件。如果它自动提交了一个新的 `CNAME` 文件，也没关系，但要确认内容仍然只有一行：

```txt
edith.wiki
```

## 5. 阿里云 DNS 解析

在阿里云域名控制台进入：

```txt
域名解析 -> edith.wiki -> 解析设置
```

添加 4 条 A 记录：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

如果还想让 `www.edith.wiki` 也能访问，添加：

| 记录类型 | 主机记录 | 记录值 |
|---|---|---|
| CNAME | www | 你的 GitHub 用户名.github.io |

例子：

```txt
username.github.io
```

注意：不要把 `www` 的 CNAME 指向仓库名路径，也不要写成 `username.github.io/repo-name`。

## 6. 开启 HTTPS

DNS 生效后，回到：

```txt
GitHub 仓库 -> Settings -> Pages
```

等待证书签发完成，然后勾选：

```txt
Enforce HTTPS
```

DNS 生效和 HTTPS 可用可能需要一些时间，通常几分钟到数小时，最长可到 24 小时。

## 7. 验证

浏览器访问：

```txt
https://edith.wiki/
```

如果暂时打不开，检查：

- GitHub Pages 是否已经构建成功
- `Custom domain` 是否是 `edith.wiki`
- 仓库根目录是否有 `CNAME`
- 阿里云是否已有冲突的 `@` 记录
- DNS 是否还在生效等待期
