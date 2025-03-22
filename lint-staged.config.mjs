import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packagePaths = {
  "@potluck/web": "apps/web",
  "@potluck/bot": "apps/bot",
  "@potluck/utilities": "packages/utilities",
  "@potluck/config": "packages/config",
};

export default (files) => {
  const tasks = {};
  const relativeFiles = files.map((file) => path.relative(__dirname, file));

  console.log("FILES:", relativeFiles);

  relativeFiles.forEach((file) => {
    for (const [pkg, basePath] of Object.entries(packagePaths)) {
      if (file.startsWith(basePath)) {
        const packageRelativePath = path.relative(basePath, file); // Normalize path

        if (!tasks[pkg]) tasks[pkg] = [];
        tasks[pkg].push(packageRelativePath);
      }
    }
  });

  const commands = Object.entries(tasks).flatMap(([pkg, files]) => {
    const commands = [];


    if (files.length === 0) {
      return commands;}

    if (files.some((file) => file.match(/\.(js|jsx|ts|tsx|json|css|md|mdx)$/))) {
      commands.push(`turbo run prettier --filter=${pkg} -- ${files.join(" ")}`);
    }
    if (files.some((file) => file.match(/\.(js|jsx|ts|tsx)$/))) {
      commands.push(`turbo run lint --filter=${pkg}`);
    }
    if (files.some((file) => file.match(/\.(ts|tsx)$/))) {
      commands.push(`turbo run type-check --filter=${pkg}`);
    }

    return commands;
  });

  console.log("commands:", commands);
  return commands;
};