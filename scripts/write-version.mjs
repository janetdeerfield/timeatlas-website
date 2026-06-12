import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Writes dist/version.json so you can confirm in a browser which build is
// actually live (open https://timeatlas.co/version.json). Catches stale or
// partial manual uploads: if the commit/buildTime here don't match what you
// just shipped, the upload didn't fully land.

const repoRoot = resolve(new URL('..', import.meta.url).pathname);

function git(cmd, fallback) {
  try {
    return execSync(`git ${cmd}`, { cwd: repoRoot }).toString().trim();
  } catch {
    return fallback;
  }
}

const version = {
  commit: git('rev-parse --short HEAD', 'unknown'),
  branch: git('rev-parse --abbrev-ref HEAD', 'unknown'),
  buildTime: new Date().toISOString(),
};

writeFileSync(resolve(repoRoot, 'dist/version.json'), JSON.stringify(version, null, 2) + '\n');
console.log(`version.json: ${version.commit} (${version.branch}) @ ${version.buildTime}`);
