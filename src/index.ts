import {Application, Sprite} from "pixi.js";
import {loadSymbols} from "./utils/assetsLoading";

async function main() {
    const app = new Application();
    const dpr = window.devicePixelRatio || 1;
    await app.init({
        background: '#1099bb',
        resizeTo: window,
        resolution: dpr,
        autoDensity: true
    });
    document.body.appendChild(app.canvas);

    const sheet = await loadSymbols();
    const seven = new Sprite(sheet.textures["seven"]);

    seven.position.set(app.screen.width / 2, app.screen.height / 2);
    seven.anchor.set(0.5, 0.5)

    app.stage.addChild(seven);

    app.ticker.add((ticker) => {
        seven.rotation += 0.02 * ticker.deltaTime;
    });
}

main();
