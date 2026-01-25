document.addEventListener('DOMContentLoaded', () => {
  const proxyUrlEl = document.getElementById('proxyUrl');
  const copyBtn = document.getElementById('copyBtn');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab) {
      proxyUrlEl.textContent = 'No tab';
      copyBtn.disabled = true;
      return;
    }

    const url = tab.url;

    // If on youtube-nocookie.com, extract video ID from path
    if (url.includes('youtube-nocookie.com/embed/')) {
      try {
        const pathParts = url.split('/');
        const videoId = pathParts[pathParts.indexOf('embed') + 1].split('?')[0];
        
        if (videoId) {
          const proxyLink = `https://yout-ube.com/watch?v=${videoId}`;
          
          proxyUrlEl.textContent = proxyLink;

          copyBtn.onclick = () => {
            navigator.clipboard.writeText(proxyLink).then(() => {
              copyBtn.textContent = 'COPIED!';
              setTimeout(() => copyBtn.textContent = 'COPY PROXY LINK', 1500);
            }).catch(err => {
              proxyUrlEl.textContent = 'Copy failed';
              console.error('Failed to copy:', err);
            });
          };

        } else {
          proxyUrlEl.textContent = 'Invalid embed URL';
          copyBtn.disabled = true;
        }

      } catch (e) {
        proxyUrlEl.textContent = 'Error parsing URL';
        console.error('URL parse error:', e);
      }

    } else {
      proxyUrlEl.textContent = 'Not on YouTube embed page';
      copyBtn.disabled = true;
    }
  });
});