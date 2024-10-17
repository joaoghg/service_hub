module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                  root: ['./'], // Caminho para a pasta raiz do código-fonte
                  alias: {
                    '@assets': './assets', 
                  },
                },
            ],
            ['module:react-native-dotenv'],
            'react-native-reanimated/plugin'
        ],
        env: {
            production: {
                plugins: ['react-native-paper/babel'],
            }
        }
    };
};
