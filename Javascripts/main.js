function genColorGradient(hexColor, n) {

        var hex1 = hexColor.substr(1, 2);
        var hex2 = hexColor.substr(3, 2);
        var hex3 = hexColor.substr(5, 2);

        var color = [];

        for (i = 0; i < n; i++) {

            var alpha = (i / n + 0.1) / 1.1;
            var color1 = Math.round((1 - alpha) * 255 + alpha * parseInt(hex1, 16));
            var color2 = Math.round((1 - alpha) * 255 + alpha * parseInt(hex2, 16));
            var color3 = Math.round((1 - alpha) * 255 + alpha * parseInt(hex3, 16));

            var hex1i = color1.toString(16);
            var hex2i = color2.toString(16);
            var hex3i = color3.toString(16);

            var hexi = '#' + hex1i + hex2i + hex3i;

            color.push(hexi);
        }

        return color;
    }
    
colorPal= ['#1F363D','#40798C','#70A9A1','#9EC1A3','#CFE0C3'];
colors = genColorGradient(colorPal[3], 10);

// map function
function getColor(d) {
    return d > 0.9 ? colors[9] :
            d > 0.8 ? colors[8] :
            d > 0.7 ? colors[7] :
            d > 0.6 ? colors[6] :
            d > 0.5 ? colors[5] :
            d > 0.4 ? colors[4] :
            d > 0.3 ? colors[3] :
            d > 0.2 ? colors[2] :
            d > 0.1 ? colors[1] :
            
            // iris type color
            d == 'A' ? colorPal[3] :
            d == 'H' ? colorPal[2] :
            d == 'D' ? colorPal[1] :
            
            colors[0];
}

function geoPropRange(geoJSON,prop){
    
    var min = Infinity;
    var max = -Infinity;
    
    for (i=0; i< geoJSON.features.length; i++){
            min = Math.min(geoJSON.features[i].properties[prop],min);
            max = Math.max(geoJSON.features[i].properties[prop],max);
    }
    
    return([min,max]);
}