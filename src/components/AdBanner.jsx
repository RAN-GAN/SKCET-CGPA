import React, { useEffect, useRef } from "react";

function AdBanner({
  adKey = "a5f33653f0a918b1a15e627fbfbe0911",
  width = 468,
  height = 60,
  className = "",
  showBadge = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.width = `${width}`;
    iframe.height = `${height}`;
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.scrolling = "no";
    iframe.title = "Advertisement";
    iframe.setAttribute("aria-label", "Advertisement");

    const adHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <base target="_blank" />
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
  </body>
</html>`;

    iframe.srcdoc = adHtml;
    container.appendChild(iframe);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [adKey, width, height]);

  return (
    <div className={`ad-wrapper ${className}`.trim()}>
      {showBadge && <span className="ad-badge">Advertisement</span>}
      <div
        ref={containerRef}
        className="ad-container"
        style={{ minHeight: `${height}px` }}
      />
    </div>
  );
}

export default AdBanner;
