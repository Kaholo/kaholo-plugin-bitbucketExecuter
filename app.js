const kaholoPluginLibrary = require("@kaholo/plugin-library");
const FormData = require("form-data");

const { createReadStream } = require("fs");
const {
  injectBitbucketClient,
} = require("./helpers");

async function getPipelines(client, params) {
  const {
    workspace,
    repoSlug,
  } = params;

  return client.repositories.listPipelines({
    workspace,
    repo_slug: repoSlug,
  });
}

async function getDownloadLinks(client, params) {
  const {
    workspace,
    repoSlug,
  } = params;

  return client.repositories.listDownloads({
    workspace,
    repo_slug: repoSlug,
  });
}

async function createDownload(client, params) {
  const {
    workspace,
    repoSlug,
    filePath: filePathInfo,
  } = params;

  const filePath = filePathInfo.absolutePath;
  if (filePathInfo.type !== "file") {
    throw new Error(`Invalid file type: "${filePathInfo.type}"`);
  }

  const formData = new FormData();
  formData.append("files", createReadStream(filePath));

  return client.repositories.createDownload({
    _body: formData,
    workspace,
    repo_slug: repoSlug,
  });
}

module.exports = kaholoPluginLibrary.bootstrap({
  getPipelines: injectBitbucketClient(getPipelines),
  getDownloadLinks: injectBitbucketClient(getDownloadLinks),
  createDownload: injectBitbucketClient(createDownload),
});
