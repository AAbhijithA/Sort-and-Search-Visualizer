function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function SelectionSort(){

    //retrieving array values
    const Input = document.getElementById("sortArray").value;
    var array = Input.split(",");
    var index = [], bgcolor = [], borcolor = [];
    const lightBlue = "rgba(108, 205, 255, 0.8)", darkBlue = "rgba(60, 27, 155, 0.8)";
    const lightRed = "rgba(236, 96, 96, 0.8)", darkRed = "rgba(255, 0, 0, 0.8)";
    const lightGreen = "rgba(207, 244, 142, 0.8)", darkGreen = "rgba(29, 214, 42, 0.8)";
    var speed = document.getElementById("speed").value;
    speed = parseInt(speed);
    for(let i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        index[i] = i;
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
    }

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
    var canvasBG = new Chart(canvasElement, config);
    window.myBar = canvasBG;

    //Selection Sort done iteration wise
    for(let i = 0; i < array.length; i++){
        bgcolor[i] = lightRed;
        borcolor[i] = darkRed;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
        await sleep(speed);
        var mnidx = i;
        for(let j = i + 1; j < array.length; j++){
            if(array[mnidx] > array[j]){
                bgcolor[j] = lightGreen;
                borcolor[j] = darkGreen;
                if(mnidx !== i){
                    bgcolor[mnidx] = lightBlue;
                    borcolor[mnidx] = darkBlue;
                }
                canvasBG.data.datasets[0].backgroundColor = bgcolor;
                canvasBG.data.datasets[0].borderColor = borcolor;
                canvasBG.update();
                mnidx = j;
                await sleep(speed);
            }
        }
        if(mnidx !== i){
            var temp = array[i];
            array[i] = array[mnidx];
            array[mnidx] = temp;
            bgcolor[i] = lightBlue;
            borcolor[i] = darkBlue;
            bgcolor[mnidx] = lightBlue;
            borcolor[mnidx] = darkBlue;
            canvasBG.data.datasets[0].data = array;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            await sleep(speed);
        }
        else{
            bgcolor[i] = lightBlue;
            borcolor[i] = darkBlue;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            await sleep(speed);
        }
    }
    canvasBG.update();
}