const { exec } = require("child_process");

const executeActionString = (action) => new Promise((resolve, reject) => {
  let { actionString } = action.method;
  for (let i = 0; i < action.method.params.length; i += 1) {
    const param = action.method.params[i].name;
    if (Reflect.has(action.params, param)) {
      actionString = actionString.replace(param, action.params[param]);
    } else {
      actionString = actionString.replace(param, "");
    }
  }

  exec(actionString, (error, stdout, stderr) => {
    if (error) {
      reject(error);
    }
    if (stderr) {
      console.info(stderr);
    }
    resolve(stdout);
  });
});

module.exports = {
  GET_PIPELINES: executeActionString,
  GET_DOWNLOAD_LINKS: executeActionString,
  UPLOAD_ARTIFACT: executeActionString,
};
