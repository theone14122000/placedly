const fs = require('fs');
function toEINVAL(err, path) {
  const e = new Error("EINVAL: invalid argument, readlink '" + path + "'");
  e.code = 'EINVAL'; e.syscall = 'readlink'; e.path = path;
  return e;
}
const _orig = fs.readlink.bind(fs);
fs.readlink = function(path, options, callback) {
  if (typeof options === 'function') { callback = options; options = {}; }
  _orig(path, options, function(err, result) {
    callback(err && err.code === 'EISDIR' ? toEINVAL(err, path) : err, result);
  });
};
const _origSync = fs.readlinkSync.bind(fs);
fs.readlinkSync = function(path, options) {
  try { return _origSync(path, options); }
  catch(err) { throw (err && err.code === 'EISDIR') ? toEINVAL(err, path) : err; }
};
const _origAsync = fs.promises.readlink.bind(fs.promises);
fs.promises.readlink = function(path, options) {
  return _origAsync(path, options).catch(function(err) {
    if (err && err.code === 'EISDIR') throw toEINVAL(err, path);
    throw err;
  });
};
