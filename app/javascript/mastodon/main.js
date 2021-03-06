const perf = require('./performance');

function onDomContentLoaded(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function main() {
  perf.start('main()');
  const Mastodon = require('mastodon/containers/mastodon').default;
  const React = require('react');
  const ReactDOM = require('react-dom');

  require.context('../images/', true);

  if (window.history && history.replaceState) {
    const { pathname, search, hash } = window.location;
    const path = pathname + search + hash;
    if (!(/^\/web[$/]/).test(path)) {
      history.replaceState(null, document.title, `/web${path}`);
    }
  }

  onDomContentLoaded(() => {
    const mountNode = document.getElementById('mastodon');
    const props = JSON.parse(mountNode.getAttribute('data-props'));

    ReactDOM.render(<Mastodon {...props} />, mountNode);
    perf.stop('main()');
  });
}

export default main;
