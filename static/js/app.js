const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(function(data) {

    /////// create dropdown list ////////
    let dropdown = d3.select("#selDataset");

    // retreive names into a list
    data.names.forEach(function(name){
        dropdown.append("option").text(name).property("value", name);
    });
    
    // for each samples get: id & top 10: otu ids, sample values, and otu labels  
    ///// put bar info here /////

    let dataBar = [{
        x: data.samples[0].sample_values.slice(0,10).reverse(),
        y: data.samples[0].otu_ids.slice(0,10).reverse(),
        text: data.samples[0].otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }];
    
    let layoutBar = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bar", dataBar, layoutBar);

    ////// put bubble info here //////

    let dataBubb = [{
        x: data.samples[0].otu_ids,
        y: data.samples[0].sample_values,
        text: data.samples[0].otu_labels,
        mode: "markers",
        marker: {
            size: data.samples[0].sample_values,
            color: data.samples[0].otu_ids
        }
    }];
    
    let layoutBubb = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bubble", dataBubb, layoutBubb);

    ///// demographic info here //////
    let metdata = data.metadata[0];
    let demoInfo = d3.select("#sample-metadata");
    Object.entries(metdata).forEach(([key, value]) => {
        demoInfo.append("p").text(`${key}: ${value}`);
      });

    //d3.select("#selDataset").on("change", updatePlotly(demo.property('value')));
});

function optionChanged(value){
    
    updatePlotly(value)
}


//// update the restyled plot's values /////
function updatePlotly(newdata){
    
    updateDemo(newdata);
    updateBar(newdata);
    updateBubble(newdata);
}

function updateDemo(newdata){
    d3.json(url).then(function(data){
        //delete old data
        d3.selectAll('p').remove()
        //get new data
        let metdata = data.metadata[newdata];
        let demoInfo = d3.select("#sample-metadata");
        Object.entries(metdata).forEach(([key, value]) => {
            demoInfo.append("p").text(`${key}: ${value}`);
          });
    });
}

function updateBar(newdata){
    d3.json(url).then(function(data){

    let dataBar = [{
        x: data.samples[newdata].sample_values.slice(0,10).reverse(),
        y: data.samples[newdata].otu_ids.slice(0,10).reverse(),
        text: data.samples[newdata].otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }];
    
    let layoutBar = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bar", dataBar, layoutBar);
    });
}

function updateBubble(newdata){
    d3.json(url).then(function(data){

    let dataBubb = [{
        x: data.samples[newdata].otu_ids,
        y: data.samples[newdata].sample_values,
        text: data.samples[newdata].otu_labels,
        mode: "markers",
        marker: {
            size: data.samples[newdata].sample_values,
            color: data.samples[newdata].otu_ids
        }
    }];
    
    let layoutBubb = {
        title: "Top 10 OTUs"
    };

    Plotly.newPlot("bubble", dataBubb, layoutBubb);
    });
}
