function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Merge(l,m,r,a){
    //merging them via ascending order as L & R is already sorted
    let left = m - l + 1, right = r - m;
    var L = [], R = [];
    for(let i = l; i <= m; i++){
        L[i - l] = a.array[i];
        a.bgcolor[i] = a.lightRed;
        a.borcolor[i] = a.darkRed;
    }
    for(let i = m + 1; i <= r; i++){
        R[i - m - 1] = a.array[i];
        a.bgcolor[i] = a.lightRed;
        a.borcolor[i] = a.darkRed;
    }
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    await sleep(a.speed);
    let i = 0, j = 0, k = l;
    while(i < left && j < right){
        if(L[i] < R[j]){
            a.array[k] = L[i];
            a.bgcolor[k] = a.lightGreen;
            a.borcolor[k] = a.darkGreen;
            i++;
        }
        else{
            a.array[k] = R[j];
            a.bgcolor[k] = a.lightGreen;
            a.borcolor[k] = a.darkGreen;
            j++;
        }
        k++;
        a.canvasBG.data.datasets[0].data = a.array;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
    }
    while(i < left){
        a.array[k] = L[i];
        a.bgcolor[k] = a.lightGreen;
        a.borcolor[k] = a.darkGreen;
        i++;
        k++;
        a.canvasBG.data.datasets[0].data = a.array;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
    }
    while(j < right){
        a.array[k] = R[j];
        a.bgcolor[k] = a.lightGreen;
        a.borcolor[k] = a.darkGreen;
        j++;
        k++;
        a.canvasBG.data.datasets[0].data = a.array;
        a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
        a.canvasBG.data.datasets[0].borderColor = a.borcolor;
        a.canvasBG.update();
        await sleep(a.speed);
    }
    for(let i = l; i <= r; i++){
        a.bgcolor[i] = a.lightBlue;
        a.borcolor[i] = a.darkBlue;
    }
    a.canvasBG.data.datasets[0].data = a.array;
    a.canvasBG.data.datasets[0].backgroundColor = a.bgcolor;
    a.canvasBG.data.datasets[0].borderColor = a.borcolor;
    a.canvasBG.update();
    return;
}

async function MergeS(l,r,a){
    if(l >= r) return;
    let m = Math.floor(l + ((r - l)/2));
    await MergeS(l,m,a);
    await MergeS(m+1,r,a);
    await Merge(l,m,r,a);
    return;
}

function MergeSort(){

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
    //Running Merge Sort
    MergeS(0,array.length - 1,a);
    a.canvasBG.update();
}