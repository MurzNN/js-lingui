import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: ["src/index.ts", "src/runtime-macro.ts"],
  declaration: "node16",
})
