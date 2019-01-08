function buildGauge(sample) {

    // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    //var metadata_selector = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    //metadata_selector.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    var metadata_URL = `/metadata/${sample}`;

    console.log(metadata_URL)

    d3.json(metadata_URL).then(metadata => {
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        var level = metadata.WFREQ
        // Enter a speed between 0 and 180

        // Trig to calc meter point
        var degrees = 180 - (level*20),
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        var data = [{
            type: 'scatter',
            x: [0], y: [0],
            marker: { size: 28, color: '850000' },
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'
        },
        {
            values: [45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 45/8, 50],
            rotation: 90,
            text: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
            '1-2', '0-1', ''],
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ['rgba(15, 100, 117, 0.67)','rgba(16, 112, 97, 0.67)'
                    , 'rgba(0, 128, 36, 0.5)','rgba(14, 127, 0, .5)'
                    , 'rgba(110, 154, 22, .5)','rgba(170, 202, 42, .5)'
                    , 'rgba(202, 209, 95, .5)','rgba(210, 206, 145, .5)'
                    , 'rgba(232, 226, 202, .5)','rgba(255, 255, 255, 0)']
            },
            labels: ['8-9','7-8','6-7','5-6', '4-5', '3-4', '2-3',
      '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            title: 'Gauge Speed 0 - 100',
            height: 1000,
            width: 1000,
            xaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1]
            },
            yaxis: {
                zeroline: false, showticklabels: false,
                showgrid: false, range: [-1, 1]
            }
        };

        Plotly.newPlot('gauge', data, layout);
    })



      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
  }

d3.select('#selDataset').on('change', buildGauge(this.value))
