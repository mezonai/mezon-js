import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";

const pkgDir = path.resolve(__dirname, "..");
const pkgJsonPath = path.join(pkgDir, "package.json");

describe("mezon-js-protobuf package exports", () => {
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

  it("declares dual ESM and CJS conditions for node, browser, and default exports", () => {
    const dotExport = pkg.exports["."];
    expect(dotExport.types).toBe("./dist/index.d.ts");
    expect(dotExport.node).toEqual({
      import: "./dist/mezon-js-protobuf-node.esm.mjs",
      require: "./dist/mezon-js-protobuf-node.cjs.js",
      default: "./dist/mezon-js-protobuf-node.esm.mjs",
    });
    expect(dotExport.browser).toEqual({
      import: "./dist/mezon-js-protobuf.esm.mjs",
      require: "./dist/mezon-js-protobuf.cjs.js",
      default: "./dist/mezon-js-protobuf.esm.mjs",
    });
    expect(dotExport.import).toBe("./dist/mezon-js-protobuf.esm.mjs");
    expect(dotExport.require).toBe("./dist/mezon-js-protobuf.cjs.js");
    expect(dotExport.default).toBe("./dist/mezon-js-protobuf.esm.mjs");
  });

  it("exports all shared realtime messages from both index.ts and index.node.ts", async () => {
    const browserEntry = await import("../index");
    const nodeEntry = await import("../index.node");
    const sharedRtExports = [
      "ActiveArchivedThread",
      "DropdownBoxSelected",
      "MessageButtonClicked",
      "HandleParticipantMeetStateEvent",
      "ChannelMessageRemove",
      "ChannelMessageUpdate",
      "ChannelMessageSend",
      "ChannelMessageAck",
      "SfuBreakoutRoomEvent",
    ] as const;
    for (const key of sharedRtExports) {
      expect(browserEntry[key]).toBeDefined();
      expect(nodeEntry[key]).toBeDefined();
    }
    expect(browserEntry.MezonNetworkAdapter).toBeDefined();
    expect(nodeEntry.MezonNetworkAdapter).toBeDefined();
  });

  it("resolves bare require('mezon-js-protobuf') inside Jest node environment without moduleNameMapper", () => {
    const mod = jest.requireActual<Record<string, unknown>>("mezon-js-protobuf");
    expect(typeof mod.MezonNetworkAdapter).toBe("function");
    expect(mod.SfuBreakoutRoomEvent).toBeDefined();
    expect(mod.GenerateMeetTokenRequest).toBeDefined();
  });

  it("loads cleanly via Node CJS require() and ESM import() after build", () => {
    const distFiles = [
      "dist/index.d.ts",
      "dist/mezon-js-protobuf.esm.mjs",
      "dist/mezon-js-protobuf.cjs.js",
      "dist/mezon-js-protobuf-node.esm.mjs",
      "dist/mezon-js-protobuf-node.cjs.js",
    ];
    for (const rel of distFiles) {
      expect(fs.existsSync(path.join(pkgDir, rel))).toBe(true);
    }

    const req = createRequire(path.join(pkgDir, "package.json"));
    const cjsMod = req("mezon-js-protobuf");
    expect(typeof cjsMod.MezonNetworkAdapter).toBe("function");
    expect(cjsMod.GenerateMeetTokenRequest).toBeDefined();
    expect(cjsMod.SfuBreakoutRoomEvent).toBeDefined();

    const esmOutput = execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        'import * as m from "mezon-js-protobuf"; console.log(JSON.stringify({ adapter: typeof m.MezonNetworkAdapter, meet: Boolean(m.GenerateMeetTokenRequest), breakout: Boolean(m.SfuBreakoutRoomEvent) }));',
      ],
      { cwd: pkgDir, encoding: "utf8" },
    ).trim();
    expect(JSON.parse(esmOutput)).toEqual({
      adapter: "function",
      meet: true,
      breakout: true,
    });
  });
});
