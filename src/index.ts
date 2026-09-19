import {Application, Graphics} from "pixi.js";

async function main() {
    const app = new Application();
    await app.init({background: '#1099bb', resizeTo: window});
    document.body.appendChild(app.canvas);

    const square = new Graphics().rect(-50, -50, 100, 100).fill(0xffffff);
    square.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(square);

    app.ticker.add((ticker) => {
        square.rotation += 0.02 * ticker.deltaTime;
    });
}

main();
