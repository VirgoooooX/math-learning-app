# Vue.js 项目 VPS 部署指南

本文档提供了将此 Vue.js 项目部署到 Virtual Private Server (VPS) 的详细步骤，使用 Nginx 作为 Web 服务器。

## 1. 准备 VPS 环境

首先，您需要在您的 VPS 上安装 Node.js 和 npm。推荐使用 `nvm` (Node Version Manager) 来安装和管理 Node.js 版本。

### 1.1 安装 nvm

通过 SSH 连接到您的 VPS，然后运行以下命令安装 `nvm`：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

安装完成后，您可能需要重新加载 shell 配置或重新登录才能使用 `nvm` 命令。

```bash
source ~/.bashrc
```

### 1.2 安装 Node.js

使用 `nvm` 安装一个稳定的 Node.js 版本 (例如，LTS 版本)：

```bash
nvm install --lts
nvm use --lts
```

验证 Node.js 和 npm 是否安装成功：

```bash
node -v
npm -v
```

## 2. 上传并构建项目

### 2.1 获取项目代码

您可以将项目文件通过 `scp` 或 `sftp` 上传到 VPS，或者更推荐的方式是，在 VPS 上安装 Git 并从您的代码仓库克隆项目。

```bash
# 示例：从 GitHub 克隆
# git clone <your-repository-url>

# 假设您将项目放在 /var/www/math-learning-app 目录下
# cd /var/www/math-learning-app
```

### 2.2 安装依赖

进入项目目录，然后使用 npm 安装项目依赖：

```bash
npm install
```

### 2.3 构建项目

运行构建命令来生成生产环境的静态文件。这些文件将被放置在 `dist` 目录中。

```bash
npm run build
```

**注意**: 如果遇到 TypeScript 类型检查错误，您可以使用以下命令跳过类型检查直接构建：

```bash
npm run build:skip-check
```

构建完成后，您会在项目根目录下看到一个 `dist` 文件夹。

## 3. 安装和配置 Nginx

Nginx 是一个高性能的 Web 服务器，非常适合托管静态文件。

### 3.1 安装 Nginx

在基于 Debian/Ubuntu 的系统上，您可以使用 `apt` 来安装 Nginx：

```bash
sudo apt update
sudo apt install nginx
```

安装完成后，启动 Nginx 服务并设置为开机自启：

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.2 配置 Nginx

您需要为您的应用创建一个新的 Nginx 配置文件。在 `/etc/nginx/sites-available/` 目录下创建一个新文件：

```bash
sudo nano /etc/nginx/sites-available/math-learning-app
```

将以下配置粘贴到文件中。请确保将 `your_domain.com` 替换为您的域名或 VPS 的 IP 地址，并将 `root` 指令的路径更新为您的项目 `dist` 目录的绝对路径。

```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com; # 替换为您的域名或 IP

    # 项目构建后的 dist 目录的绝对路径
    root /var/www/math-learning-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 可选：配置 SSL (HTTPS)
    # 如果您有 SSL 证书，可以在这里添加 SSL 配置
    # listen 443 ssl;
    # ssl_certificate /path/to/your/fullchain.pem;
    # ssl_certificate_key /path/to/your/privkey.pem;
}
```

`try_files $uri $uri/ /index.html;` 这一行非常重要，它确保了当用户刷新页面或直接访问一个子路径时，您的 Vue Router 能够正确处理路由，而不是让 Nginx 返回 404 错误。

### 3.3 启用配置

创建符号链接以在 `sites-enabled` 目录中启用您的配置：

```bash
sudo ln -s /etc/nginx/sites-available/math-learning-app /etc/nginx/sites-enabled/
```

在应用配置之前，测试 Nginx 配置是否存在语法错误：

```bash
sudo nginx -t
```

如果测试成功，重新加载 Nginx 以应用新的配置：

```bash
sudo systemctl reload nginx
```

## 4. 访问您的应用

现在，您应该可以通过浏览器访问您的域名或 VPS 的 IP 地址来查看部署好的应用了。

## 总结

部署流程概览：

1.  **服务器准备**: 安装 Node.js, npm, Nginx。
2.  **代码准备**: 上传或克隆代码。
3.  **构建**: `npm install` 和 `npm run build`。
4.  **配置 Nginx**: 创建并启用站点的配置文件，指向 `dist` 目录。
5.  **启动**: 重启 Nginx 服务。

如果您在部署过程中遇到任何问题，请检查 Nginx 的错误日志 (`/var/log/nginx/error.log`) 以获取更多信息。