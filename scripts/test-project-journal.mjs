import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { resolve } from "node:path";

const P = "zz-jrnl";
const PROJECTS = "src/content/projects";
const UPDATES = "src/content/project-updates";
const DITHER_NEW = `public/dithered/project-updates/${P}-a-new.png`;
const DITHER_NEW_THUMB = `public/dithered/project-updates/${P}-a-new-thumb.png`;
const created = [];
const ownedArtifacts = [];
const results = [];

function fixture(path, content) {
  writeFileSync(path, content, { flag: "wx" });
  created.push(path);
}

function setupFixtures() {
  fixture(
    `${PROJECTS}/${P}-meta.md`,
    `---
title: "Journal fixture: metadata only"
description: "Fixture project with no body, should still get its own page."
status: active
---
`,
  );
  fixture(
    `${PROJECTS}/${P}-a.md`,
    `---
title: "Journal fixture A"
description: "Fixture project with two visible journal entries."
status: active
---

Overview body for fixture A.
`,
  );
  fixture(
    `${PROJECTS}/${P}-b.md`,
    `---
title: "Journal fixture B"
description: "Fixture project with one journal-only entry."
status: active
---
`,
  );
  fixture(
    `${PROJECTS}/${P}-hidden.md`,
    `---
title: "Journal fixture hidden"
description: "Draft fixture project, invisible in production builds."
status: active
draft: true
---
`,
  );
  fixture(
    `${UPDATES}/${P}-a-old.md`,
    `---
title: "Fixture A: the older entry"
description: "Older of the two fixture A entries."
project: "${P}-a"
date: 2025-11-01
---

Older entry body.
`,
  );
  fixture(
    `${UPDATES}/${P}-a-new.md`,
    `---
title: "Fixture A: the newer entry"
description: "Newer of the two fixture A entries, surfaced in Writing."
project: "${P}-a"
date: 2026-01-15
showInBlog: true
featuredImage: "/images/projects/finanzia-app/finanzia_mockup.png"
tags: ["JournalTagTest"]
---

Newer entry body.
`,
  );
  fixture(
    `${UPDATES}/${P}-b-solo.md`,
    `---
title: "Fixture B: journal only"
description: "Fixture B entry kept out of Writing."
project: "${P}-b"
date: 2026-02-01
showInBlog: false
tags: ["JournalHiddenTag"]
---

Journal-only entry body.
`,
  );
  fixture(
    `${UPDATES}/${P}-a-draft.md`,
    `---
title: "Fixture A: draft entry"
description: "Draft entry, only visible in dev."
project: "${P}-a"
date: 2026-03-01
showInBlog: true
draft: true
tags: ["JournalDraftTag"]
---

Draft entry body.
`,
  );
  fixture(
    `${UPDATES}/${P}-hidden-child.md`,
    `---
title: "Fixture hidden: orphan-looking entry"
description: "Published entry under a draft project, still invisible in production."
project: "${P}-hidden"
date: 2026-03-10
showInBlog: true
tags: ["JournalHiddenChildTag"]
---

Child of a draft project.
`,
  );
  for (const artifact of [DITHER_NEW, DITHER_NEW_THUMB]) {
    if (existsSync(artifact)) {
      throw new Error(`refusing to run: ${artifact} already exists and is not test-owned`);
    }
  }
  ownedArtifacts.push(DITHER_NEW, DITHER_NEW_THUMB);
}

function page(route) {
  return `dist/${route.replace(/^\//, "")}/index.html`;
}

const read = (route) => readFileSync(page(route), "utf8");
const exists = (route) => existsSync(page(route));

function check(name, fn) {
  try {
    fn();
    results.push(`PASS ${name}`);
  } catch (err) {
    results.push(`FAIL ${name}: ${err.message}`);
  }
}

function runBuild(label) {
  const out = spawnSync("npm", ["run", "build"], { encoding: "utf8" });
  return { code: out.status, text: `${out.stdout}\n${out.stderr}`, label };
}

function sitemap() {
  const files = readdirSync("dist").filter((f) => /^sitemap-\d+\.xml$/.test(f));
  return files.map((f) => readFileSync(`dist/${f}`, "utf8")).join("\n");
}

function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolvePort(port));
    });
  });
}

const get = async (port, route) => {
  const res = await fetch(`http://127.0.0.1:${port}${route}`, {
    signal: AbortSignal.timeout(10_000),
  });
  return { status: res.status, body: await res.text() };
};

async function devServer() {
  const port = await freePort();
  const astroBin = resolve("node_modules/astro/bin/astro.mjs");
  const child = spawn(process.execPath, [astroBin, "dev", "--port", String(port)], {
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));

  const kill = async () => {
    if (child.exitCode !== null) return;
    child.kill("SIGTERM");
    const exited = await Promise.race([
      new Promise((r) => child.once("exit", () => r(true))),
      new Promise((r) => setTimeout(() => r(false), 5_000)),
    ]);
    if (!exited) {
      child.kill("SIGKILL");
      await Promise.race([
        new Promise((r) => child.once("exit", () => r(true))),
        new Promise((r) => setTimeout(() => r(false), 5_000)),
      ]);
    }
  };

  try {
    const deadline = Date.now() + 60_000;
    const portLine = new RegExp(`localhost:${port}`);
    while (Date.now() < deadline) {
      if (child.exitCode !== null) {
        throw new Error(`astro dev exited early (${child.exitCode}):\n${log}`);
      }
      if (portLine.test(log)) break;
      await new Promise((r) => setTimeout(r, 250));
    }
    if (!portLine.test(log)) {
      throw new Error(`astro dev never reported port ${port}:\n${log}`);
    }
    let lastError = `no response from :${port}`;
    while (Date.now() < deadline) {
      if (child.exitCode !== null) {
        throw new Error(`astro dev exited early (${child.exitCode}):\n${log}`);
      }
      try {
        const home = await get(port, "/");
        if (home.status === 200 && home.body.includes("Marc Janer")) {
          return { child, port, kill };
        }
        lastError = `unexpected response from :${port} (status ${home.status})`;
      } catch (err) {
        lastError = err.message;
      }
      await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error(`astro dev not ready on :${port}: ${lastError}`);
  } catch (err) {
    await kill();
    throw err;
  }
}

async function main() {
  const first = runBuild("fixtures");
  check("fixture production build exits 0", () => assert.equal(first.code, 0, first.text));

  check("metadata-only project gets own page + internal index link", () => {
    assert.ok(exists("/projects/zz-jrnl-meta"));
    const index = read("/projects");
    assert.match(index, /href="\/projects\/zz-jrnl-meta"/);
    assert.doesNotMatch(read("/projects/zz-jrnl-meta"), />Journal</);
  });

  check("project A journal order + prev/next nav scoped to project", () => {
    const aPage = read("/projects/zz-jrnl-a");
    const journalAt = aPage.indexOf("Journal");
    assert.ok(journalAt > 0);
    const iNew = aPage.indexOf("/projects/zz-jrnl-a/updates/zz-jrnl-a-new");
    const iOld = aPage.indexOf("/projects/zz-jrnl-a/updates/zz-jrnl-a-old");
    assert.ok(iNew > journalAt && iOld > iNew, "expected newest first");
    assert.equal(aPage.includes("zz-jrnl-b-solo"), false);

    const oldest = read("/projects/zz-jrnl-a/updates/zz-jrnl-a-old");
    assert.match(oldest, /rel="next" href="\/projects\/zz-jrnl-a\/updates\/zz-jrnl-a-new"/);
    assert.equal(oldest.includes('rel="prev"'), false);
    assert.equal(oldest.includes("zz-jrnl-b-solo"), false);

    const newest = read("/projects/zz-jrnl-a/updates/zz-jrnl-a-new");
    assert.match(newest, /rel="prev" href="\/projects\/zz-jrnl-a\/updates\/zz-jrnl-a-old"/);
    assert.equal(newest.includes('rel="next"'), false);
    assert.equal(newest.includes("zz-jrnl-b-solo"), false);
  });

  check("showInBlog update appears in blog, home and tag archive at nested URL", () => {
    const href = "/projects/zz-jrnl-a/updates/zz-jrnl-a-new";
    assert.match(read("/blog"), new RegExp(`href="${href}"`));
    assert.match(read("/"), new RegExp(`href="${href}"`));
    assert.ok(exists("/blog/tags/journaltagtest"));
    assert.match(read("/blog/tags/journaltagtest"), new RegExp(`href="${href}"`));
    assert.match(
      read("/projects/zz-jrnl-a/updates/zz-jrnl-a-new"),
      /rel="canonical" href="https:\/\/marcjaner\.com\/projects\/zz-jrnl-a\/updates\/zz-jrnl-a-new\/"/,
    );
    assert.equal(exists("/blog/zz-jrnl-a-new"), false);
  });

  check("showInBlog:false update has page + journal presence but no Writing surfaces", () => {
    assert.ok(exists("/projects/zz-jrnl-b/updates/zz-jrnl-b-solo"));
    assert.match(read("/projects/zz-jrnl-b"), />Journal</);
    assert.equal(read("/blog").includes("zz-jrnl-b-solo"), false);
    assert.equal(read("/").includes("zz-jrnl-b-solo"), false);
    assert.equal(exists("/blog/tags/journalhiddentag"), false);
  });

  check("draft update has no route, listing or sitemap entry in production", () => {
    assert.equal(exists("/projects/zz-jrnl-a/updates/zz-jrnl-a-draft"), false);
    assert.equal(read("/projects/zz-jrnl-a").includes("zz-jrnl-a-draft"), false);
    assert.equal(read("/blog").includes("zz-jrnl-a-draft"), false);
    assert.equal(exists("/blog/tags/journaldrafttag"), false);
    assert.equal(sitemap().includes("zz-jrnl-a-draft"), false);
  });

  check("draft parent hides published child everywhere in production", () => {
    assert.equal(exists("/projects/zz-jrnl-hidden"), false);
    assert.equal(exists("/projects/zz-jrnl-hidden/updates/zz-jrnl-hidden-child"), false);
    assert.equal(read("/projects").includes("zz-jrnl-hidden"), false);
    assert.equal(read("/blog").includes("zz-jrnl-hidden-child"), false);
    assert.equal(exists("/blog/tags/journalhiddenchildtag"), false);
    assert.equal(sitemap().includes("zz-jrnl-hidden"), false);
  });

  check("fixture featuredImage produced dithered art under project-updates", () => {
    assert.ok(existsSync(DITHER_NEW));
    assert.ok(existsSync(DITHER_NEW_THUMB));
    assert.match(read("/blog"), /dithered\/project-updates\/zz-jrnl-a-new/);
  });

  check("existing blog URLs unchanged and FINANZIA has its own page", () => {
    for (const id of readdirSync("src/content/blog").filter((f) => f.endsWith(".md"))) {
      assert.ok(exists(`/blog/${id.replace(/\.md$/, "")}`), `/blog/${id} missing`);
    }
    assert.ok(exists("/projects/finanzia-app"));
    assert.ok(exists("/projects/block-posthog-extension"));
  });

  check("templates directory is never rendered", () => {
    assert.equal(existsSync("dist/templates"), false);
  });

  fixture(
    `${UPDATES}/${P}-broken.md`,
    `---
title: "Fixture: broken reference"
description: "Points at a project that does not exist."
project: "${P}-missing"
date: 2026-04-01
draft: true
---

Broken body.
`,
  );
  const broken = runBuild("invalid reference");
  rmSync(`${UPDATES}/${P}-broken.md`, { force: true });
  created.splice(created.indexOf(`${UPDATES}/${P}-broken.md`), 1);
  check("missing project reference fails the build naming both IDs", () => {
    assert.notEqual(broken.code, 0);
    assert.match(broken.text, /zz-jrnl-broken/);
    assert.match(broken.text, /zz-jrnl-missing/);
  });

  const dev = await devServer();
  let devExit = "not terminated";
  try {
    const [hidden, hiddenChild, draftUpdate, blog, projectsIndex, sample, sampleUpdate] =
      await Promise.all([
        get(dev.port, "/projects/zz-jrnl-hidden"),
        get(dev.port, "/projects/zz-jrnl-hidden/updates/zz-jrnl-hidden-child"),
        get(dev.port, "/projects/zz-jrnl-a/updates/zz-jrnl-a-draft"),
        get(dev.port, "/blog"),
        get(dev.port, "/projects"),
        get(dev.port, "/projects/sample-project"),
        get(dev.port, "/projects/sample-project/updates/choosing-a-small-first-version"),
      ]);
    const around = (body, needle, span = 500) => {
      const i = body.indexOf(needle);
      assert.notEqual(i, -1, `${needle} not found`);
      return body.slice(Math.max(0, i - span), i + needle.length + span);
    };
    check("dev exposes draft project page with badge on the entry and page", () => {
      assert.equal(hidden.status, 200);
      assert.match(around(hidden.body, "<h1"), />Draft</);
      assert.match(around(projectsIndex.body, 'href="/projects/zz-jrnl-hidden"'), />Draft</);
      assert.doesNotMatch(
        around(projectsIndex.body, 'href="/projects/zz-jrnl-a"'),
        />Draft</,
      );
    });
    check("dev exposes child of draft project with a Draft badge", () => {
      assert.equal(hiddenChild.status, 200);
      assert.match(around(hiddenChild.body, "<h1"), />Draft</);
    });
    check("dev exposes draft update page and badges its Writing entry", () => {
      assert.equal(draftUpdate.status, 200);
      assert.match(around(draftUpdate.body, "<h1"), />Draft</);
      assert.match(
        around(blog.body, 'href="/projects/zz-jrnl-a/updates/zz-jrnl-a-draft"'),
        />Draft</,
      );
      assert.doesNotMatch(
        around(blog.body, 'href="/projects/zz-jrnl-a/updates/zz-jrnl-a-new"'),
        />Draft</,
      );
    });
    check("dev exposes sample drafts with badges on page and Writing entry", () => {
      assert.equal(sample.status, 200);
      assert.match(around(sample.body, "<h1"), />Draft</);
      assert.equal(sampleUpdate.status, 200);
      assert.match(around(sampleUpdate.body, "<h1"), />Draft</);
      assert.match(
        around(blog.body, 'href="/projects/sample-project/updates/choosing-a-small-first-version"'),
        />Draft</,
      );
    });
  } finally {
    await dev.kill();
    devExit =
      dev.child.exitCode !== null
        ? `exit code ${dev.child.exitCode}`
        : `signal ${dev.child.signalCode ?? "unknown"}`;
  }
  results.push(`INFO dev server terminated: ${devExit}`);
}

let setupError;
try {
  setupFixtures();
  await main();
} catch (err) {
  setupError = err;
  results.push(`FAIL unexpected error: ${err.message}`);
} finally {
  for (const path of created) rmSync(path, { force: true });
  for (const path of ownedArtifacts) rmSync(path, { force: true });
}

const final = runBuild("clean");
check("final clean production build exits 0", () => assert.equal(final.code, 0, final.text));
if (!setupError && final.code === 0) {
  check("final production build excludes sample drafts and test fixtures", () => {
    assert.equal(exists("/projects/sample-project"), false);
    assert.equal(
      exists("/projects/sample-project/updates/choosing-a-small-first-version"),
      false,
    );
    assert.equal(read("/projects").includes("sample-project"), false);
    assert.equal(
      read("/blog").includes("/projects/sample-project/updates/choosing-a-small-first-version"),
      false,
    );
    assert.equal(
      read("/").includes("/projects/sample-project/updates/choosing-a-small-first-version"),
      false,
    );
    if (exists("/blog/tags/building")) {
      assert.equal(
        read("/blog/tags/building").includes(
          "/projects/sample-project/updates/choosing-a-small-first-version",
        ),
        false,
      );
    }
    assert.equal(sitemap().includes("sample-project"), false);
    assert.equal(sitemap().includes("choosing-a-small-first-version"), false);
    assert.equal(sitemap().includes("zz-jrnl"), false);
    assert.equal(read("/projects").includes("zz-jrnl"), false);
  });
}

console.log(results.join("\n"));
const failures = results.filter((r) => r.startsWith("FAIL"));
const passes = results.filter((r) => r.startsWith("PASS")).length;
console.log(`\n${passes}/${passes + failures.length} checks passed`);
if (setupError) console.log(`fatal: ${setupError.stack ?? setupError.message}`);
process.exit(failures.length ? 1 : 0);
