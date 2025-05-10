function httpAPI(path = "") {
  return new Promise((resolve, reject) => {
    $httpAPI("GET", path, null, (body) => {
      try {
        const json = typeof body === 'string' ? JSON.parse(body) : body;
        resolve(json);
      } catch (e) {
        reject(e);
      }
    });
  });
}

(async () => {
  try {
    const config = await httpAPI("/v1/profiles/current");
    const traffic = await httpAPI("/v1/traffic");
    const provider = await httpAPI("/v1/proxies/" + encodeURIComponent(config["proxy"]));
    const connections = await httpAPI("/v1/connections");

    const nodeName = config.proxy ?? "未知";
    const down = (traffic.down / (1024 ** 3)).toFixed(2);
    const up = (traffic.up / (1024 ** 3)).toFixed(2);
    const latency = provider.history?.slice(-1)[0]?.delay ?? "N/A";
    const connCount = connections.connections?.length ?? "未知";

    const content = `下行：${down} GB｜上行：${up} GB｜延迟：${latency} ms｜连接数：${connCount}`;

    $done({
      title: `当前节点：${nodeName}`,
      content: content,
      icon: "antenna.radiowaves.left.and.right",
      "icon-color": "#007aff"
    });
  } catch (e) {
    $done({
      title: "脚本出错",
      content: String(e),
      icon: "exclamationmark.triangle",
      "icon-color": "#ff3b30"
    });
  }
})();
