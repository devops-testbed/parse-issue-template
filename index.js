const core = require('@actions/core');
const parse = require('./parse');

function run() {
  try {
    const body = core.getInput('body');
    core.setOutput('json', parse(body));
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();