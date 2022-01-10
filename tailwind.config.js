((primary = {
    100: "#ccffcc",
    200: "#99ff99",
    300: "#66ff66",
    400: "#33ff33",
    500: "#00ff00",
    600: "#00cc00",
    700: "#009900",
    800: "#006600",
    900: "#003300",
}),
(dark = {
    100: "#d1d1d1",
    200: "#a3a3a3",
    300: "#747474",
    400: "#464646",
    500: "#181818",
    600: "#131313",
    700: "#0e0e0e",
    800: "#0a0a0a",
    900: "#050505",
})),
    (module.exports = {
        mode: "jit",
        purge: {
            enabled: true,
            content: ["./src/**/*.{html,ts}"],
        },
        darkMode: false, // or 'media' or 'class'
        theme: {
            extend: {
                // colors: {
                //     primary,
                // },

                textColor: {
                    primary,
                },

                backgroundColor: {
                    primary,

                    dark,
                },

                borderColor: {
                    primary,
                    dark,
                },

                gradientColorStops: {
                    primary,
                },
                // ringColor: {
                //     primary,
                // },
                outline: {
                    primary,
                },
            },
        },
        variants: {
            extend: {},
        },
        plugins: [],
    });
