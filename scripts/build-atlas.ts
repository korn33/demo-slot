import * as fs from "fs";
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const texturePacker = require("free-tex-packer-core");

const srcDir = path.resolve(__dirname, "..", "assets", "ville_seppanen_slots_symbols_asset_pack");
const outDir = path.resolve(__dirname, "..", "assets", "atlas");
const name = "symbols";

const images = fs.readdirSync(srcDir)
    .filter((f) => f.endsWith(".png"))
    .sort()
    .map((f) => ({path: f, contents: fs.readFileSync(path.join(srcDir, f))}));

texturePacker(images, {
    textureName: name,
    width: 544,
    height: 544,
    padding: 2,
    extrude: 0,
    allowRotation: false,
    allowTrim: false,
    removeFileExtension: true,
    powerOfTwo: false,
    exporter: "JsonHash", // формат, который понимает Pixi Spritesheet
}, (files: { name: string, buffer: Buffer }[], error?: Error) => {
    if (error) throw error;
    fs.mkdirSync(outDir, {recursive: true});
    for (const file of files) {
        fs.writeFileSync(path.join(outDir, file.name), file.buffer);
        console.log("written", path.join("assets", "atlas", file.name));
    }
});
