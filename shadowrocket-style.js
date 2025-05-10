(async () => {
  const config = await httpAPI("/v1/profiles/current");
  const traffic = await httpAPI("/v1/traffic");
  const provider = await httpAPI("/v1/proxies/" + encodeURIComponent(config["proxy"]));
  const connections = await httpAPI("/v1/connections");

  const title = `当前节点：${config.proxy}`;
  const down = (traffic.down / (1024 ** 3)).toFixed(2);
  const up = (traffic.up / (1024 ** 3)).toFixed(2);
  const latency = provider.history?.slice(-1)[0]?.delay ?? "N/A";
  const connCount = connections.connections.length;

  $done({
    title,
    content: `下行：${down} GB｜上行：${up} GB｜延迟：${latency} ms｜连接数：${connCount}`,
    icon: "antenna.radiowaves.left.and.right",
    "icon-color": "#007aff"
  });
})();

async function httpAPI(path = "") {
  const response = await fetch(`http://localhost:9090${path}`, {
    headers: { "Authorization": "Bearer stash" }
  });
  return await response.json();
}
