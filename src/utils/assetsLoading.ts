import {Assets, Spritesheet, SpritesheetData} from "pixi.js";
import symbolsData from "../../assets/atlas/symbols.json";
import symbolsUrl from "../../assets/atlas/symbols.png";

export async function loadSymbols(): Promise<Spritesheet> {
    const texture = await Assets.load(symbolsUrl);
    const sheet = new Spritesheet(texture, symbolsData as unknown as SpritesheetData);
    await sheet.parse();
    return sheet;
}
