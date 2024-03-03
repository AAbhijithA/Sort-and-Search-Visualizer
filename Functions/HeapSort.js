function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Max-Heap Function
async function Heapify(a,n,i){
    let largest = i,l = 2 * i + 1, r = 2 * i + 2;
    a.bgcolor[i] = a.lightRed;
    a.borcolor[i] = a.darkRed;
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    await sleep(a.speed);

    //Checking for larger child
    if(l < n && a.array[l] > a.array[largest]) largest = l;
    if(r < n && a.array[r] > a.array[largest]) largest = r;

    //If parent isn't the largest then swap with child and continue building heap tree
    if (largest != i) {
        a.bgcolor[largest] = a.lightGreen;
        a.borcolor[largest] = a.darkGreen;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
        var temp = a.array[i];
        a.array[i] = a.array[largest];
        a.array[largest] = temp;
        a.bgcolor[i] = a.lightBlue;
        a.borcolor[i] = a.darkBlue;
        a.bgcolor[largest] = a.lightBlue;
        a.borcolor[largest] = a.darkBlue;
        a.canvasBG.data.datasets[0].data = a.array;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await Heapify(a, n, largest);
    }
    a.bgcolor[i] = a.lightBlue;
    a.borcolor[i] = a.darkBlue;
    a.canvasBG.data.datasets[0].data = a.array;
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    return;
}

async function HeapS(a,n){
    let j = Math.floor((n / 2) - 1);
    for(let i = j; i >= 0; i--){
        await Heapify(a,n,i);
    }
    for (let i = n - 1; i > 0; i--) {
        var temp = a.array[i];
        a.array[i] = a.array[0];
        a.array[0] = temp;
        a.canvasBG.data.datasets[0].data = a.array;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
        await Heapify(a, i, 0);
    }
    return;
}

async function HeapSort(){

    //retrieving array values
    const Input = document.getElementById("sortArray").value;
    var array = Input.split(",");
    var a = {};
    var index = [], bgcolor = [], borcolor = [];
    a.lightBlue = "rgba(108, 205, 255, 0.8)";
    a.darkBlue = "rgba(60, 27, 155, 0.8)";
    a.lightRed = "rgba(236, 96, 96, 0.8)";
    a.darkRed = "rgba(255, 0, 0, 0.8)";
    a.lightGreen = "rgba(207, 244, 142, 0.8)";
    a.darkGreen = "rgba(29, 214, 42, 0.8)";
    var speed = document.getElementById("speed").value;
    a.speed = parseInt(speed);
    for(let i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        index[i] = i;
        bgcolor[i] = a.lightBlue;
        borcolor[i] = a.darkBlue;
    }
    a.array = array;
    a.bgcolor = bgcolor;
    a.borcolor = borcolor;
    //Initializing the Canvas for Sorting
    var canvasElement = document.getElementById("BarChart");
    if (window.myBar){
        window.myBar.destroy();
    }
    var config = {
        type : "bar",
        data : {
            labels: index,
            datasets: [{ 
                label : "Bar Chart Values",
                data : array,
                backgroundColor : bgcolor,
                borderColor : borcolor,
                borderWidth : 1
            }],
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Array Index'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    };
    a.canvasBG = new Chart(canvasElement, config);
    window.myBar = a.canvasBG;
    a.canvasBG.update()
    //Running Heap Sort
    await HeapS(a,array.length);
    a.canvasBG.update();
}