var router = require('express').Router();
var brain = require('brain.js')

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });



const colors = [
    { green: 0.2, blue: 0.4 },
    { green: 0.4, blue: 0.6 },
    { red: 0.2, green: 0.8, blue: 0.8 },
    { green: 1, blue: 1 },
    { red: 0.8, green: 1, blue: 1 },
    { red: 1, green: 1, blue: 1 },
    { red: 1, green: 0.8, blue: 0.8 },
    { red: 1, green: 0.6, blue: 0.6 },
    { red: 1, green: 0.4, blue: 0.4 },
    { red: 1, green: 0.31, blue: 0.31 },
    { red: 0.8 },
    { red: 0.6, green: 0.2, blue: 0.2 }
];

const brightnesses = [
    { dark: 0.8 },
    { neutral: 0.8 },
    { light: 0.7 },
    { light: 0.8 },
    { light: 0.9 },
    { light: 1 },
    { light: 0.8 },
    { neutral: 0.7, light: 0.5 },
    { dark: 0.5, neutral: 0.5 },
    { dark: 0.6, neutral: 0.3 },
    { dark: 0.85 },
    { dark: 0.9 }
];

var trainingData = [];


for (let i = 0; i < colors.length; i++) {
    trainingData.push({
        input: colors[i],
        output: brightnesses[i]
    })
}

var stats = net.train(trainingData, {
    log: (err) => {
        console.log(err);
    }
});

console.log(`stats:`);
console.log(stats);


function predict(data) {
    rgb = hexToRgb(data);

    var result = net.run({ red: toPerc(rgb.r), green: toPerc(rgb.g), blue: toPerc(rgb.b) });

    if (result.dark > result.neutral) {
        if (result.dark > result.light) {
            console.log("The color is dark");
            return {
              result:'dark',
              status:"The color is dark"
            }
        } else {
            console.log("The color is light");
                         return {
              result:'light',
              status:"The color is light"
            }
        }
    } else {
        if (result.neutral > result.light) {
            console.log("The color is Neutral");
            return {
              result:'neutral',
              status:"The color is neutral"
            }
        } else {
            console.log("The color is light");
                         return {
              result:'light',
              status:"The color is light"
            }
        }
    }
    console.log(result);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function toPerc(value) {
    return value / 255
}



router.post('/predict', function(req, res) {
  res.send(predict(req.body.code))
});

module.exports = router;
