# Nuvrano WhatsApp 共存授权准备页

状态：授权准备稿。尚未连接手机、尚未生成配对码，也没有接通 Cloud API。页面的 HTTPS 发布状态应以实际在线验证为准。

## 已填入的公开配置

- 应用：Nuvrano WA AI，App ID `1752615679316999`。
- 最新截图中的“含 60 天有效期口令的 WhatsApp 嵌入式注册配置”：Config ID `1087939604209242`。
- 旧的常规登录配置 `1114661524294423` 不用于本页。
- Config ID 不是手机访问码，也不是 API 访问令牌。模板标题中的 60 天不意味着此页已经取得令牌。

## 已确认和未确认

已确认：用户截图显示现有 WhatsApp 业务账户没有账户问题，业务资产组合中的当前用户具有完全访问权限，且新的嵌入式注册模板配置已创建。

未确认：应用审核、高级访问权限、Tech Provider 等适用资格、该应用能否为现有自有号码发起共存授权，以及新模板是否包含当前共存流程所需选项。此前截图明确提示 `public_profile` 只有标准访问权限，需要高级访问权限。

2026-10-08 在线核对：Meta 开发文档的实现、共存、托管注册页面未能读取，部分请求返回 429；因此没有把官方托管链接或当前 SDK 参数支持情况标为已验证。Meta 在 Postman 发布的说明确认了一般 Embedded Signup 的 SDK 集成和 HTTPS 要求，但包含旧版合作伙伴流程，不能直接作为当前共存注册操作清单。

## 使用与交接

1. 可打开 `index.html` 检查页面。文件打开或 HTTP 环境只允许预览。
2. 用户没有公司网站。优先核实 Meta 后台是否可生成适用的官方托管注册链接；如不能，再选择 HTTPS 静态托管地址，不需要先购买公司域名。
3. 托管地址确定后，核对 Meta 所需权限、允许的 JavaScript SDK 域名和适用的重定向设置。发布和 Meta 配置变更需先获得用户确认。
4. 在后端实现安全的临时授权码交换与交接。应用密钥应使用 AIOS 现有本地配置机制；本页不能放入 App Secret 或访问令牌。不得把授权码写入 URL、控制台或网页存储。
5. 根据当前 Meta 官方示例核对 `graphVersion`、`featureType` 和 `sessionInfoVersion`。本稿参数尚未通过真实 Meta 授权验证。
6. 完成以上核验后才可启用 `deploymentVerified`。目前固定为 `false`，不会加载 SDK、启动授权或改变 Meta 配置。
7. 管理员手动打开 Meta 窗口，只有确认出现“连接现有 WhatsApp Business App”的共存路径后再继续配对。遇到要求注销原手机账号或迁移号码的流程，停止操作。
8. 共存授权后仍需服务端凭证与 Webhook 接入。正式发送、自动回复和联系人操作继续遵守项目确认要求。

本稿不会保存凭证，没有发送消息、注册号码、注销号码或迁移号码的接口。启动部分使用 Meta 官方 SDK；这个自建页面本身不是 Meta 官方网页。它也不是一个完整可用的客服后台。

## 来源

- Meta 发布的一般 Embedded Signup 说明：https://www.postman.com/meta/whatsapp-business-platform/documentation/du6gzjv/embedded-signup
- WhatsApp 官方共存说明（用户已提供正文截图）：https://faq.whatsapp.com/8122483904494954
- Meta 共存开发文档（本次未成功读取）：https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-business-app-users
- Meta 托管注册文档（本次未成功读取）：https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/hosted-embedded-signup

## 验证边界

本地仅验证 JavaScript 语法、页面文件引用及配置内容。没有部署，没有执行真实授权，没有验证 Meta 是否为本账号提供共存连接。
