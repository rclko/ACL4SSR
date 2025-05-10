(async () => {
  try {
    const res = await fetch("http://localhost:9090/v1/traffic", {
      headers: { "Authorization": "Bearer stash" }
    });
    const data = await res.json();

    $done({
      title: "当前流量",
      content: `下行：${(data.down / 1024 / 1024).toFixed(2)} MB`,
      icon: "network",
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
