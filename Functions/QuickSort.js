function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function partition(l,r,a){
    let pivot = a.array[r], i = l - 1;
    a.bgcolor[r] = a.pivBG;
    a.borcolor[r] = a.pivBD;
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    for(let j = l; j <= r; j++){
        a.bgcolor[j] = a.lightRed;
        a.borcolor[j] = a.darkRed;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
        if(a.array[j] < pivot){
            i++;
            a.bgcolor[i] = a.lightGreen;
            a.borcolor[i] = a.darkGreen;
            a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
            a.canvasBG.data.datasets[0].borderColor = a.borcolor;
            a.canvasBG.update();
            await sleep(a.speed);
            var temp = a.array[i];
            a.array[i] = a.array[j];
            a.array[j] = temp;
            a.canvasBG.data.datasets[0].data = a.array;
            a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
            a.canvasBG.data.datasets[0].borderColor = a.borcolor;
            a.canvasBG.update();
            await sleep(a.speed);
        }
        if(j !== i){
            a.bgcolor[j] = a.lightBlue;
            a.borcolor[j] = a.darkBlue;
        }
    }
    var temp = a.array[i + 1];
    a.array[i + 1] = a.array[r];
    a.array[r] = temp;
    for(let z = l; z <= r; z++){
        a.bgcolor[z] = a.lightBlue;
        a.borcolor[z] = a.darkBlue;
    }
    a.canvasBG.data.datasets[0].data = a.array;
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    return i + 1;
}

async function QuickS(l,r,a){
    if(l >= r) return;
    let pi = await partition(l,r,a);
    await QuickS(l,pi-1,a);
    await QuickS(pi+1,r,a);
    return;
}

function QuickSort(){

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
    a.pivBG = "rgba(251, 245, 172, 0.8)";
    a.pivBD = "rgba(255, 236, 0, 0.8)";
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
    //Running Quick Sort
    QuickS(0,array.length-1,a);
    a.canvasBG.update();
}