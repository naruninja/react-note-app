module.exports = {
    presets: ['@babel/preset-react', '@babel/typescript'],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-block-scoping',
        'babel-plugin-styled-components',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
}
