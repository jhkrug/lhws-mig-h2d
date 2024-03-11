function lhSubstituteCurrentVersion(fc, fp) {
  /* The regex extracts a version number in the 'vno' named capture group
   * that is being used as a part of the directory name.  The assumption is
   * that version numbers are '/version-n.n.n/' format. There must be at
   * least one number.  Valid examples: /version-1/ /version-1.1/,
   * /version-123.456.789/, /version-1.2.3.4.5.6/ Invalid:
   * /version-1.2-dev/, /version-1.2rc3/ */

  // cCV is the first entry in versions.json
  const cCV = require("../versions.json")[0];
  const regex = /\/version-(?<vno>(?:\d{1,}\.{0,1})*)\//g;
  for (const match of fp.matchAll(regex)) {
    if (match.groups) {
      fc = fc.replace(/\[\[< current-version >\]\]/g, `${match.groups.vno}`);
    }
  }

  /* The next line ensures that any use of [[< current-version >]] outside
   * a versioned directory, i.e in docs/ will be replaced with the default
   * cCV (currentCurrentVersion). */
  fc = fc.replace(/\[\[< current-version >\]\]/g, String(cCV));
  return fc;
}

module.exports = lhSubstituteCurrentVersion;
