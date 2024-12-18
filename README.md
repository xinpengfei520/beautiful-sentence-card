# 精美金句卡片生成器

一个 Chrome 扩展，帮助用户快速生成精美的金句卡片。

## 功能特性

### 1. 文本选择与编辑
- 右键菜单选中网页文本，一键生成卡片
- 支持手动编辑修改金句内容
- 支持快捷键 `Ctrl+Shift+Y` 快速打开

### 2. 卸载反馈功能
- 用户卸载插件时自动跳转到反馈页面
- 收集用户卸载原因
- 支持实时反馈提交
- 优化的用户体验：
  * 加载状态提示
  * 错误信息展示
  * 参数合法性校验
  * 提交成功反馈

### 3. 卡片样式设置

#### 背景设置
- 纯色背景：支持颜色选择器自定义颜色
- 渐变背景：支持线性渐变和径向渐变
- 实时预览背景效果

#### 文字设置
- 字体选择：支持思源宋体、思源黑体、楷体、行楷等多种字体
- 字体大小：支持 12px-72px 自由调节
- 文字颜色：支持自定义颜色

### 4. 预设模板
提供多种精心设计的预设模板：
- 简约白：清新简约风格
- 暗夜模式：深色主题
- 渐变粉：柔美渐变效果
- 复古风：典雅复古风格

### 5. 实时预览
- 所有样式调整都可以实时预览
- 预览区域与最终导出效果一致

### 6. 导出功能
- 一键导出为高清图片
- 支持自定义尺寸

## 使用说明

1. 选择文本
   - 在网页中选中想要制作成卡片的文字
   - 右键点击，选择"生成金句卡片"

2. 编辑样式
   - 可以直接编辑原文内容
   - 选择预设模板快速应用样式
   - 自定义背景颜色或渐变
   - 调整文字样式

3. 导出图片
   - 确认预览效果
   - 点击"导出图片"按钮
   - 自动下载生成的卡片图片

4. 卸载反馈
   - 卸载插件时自动跳转到反馈页面
   - 填写卸载原因
   - 提交反馈（支持实时验证）
   - 查看感谢信息

## 技术栈

- React
- TailwindCSS
- Chrome Extension API
- html2canvas
- 后端 API（用于收集卸载反馈）

## 项目命令汇总

以下是本项目中使用的npm命令：

### 清理命令

npm run clean: 清理dist目录。

### 构建命令

npm run build: 构建项目，生成生产环境的文件。
npm run build:clean: 清理 dist 目录并重新构建项目。

### 监视命令

npm run watch: 监视文件变化，自动重新构建项目。

### 启动命令

npm run start: 启动开发服务器，进行实时开发。

## 数据收集

### 卸载反馈数据
- 收集内容：
  * 扩展ID (extId)
  * 卸载原因 (feedback)
  * 来源信息 (source)
  * 时间戳 (timestamp)
- 用途：改进产品功能和用户体验
- 存储：数据通过 API 接口安全存储
