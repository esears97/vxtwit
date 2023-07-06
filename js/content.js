function createCopyButton() {
  const button = document.createElement('button');
  button.className = 'copy-button';
  button.innerHTML = `<img src="chrome-extension://${chrome.runtime.id}/images/VXBtnIcon.png" alt="Copy Link">`;

  button.style.border = 'none';
  button.style.padding = '0';
  button.style.margin = '0';
  button.style.background = 'transparent';
  button.style.cursor = 'pointer';

  return button;
}

function copyToClipboard(text) {
  const linkWithoutAnalytics = text.replace('/analytics', '');
  const input = document.createElement('textarea');
  input.value = linkWithoutAnalytics;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

function addCopyButtonToTweets() {
  const tweetsContainer = document.querySelector('body');
  const observer = new MutationObserver(() => {
    const tweets = document.querySelectorAll('[role="group"]');

    tweets.forEach((group) => {
      const tweetLink = group.querySelector('a[href^="/"]');
      const existingButton = group.querySelector('.copy-button');

      if (!existingButton && tweetLink) {
        const copyButton = createCopyButton();
        copyButton.addEventListener('click', () => {
          if(window.location.href.includes('/status/')) {
            copyToClipboard(`https://vxtwitter.com${window.location.pathname}`);
          }else{
          copyToClipboard(`https://vxtwitter.com${tweetLink.getAttribute('href')}`);
          }
        });

        group.appendChild(copyButton);
      }
    });
  });

  observer.observe(tweetsContainer, { childList: true, subtree: true });
}

addCopyButtonToTweets();
