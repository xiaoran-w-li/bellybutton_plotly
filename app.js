
function updatePage() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset");
    // Assign the dropdown menu item ID to a variable
    // var dropdownMenuID = dropdownMenu.id;
    d3.json("samples.json").then((data)=> {
        console.log(data);
    var sample = data.names
    sample.forEach(element => { 
        dropdownMenu.append("option").text(element)
    })
    optionChanged(sample[0])
})
};

updatePage()

function optionChanged(value) {
DemographicInfo(value)
charts(value)
}



function DemographicInfo(userid) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
    // Use D3 to select the demographic panel
        var selectedbox = d3.selectAll("#sample-metadata");
    // clearing existing data
    selectedbox.html("")
    // calling metadata 
    var demodata = data.metadata
    console.log(demodata)
    var filtereddemodata = demodata.filter(x =>x.id == userid) [0];
//    for loop to append selectedbox
    Object.entries(filtereddemodata).forEach(([key,value])=>{
        selectedbox.append("option").text(`${key} : ${value}`)
    }
    )
})
};

function charts(userid) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
    // calling metadata 
    var bardata = data.samples
    console.log(bardata)
    var filteredbardata = bardata.filter(x =>x.id == userid) [0];
    // barchart = filteredbardata.slice(0, 10);

    // Reverse the array due to Plotly's defaults
    // barchart = barchart.reverse();
    
    
    
    var trace1 = [{
      x: filteredbardata.sample_values.slice(0, 10).reverse(),
      y: filteredbardata.otu_ids.map(id =>`otu${id}`).slice(0, 10).reverse(),
      text: filteredbardata.otu_labels.slice(0,10).reverse(),
      name: "Belly Button Bar",
      type: "bar",
      orientation: "h"
    }];
    layout = {
        title : {text: "Top 10 Belly Button Bacteria"},
        xaxis : {title: "sample values"}
    }
    Plotly.newPlot("bar", trace1,layout);

    var trace2 = [{
        x: filteredbardata.otu_ids,
        y: filteredbardata.sample_values,
        text: filteredbardata.otu_labels,
        name: "Belly Button Bubble",
        mode: "markers",
        marker: { 
            color: filteredbardata.otu_ids,
            size: filteredbardata.sample_values,
        }
      }];
      layout = {
          title : {text: "Belly Button Bacteria Frequency "},
          xaxis : {title: "otu ids"},
          yaxis : {title: "sample values"},
      }
      Plotly.newPlot("bubble", trace2,layout);
})};

