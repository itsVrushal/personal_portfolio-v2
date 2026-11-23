import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const PERSONAL_DIR = '/home/vrushalpatil/personal';
const REPO_DIR = '/home/vrushalpatil/personal/personal_portfolio-v2';
const STATE_FILE = path.join(REPO_DIR, 'case_study_sync_state.json');

function computeHash(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return crypto.createHash('sha256').update(content).digest('hex');
}

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    } catch {
      return { last_synced_at: null, projects: {} };
    }
  }
  return { last_synced_at: null, projects: {} };
}

function findCaseStudyFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(dir, entry.name);
        try {
          const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
          for (const sub of subEntries) {
            if (sub.isFile() && /^PORTFOLIO_CASE_STUDY_.*\.md$/.test(sub.name)) {
              results.push(path.join(subPath, sub.name));
            }
          }
        } catch {}
      }
    }
  } catch (err) {
    console.error('Error scanning personal directory:', err.message);
  }
  return results;
}

export function checkStatus() {
  const state = loadState();
  const files = findCaseStudyFiles(PERSONAL_DIR);

  console.log(`\n🔍 Checking Portfolio Case Studies in ${PERSONAL_DIR}...`);
  console.log(`Last synced at: ${state.last_synced_at || 'Never'}\n`);

  if (files.length === 0) {
    console.log('ℹ️  No PORTFOLIO_CASE_STUDY_*.md files found in /personal/*/ directories.');
    return { pending: [], total: 0 };
  }

  const pending = [];

  for (const file of files) {
    const stat = fs.statSync(file);
    const hash = computeHash(file);
    const prev = state.projects[file];

    if (!prev) {
      pending.push({ file, reason: 'NEW (not yet synced)', modified: stat.mtime });
    } else if (prev.hash !== hash) {
      pending.push({ file, reason: 'UPDATED (content changed)', modified: stat.mtime });
    }
  }

  if (pending.length === 0) {
    console.log(`✅ All ${files.length} case study file(s) are up-to-date with portfolio data.`);
  } else {
    console.log(`⚠️  Found ${pending.length} case study file(s) needing sync:`);
    for (const item of pending) {
      console.log(`   - [${item.reason}] ${item.file} (modified: ${item.modified.toISOString()})`);
    }
    console.log('\n💡 Start an Antigravity session or run the sync automation to rephrase and update lib/data.ts.');
  }

  return { pending, total: files.length };
}

checkStatus();
