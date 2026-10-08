"use strict";

(() => {
  const configuration = Object.freeze({
    appId: "1752615679316999",
    configId: "1087939604209242",
    graphVersion: "v26.0",
    // Only enable after HTTPS hosting, Meta prerequisites and a secure
    // server-side authorization handoff have been implemented and verified.
    deploymentVerified: false
  });

  const status = document.getElementById("status");
  const ready = document.getElementById("ready");
  const launch = document.getElementById("launch");
  let sdkReady = false;
  let active = false;

  function show(message) {
    status.textContent = message;
  }

  function updateButton() {
    launch.disabled = !configuration.deploymentVerified || !sdkReady || !ready.checked || active;
  }

  if (window.location.protocol !== "https:") {
    show("本地预览：需要 HTTPS 地址和 Meta 配置核验，才能启用授权。");
    return;
  }

  if (!configuration.deploymentVerified) {
    show("部署准备稿：Meta 权限、允许的网页域名与服务端回调尚未核验，授权按钮暂未启用。");
    return;
  }

  ready.disabled = false;
  ready.addEventListener("change", updateButton);

  // No SDK loading or authorization occurs in the undeployed preparation draft.
  window.fbAsyncInit = () => {
    try {
      window.FB.init({
        appId: configuration.appId,
        cookie: false,
        xfbml: false,
        version: configuration.graphVersion
      });
      sdkReady = true;
      show("Meta SDK 已就绪。确认准备完成后，可以由你点击启动授权。");
      updateButton();
    } catch {
      show("Meta SDK 初始化失败，请核对应用设置与支持的 SDK 版本。");
    }
  };

  const sdk = document.createElement("script");
  sdk.src = "https://connect.facebook.net/en_US/sdk.js";
  sdk.async = true;
  sdk.onerror = () => show("无法加载 Meta SDK，请检查网络连接。");
  document.head.appendChild(sdk);

  launch.addEventListener("click", () => {
    if (launch.disabled || !sdkReady) return;
    active = true;
    updateButton();
    show("请在 Meta 官方窗口中操作，并确认该窗口提供现有 WhatsApp Business App 共存连接。");
    try {
      window.FB.login(response => {
        active = false;
        updateButton();
        if (response?.authResponse?.code) {
          // This preparation draft deliberately has no credential exchange.
          // Implement secure server-side handoff before enabling deployment.
          show("Meta 返回了临时授权结果；服务端接入仍需完成。本页不会保存或显示授权码。");
        } else {
          show("未获得授权结果。请查看 Meta 窗口中的具体提示。");
        }
      }, {
        config_id: configuration.configId,
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "whatsapp_business_app_onboarding",
          sessionInfoVersion: "3"
        }
      });
    } catch {
      active = false;
      updateButton();
      show("无法启动授权窗口，请核对应用权限、网页域名和当前 Meta SDK 参数。");
    }
  });
})();
