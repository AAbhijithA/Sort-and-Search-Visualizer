function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function LinearSearch(){
    const Input = document.getElementById("sortArray").value;
    var key = document.getElementById("key").value;
    key = parseInt(key);
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

    //Initializing the Canvas for Search
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

    //Running Linear Search
    for(let i = 0; i < array.length; i++){
        bgcolor[i] = lightRed;
        borcolor[i] = darkRed;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
        await sleep(speed);
        if(array[i] === key){
            bgcolor[i] = lightGreen;
            borcolor[i] = darkGreen;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            var node = document.getElementById('Answer');
            var ans = "";
            ans = ans.concat(key.toString()," is found at index ",i.toString());
            node.innerText = ans;
            return;
        }
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
    }
    var node = document.getElementById('Answer');
    var ans = "";
    ans = ans.concat(key.toString()," doesn't exist");
    node.innerText = ans;
    return;
}

async function BinarySearch(){
    const Input = document.getElementById("sortArray").value;
    var key = document.getElementById("key").value;
    key = parseInt(key);
    var array = Input.split(",");
    var index = [], bgcolor = [], borcolor = [];
    const lightBlue = "rgba(108, 205, 255, 0.8)", darkBlue = "rgba(60, 27, 155, 0.8)";
    const lightRed = "rgba(236, 96, 96, 0.8)", darkRed = "rgba(255, 0, 0, 0.8)";
    const lightGreen = "rgba(207, 244, 142, 0.8)", darkGreen = "rgba(29, 214, 42, 0.8)";
    const pivBG = "rgba(251, 245, 172, 0.8)", pivBD = "rgba(255, 236, 0, 0.8)";
    var speed = document.getElementById("speed").value;
    speed = parseInt(speed);
    for(let i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        index[i] = i;
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
    }
    array.sort(function (a, b) { return a - b });
    //Initializing the Canvas for Search
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

    //Binary Search Conditions
    let l = 0, r = array.length - 1;
    while(r >= l){
        bgcolor[l] = pivBG;
        borcolor[l] = pivBD;
        bgcolor[r] = pivBG;
        borcolor[r] = pivBD;
        let m = Math.floor(l + ((r - l)/2));
        bgcolor[m] = lightRed;
        borcolor[m] = darkRed;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
        await sleep(speed);
        bgcolor[l] = lightBlue;
        borcolor[l] = darkBlue;
        bgcolor[r] = lightBlue;
        borcolor[r] = darkBlue;
        bgcolor[m] = lightBlue;
        borcolor[m] = darkBlue;
        if(array[m] === key){
            bgcolor[m] = lightGreen;
            borcolor[m] = darkGreen;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            var node = document.getElementById('Answer');
            var ans = "";
            ans = ans.concat(key.toString()," is found at index ",m.toString());
            node.innerText = ans;
            return;
        }
        else if(array[m] > key){
            r = m - 1;
        }
        else{
            l = m + 1;
        }
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
    }

    //Answer not present
    var node = document.getElementById('Answer');
    var ans = "";
    ans = ans.concat(key.toString()," doesn't exist");
    node.innerText = ans;
    return
}

async function TernarySearch(){
    const Input = document.getElementById("sortArray").value;
    var key = document.getElementById("key").value;
    key = parseInt(key);
    var array = Input.split(",");
    var index = [], bgcolor = [], borcolor = [];
    const lightBlue = "rgba(108, 205, 255, 0.8)", darkBlue = "rgba(60, 27, 155, 0.8)";
    const lightRed = "rgba(236, 96, 96, 0.8)", darkRed = "rgba(255, 0, 0, 0.8)";
    const lightGreen = "rgba(207, 244, 142, 0.8)", darkGreen = "rgba(29, 214, 42, 0.8)";
    const pivBG = "rgba(251, 245, 172, 0.8)", pivBD = "rgba(255, 236, 0, 0.8)";
    var speed = document.getElementById("speed").value;
    speed = parseInt(speed);
    for(let i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        index[i] = i;
        bgcolor[i] = lightBlue;
        borcolor[i] = darkBlue;
    }
    array.sort(function (a, b) { return a - b });
    //Initializing the Canvas for Search
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

    //Ternary Search Conditions
    let l = 0, r = array.length - 1;
    while(r >= l){
        bgcolor[l] = pivBG;
        borcolor[l] = pivBD;
        bgcolor[r] = pivBG;
        borcolor[r] = pivBD;
        let m1 = Math.floor(l + ((r - l)/3)), m2 = Math.floor(r - ((r - l)/3));
        bgcolor[m1] = lightRed;
        borcolor[m1] = darkRed;
        bgcolor[m2] = lightRed;
        borcolor[m2] = darkRed;
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
        await sleep(speed);
        bgcolor[l] = lightBlue;
        borcolor[l] = darkBlue;
        bgcolor[r] = lightBlue;
        borcolor[r] = darkBlue;
        bgcolor[m1] = lightBlue;
        borcolor[m1] = darkBlue;
        bgcolor[m2] = lightBlue;
        borcolor[m2] = darkBlue;
        if(array[m1] === key){
            bgcolor[m1] = lightGreen;
            borcolor[m1] = darkGreen;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            var node = document.getElementById('Answer');
            var ans = "";
            ans = ans.concat(key.toString()," is found at index ",m1.toString());
            node.innerText = ans;
            return;
        }
        else if(array[m2] === key){
            bgcolor[m2] = lightGreen;
            borcolor[m2] = darkGreen;
            canvasBG.data.datasets[0].backgroundColor = bgcolor;
            canvasBG.data.datasets[0].borderColor = borcolor;
            canvasBG.update();
            var node = document.getElementById('Answer');
            var ans = "";
            ans = ans.concat(key.toString()," is found at index ",m2.toString());
            node.innerText = ans;
            return;
        }
        else if(key < array[m1]){
            r = m1 - 1;
        }
        else if(key > array[m2]){
            l = m2 + 1;
        }
        else{
            l = m1 + 1;
            r = m2 - 1;
        }
        canvasBG.data.datasets[0].backgroundColor = bgcolor;
        canvasBG.data.datasets[0].borderColor = borcolor;
        canvasBG.update();
    }

    //Answer not present
    var node = document.getElementById('Answer');
    var ans = "";
    ans = ans.concat(key.toString()," doesn't exist");
    node.innerText = ans;
    return
}
