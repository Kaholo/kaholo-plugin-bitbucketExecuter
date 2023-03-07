const { Bitbucket } = require("bitbucket");

function injectBitbucketClient(callback) {
  return async (...args) => {
    const { accessToken } = args[0];
    const client = new Bitbucket({
      auth: {
        token: accessToken,
      },
    });
    return callback.call(this, client, ...args);
  };
}

module.exports = {
  injectBitbucketClient,
};
