import * as os from "os";
import * as path from "path";
import * as webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
    mode: 'production',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Demo Slot",
        meta: {
            viewport: "width=device-width, initial-scale=1.0"
        },
        template: path.resolve(__dirname, 'public', 'index.html')
    })],
    devServer: {
        onListening(devServer) {
            const port = (devServer.server?.address() as { port: number }).port;
            const urls = Object.values(os.networkInterfaces())
                .flat()
                .filter((i) => i?.family === 'IPv4' && i.address.startsWith('192.168.'))
                .map((i) => `http://${i!.address}:${port}/`);
            console.log('Открыть с телефона:', urls.join('  '));
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
};

export default config;
