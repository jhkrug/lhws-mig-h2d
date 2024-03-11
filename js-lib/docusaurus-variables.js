function dsVariableProcessor(fc) {
  // A more general scheme for variable processing.
  const Variables = require("../variables.json");
  const keys = Object.keys(Variables);
  keys.forEach((key) => {
    const re = new RegExp("\\[\\[< " + key + " >\\]\\]", "g");
    fc = fc.replace(re, Variables[key]);
  });
  return fc;
}

module.exports = dsVariableProcessor;
