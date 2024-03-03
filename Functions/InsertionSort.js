function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function InsertionSort(){

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

    //Insertion Sort done iteration wise
    for(let i = 0; i < array.length; i++){
        for(let j = i; j > 0; j--){
            //Current Index
            bgcolor[j] = lightRed;
            borcolor[j] = darkRed;
            canvasBG.data.datasets[0].data = array;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            //Replacement Condition
            if(array[j - 1] > array[j]){
                bgcolor[j - 1] = lightGreen;
                borcolor[j - 1] = darkGreen;
                canvasBG.data.datasets[0].data = array;
                canvasBG.data.datasets[0].backgroundColor = bgcolor;
                canvasBG.data.datasets[0].borderColor = borcolor;
                canvasBG.update();
                await sleep(speed);

                var temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;

                bgcolor[j - 1] = lightRed;
                borcolor[j - 1] = darkRed;
                bgcolor[j] = lightGreen;
                borcolor[j] = darkGreen;

                canvasBG.data.datasets[0].data = array;
                canvasBG.data.datasets[0].backgroundColor = bgcolor;
                canvasBG.data.datasets[0].borderColor = borcolor;
                canvasBG.update();
                await sleep(speed);

                bgcolor[j - 1] = lightBlue;
                borcolor[j - 1] = darkBlue;
                bgcolor[j] = lightBlue;
                borcolor[j] = darkBlue;
            }
            else{
                //Nothing to swap behind the value so exit
                bgcolor[j] = lightBlue;
                borcolor[j] = darkBlue;
                break;
            }
            await sleep(speed);
        }
    }
    canvasBG.update();
}