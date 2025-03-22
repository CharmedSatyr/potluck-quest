const packagePaths = {
  "apps/web": ["apps/web"],
  "apps/bot": ["apps/bot"],
  "@potluck/utilities": ["packages/utilities"],
  "@potluck/config": ["packages/config"]
};

export default (files) => {
  const tasks = {};

  files.forEach((file) => {
    for (const [pkg, paths] of Object.entries(packagePaths)) {
      if (paths.some((p) => file.startsWith(p))) {
        if (!tasks[pkg]) tasks[pkg] = [];
        tasks[pkg].push(file);
      }
    }
  });

  return Object.entries(tasks).flatMap(([pkg, files]) => [
    `turbo run lint --filter=${pkg} -- ${files.join(" ")}`,
    `turbo run prettier --filter=${pkg} -- ${files.join(" ")}`
    `turbo run type-check --filter=${pkg} -- ${files.join(" ")}`
  ]);
};