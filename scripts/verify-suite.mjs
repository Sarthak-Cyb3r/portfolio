import { readFileSync, existsSync } from "node:fs";

console.log("=================================================");
console.log("   SARTHAK PORTFOLIO — PRE-DELIVERY AUDIT SUITE   ");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

const PAGES = [
  { name: "Homepage", path: ".next/server/app/index.html" },
  { name: "Projects Directory", path: ".next/server/app/projects.html" },
  { name: "Softify Case Study", path: ".next/server/app/projects/softify.html" },
  { name: "Ludo Case Study", path: ".next/server/app/projects/ludo-vercel.html" },
  { name: "StudyStack Case Study", path: ".next/server/app/projects/studystack.html" },
  { name: "404 Not Found", path: ".next/server/app/_not-found.html" },
];

console.log("1. Checking Semantic Headings & H1 Uniqueness...");
for (const page of PAGES) {
  if (!existsSync(page.path)) {
    assert(false, `${page.name} HTML exists at ${page.path}`);
    continue;
  }
  const html = readFileSync(page.path, "utf-8");
  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, `${page.name} has exactly ONE <h1> tag (found ${h1Matches.length})`);
}

console.log("\n2. Checking Title & Meta Description Constraints...");
const homeHtml = readFileSync(".next/server/app/index.html", "utf-8");
const titleMatch = homeHtml.match(/<title>([^<]+)<\/title>/);
const title = titleMatch ? titleMatch[1] : "";
assert(title.length > 0 && title.length <= 60, `Homepage title is <= 60 chars ("${title}", length: ${title.length})`);

const descMatch = homeHtml.match(/<meta name="description" content="([^"]+)"/);
const desc = descMatch ? descMatch[1] : "";
assert(desc.length > 0 && desc.length <= 160, `Homepage meta description is <= 160 chars (length: ${desc.length})`);
assert(!desc.toLowerCase().includes("school"), "Meta description does not contain school name");
assert(!desc.toLowerCase().includes("lakh125yu"), "Meta description does not leak email address");

console.log("\n3. Checking Content, Trust & Copy Sanitization...");
const prohibitedStrings = [
  "Zero Fake Links",
  "0 Build Errors",
  "vibe coder",
  "No templates",
  "320kbps studio masters",
  "Technologies Mastered",
  "01 // HERO",
  "-$420/mo",
];

for (const term of prohibitedStrings) {
  let foundInAny = false;
  for (const page of PAGES) {
    const html = readFileSync(page.path, "utf-8");
    if (html.includes(term)) {
      foundInAny = true;
      break;
    }
  }
  assert(!foundInAny, `Sanitized: "${term}" is nowhere in generated output`);
}

console.log("\n4. Checking Email Exposure...");
// Check that hero, nav, and footer do not render email as scrapable text
const navAndHeroHtml = homeHtml.split(/<section id="work"/)[0];
assert(!navAndHeroHtml.includes("lakh125yu@gmail.com"), "Email is not rendered in plain text inside hero or navbar");

const footerPart = homeHtml.split(/<footer/)[1] || "";
// mailto: link is allowed in footer icon, but plain text label should not duplicate it
const footerPlainEmail = footerPart.includes(">lakh125yu@gmail.com<");
assert(!footerPlainEmail, "Footer does not render email as scrapable plain text label");

console.log("\n5. Checking Accessibility & Alt Attributes...");
for (const page of PAGES) {
  const html = readFileSync(page.path, "utf-8");
  const imgMatches = html.match(/<img[^>]+>/gi) || [];
  let allHaveAlt = true;
  for (const img of imgMatches) {
    if (!img.includes('alt="') && !img.includes("alt='")) {
      allHaveAlt = false;
      break;
    }
  }
  assert(allHaveAlt, `${page.name}: All ${imgMatches.length} <img> tags have alt attributes`);
}

console.log("\n6. Checking JSON-LD Structured Data...");
const jsonLdMatch = homeHtml.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
assert(Boolean(jsonLdMatch), "JSON-LD script exists in homepage");
if (jsonLdMatch) {
  try {
    const data = JSON.parse(jsonLdMatch[1]);
    assert(data["@graph"] && data["@graph"].length >= 2, "JSON-LD includes graph with Person and SoftwareApplication");
    const person = data["@graph"].find((i) => i["@type"] === "Person");
    assert(person && person.name === "Sarthak", "JSON-LD Person entity verified");
  } catch (err) {
    assert(false, `JSON-LD is valid JSON: ${err.message}`);
  }
}

console.log("\n7. Checking Verified Test Statistics & Platform Counts...");
assert(homeHtml.includes("625"), "Homepage proof strip displays 625 verified passing tests");
assert(homeHtml.includes("455 StudyStack"), "Proof strip references 455 StudyStack tests");
assert(homeHtml.includes("170 Softify"), "Proof strip references 170 Softify tests");

console.log("\n-------------------------------------------------");
console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
console.log("-------------------------------------------------");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL TESTS PASSED WITH 100% COMPLIANCE!\n");
}
