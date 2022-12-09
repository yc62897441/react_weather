export const configMethods = {
    addC: (elementValue) => { return elementValue.value + '°C' },
    addPercent: (elementValue) => { return elementValue.value ? elementValue.value + '%' : '-' },
    aaa: (elementValue) => { return elementValue[0].value },
    bbb: (elementValue) => { return elementValue[1].value },
    ccc: (elementValue) => { return elementValue[0].value + elementValue[0].measures },
    ddd: (elementValue) => { return elementValue.value }
}

export const config = {
    mountain: {
        T: {
            format: configMethods.addC,
        },
        Td: {
            format: configMethods.addC,
        },
        RH: {
            format: configMethods.addPercent,
        },
        MaxT: {
            format: configMethods.addC,
        },
        MinT: {
            format: configMethods.addC,
        },
        MaxAT: {
            format: configMethods.addC,
        },
        MinAT: {
            format: configMethods.addC,
        },
        MaxCI: {
            format: configMethods.bbb,
        },
        MinCI: {
            format: configMethods.bbb,
        },
        PoP24h: {
            format: configMethods.addPercent,
        },
        WD: {
            format: configMethods.ddd,
        },
        WS: {
            format: configMethods.ccc,
        },
        Wx: {
            format: configMethods.aaa,
        },
        UVI: {
            format: configMethods.aaa,
        },
        WeatherDescription: {
            format: configMethods.ddd,
        }
    },
    mountainThreeHours: {
        T: {
            format: configMethods.addC,
        },
        Td: {
            format: configMethods.addC,
        },
        RH: {
            format: configMethods.addPercent,
        },
        PoP6h: {
            format: configMethods.addPercent,
        },
        PoP12h: {
            format: configMethods.addPercent,
        },
        WD: {
            format: configMethods.ddd,
        },
        WS: {
            format: configMethods.ccc,
        },
        CI: {
            format: configMethods.bbb,
        },
        AT: {
            format: configMethods.addC,
        },
        Wx: {
            format: configMethods.aaa,
        },
        WeatherDescription: {
            format: configMethods.ddd,
        }
    }
}
