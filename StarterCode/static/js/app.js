
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
    var filtereddemodata = demodata.filter(x =>  x.id = userid) [0];
//    for loop to append selectedbox
    Object.entries(filtereddemodata).forEach(([key,value])=>{
        selectedbox.append("p").text(`${key} : ${value}`)
    }
    )
})
};

function barchart(userid) {
    d3.json("samples.json").then((data)=> {
        console.log(data)
    // calling metadata 
    var bardata = data.samples
    var filteredbardata = bardata.filter(x =>  x.id = userid) [0];

})};