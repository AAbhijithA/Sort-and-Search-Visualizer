function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function CountingSort(){

    //retrieving array values
    const Input = document.getElementById("sortArray").value;
    var array = Input.split(",");
    var index = [], bgcolor = [], borcolor = [];
    const lightBlue = "rgba(108, 205, 255, 0.8)", darkBlue = "rgba(60, 27, 155, 0.8)";
    const lightRed = "rgba(236, 96, 96, 0.8)", darkRed = "rgba(255, 0, 0, 0.8)";
    const lightGreen = "rgba(207, 244, 142, 0.8)", darkGreen = "rgba(29, 214, 42, 0.8)";
    var speed = document.getElementById("speed").value;
    speed = parseInt(speed);
    //Finding the range for the integers
    var mx = Number.MIN_SAFE_INTEGER, mn = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        index[i] = i;
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
        if(array[i] > mx){
            mx = array[i];
        }
        if(array[i] < mn){
            mn = array[i];
        }
    }
    if(mn === Number.MAX_SAFE_INTEGER) return;

    //Initializing a map or large array
    var mp = []
    for(let i=0; i <= (mx - mn); i++){
        mp[i] = 0;
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

    //Populating the map or large array
    for(let i = 0; i < array.length; i++){
        mp[array[i] - mn]++;
        bgcolor[i] = lightRed;
        borcolor[i] = darkRed;
        canvasBG.data.datasets[0].data = array;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
        await sleep(speed);
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
    }

    //Replacing old with new values
    var itr = 0;
    for(let i=0 ;i <= mp.length; i++){
        while(mp[i] > 0){
            array[itr] = i + mn;
            mp[i]--;
            bgcolor[itr] = lightGreen;
            borcolor[itr] = darkGreen;
            canvasBG.data.datasets[0].data = array;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            await sleep(speed)
            bgcolor[itr] = lightBlue;
            borcolor[itr] = darkBlue;
            itr++;
        }
    }
    canvasBG.update();
}