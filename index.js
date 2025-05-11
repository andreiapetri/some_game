let fruit = document.querySelector('.fruit-cost')   //CREDITS STRING
let parsedFruit = parseFloat(fruit.innerHTML)   //CREDITS INT

let fpcText = document.getElementById("fpc-text")
let fpsText = document.getElementById("fps-text")

let fruitImageContainer = document.querySelector(".fruit-image-container")

let fps = 0;
let fpc = 1;

let prestiegeLevel=0;

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector(".clicker-increase"),
        parsedIncrease: parseFloat(document.querySelector(".clicker-increase").innerHTML),
        level: document.querySelector(".clicker-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'banana',
        cost: document.querySelector('.banana-cost'),
        parsedCost: parseFloat(document.querySelector('.banana-cost').innerHTML),
        increase: document.querySelector(".banana-increase"),
        parsedIncrease: parseFloat(document.querySelector(".banana-increase").innerHTML),
        level: document.querySelector(".banana-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'mango',
        cost: document.querySelector('.mango-cost'),
        parsedCost: parseFloat(document.querySelector('.mango-cost').innerHTML),
        increase: document.querySelector(".mango-increase"),
        parsedIncrease: parseFloat(document.querySelector(".mango-increase").innerHTML),
        level: document.querySelector(".mango-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'watermelon',
        cost: document.querySelector('.watermelon-cost'),
        parsedCost: parseFloat(document.querySelector('.watermelon-cost').innerHTML),
        increase: document.querySelector(".watermelon-increase"),
        parsedIncrease: parseFloat(document.querySelector(".watermelon-increase").innerHTML),
        level: document.querySelector(".watermelon-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'strawberry',
        cost: document.querySelector('.strawberry-cost'),
        parsedCost: parseFloat(document.querySelector('.strawberry-cost').innerHTML),
        increase: document.querySelector(".strawberry-increase"),
        parsedIncrease: parseFloat(document.querySelector(".strawberry-increase").innerHTML),
        level: document.querySelector(".strawberry-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'tangerine',
        cost: document.querySelector('.tangerine-cost'),
        parsedCost: parseFloat(document.querySelector('.tangerine-cost').innerHTML),
        increase: document.querySelector(".tangerine-increase"),
        parsedIncrease: parseFloat(document.querySelector(".tangerine-increase").innerHTML),
        level: document.querySelector(".tangerine-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'coconut',
        cost: document.querySelector('.coconut-cost'),
        parsedCost: parseFloat(document.querySelector('.coconut-cost').innerHTML),
        increase: document.querySelector(".coconut-increase"),
        parsedIncrease: parseFloat(document.querySelector(".coconut-increase").innerHTML),
        level: document.querySelector(".coconut-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'plum',
        cost: document.querySelector('.plum-cost'),
        parsedCost: parseFloat(document.querySelector('.plum-cost').innerHTML),
        increase: document.querySelector(".plum-increase"),
        parsedIncrease: parseFloat(document.querySelector(".plum-increase").innerHTML),
        level: document.querySelector(".plum-level"),
        fruitMultiplier: 1.025,
        costMultiplier: 1.12
    },
]

function incrementFruit(event){  //CREDITS APPLIED ON FRONTEND
    parsedFruit += fpc;
    fruit.innerHTML = Math.round(parsedFruit);
    const x = event.offsetX;
    const y = event.offsetY;

    const div = document.createElement('div');
    div.innerHTML = `+${Math.round(fpc)}`;
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 30px; pointer-events: none;`;
    fruitImageContainer.appendChild(div);

    div.classList.add('fade-up');
    timeout(div);
}

const timeout = (div) => {
    setTimeout(()=>{
        div.remove();
    },800);
}

function buyUpgrade(upgrade){
    const mu = upgrades.find((u)=> {
        if(u.name === upgrade) return u;
    });
    if(parsedFruit >= mu.parsedCost){
        fruit.innerHTML = Math.round(parsedFruit -= mu.parsedCost);
        mu.level.innerHTML++;
        mu.parsedIncrease = parseFloat(mu.parsedIncrease * mu.fruitMultiplier.toFixed(2));
        mu.increase.innerHTML = mu.parsedIncrease.toFixed(2);
        if(mu.name === 'clicker' || mu.name === 'banana' || mu.name === 'mango' || mu.name === 'watermelon'){
            fpc += mu.parsedIncrease;
        }
        else{
            fps += mu.parsedIncrease;
        }
        mu.parsedCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost);
    }
}

function save(){
    localStorage.clear();
    upgrades.map((upgrade)=>{
        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })
        localStorage.setItem(upgrade.name, obj);
    });
    localStorage.setItem('fpc', JSON.stringify(fpc));
    localStorage.setItem('fps', JSON.stringify(fps));
    localStorage.setItem('fruit', JSON.stringify(parsedFruit));
    localStorage.setItem('prestiege', JSON.stringify(prestiegeLevel));
}

function load(){
    const userConfirmed = window.confirm("Are you sure you want to load?");
    if (userConfirmed) {
        upgrades.map((upgrade)=>{
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name));
        upgrade.parsedCost = savedValues.parsedCost;
        upgrade.parsedIncrease = savedValues.parsedIncrease;
        upgrade.level.innerHTML = savedValues.parsedLevel;
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease.toFixed(2);
    });
    fpc = JSON.parse(localStorage.getItem('fpc'));
    fps = JSON.parse(localStorage.getItem('fps'));
    prestiegeLevel = JSON.parse(localStorage.getItem('prestiege'));
    parsedFruit = JSON.parse(localStorage.getItem('fruit'));
    fruit.innerHTML = Math.round(parsedFruit);
    incrementPrestiege();
    setInterval(()=>{
        save();
    }, 10000);
    }
}

function incrementPrestiege(){
    if(prestiegeLevel===1){
        document.documentElement.style.setProperty('--main-color', '#fe4d28');
        document.documentElement.style.setProperty('--shadow-color', '#903421');
        for(let i=0; i<=7; i++){
            document.getElementsByClassName("fruit-cost-img")[i].src = "./assets/strawberry-main.png";
        }
        document.getElementsByClassName("fruit-image")[0].src = "./assets/strawberry-main.png";
    }
}

function prestiege(){
    if(parsedFruit >= 1 && prestiegeLevel === 0){
        localStorage.clear();
        parsedFruit=0;
        fruit.innerHTML=parsedFruit;
        prestiegeLevel=1;
        save();
        load();
    }
}

setInterval(()=>{
    parsedFruit += fps / 10;
    fruit.innerHTML = Math.round(parsedFruit);
    fpcText.innerHTML = Math.round(fpc);
    fpsText.innerHTML = Math.round(fps);
}, 100);
