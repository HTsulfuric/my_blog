import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs";

async function runLighthouse() {
  console.log("Launching Chrome...");
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options = {
    logLevel: "info",
    output: "json",
    port: chrome.port,
  };

  const url = process.env.SITE_URL || "https://htsulfuric.com";

  console.log(`Running Lighthouse on ${url}...`);
  const runnerResult = await lighthouse(url, options);

  const score = runnerResult.lhr.categories.performance.score * 100;

  const data = {
    score: Math.round(score),
    lastUpdated: new Date().toISOString(),
  };

  fs.writeFileSync("public/lighthouse.json", JSON.stringify(data, null, 2));

  console.log(`\nLighthouse Performance Score: ${Math.round(score)}/100`);
  console.log(`Saved to public/lighthouse.json`);

  await chrome.kill();
}

runLighthouse().catch((err) => {
  console.error("Error running Lighthouse:", err);
  process.exit(1);
});
