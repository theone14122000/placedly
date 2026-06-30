const path = require('path');
const { spawnSync } = require('child_process');

// Use a simple root-level path to avoid quoting/escaping issues in NODE_OPTIONS
const patchPath = path.join(__dirname, 'patch.js');

// Apply in this process too
require(patchPath);

const env = {
  ...process.env,
  NODE_OPTIONS: `--require ${patchPath}`,
};

console.log('[build] NODE_OPTIONS =', env.NODE_OPTIONS);

const result = spawnSync(
  process.execPath,
  [require.resolve('next/dist/bin/next'), 'build', '--webpack'],
  { stdio: 'inherit', env }
);

process.exit(result.status ?? 1);
