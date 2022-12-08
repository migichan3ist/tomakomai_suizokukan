//    コンテンツ表示領域の幅
var WINDOW_WIDTH = document.documentElement.clientWidth * 0.8;
//   コンテンツ表示領域の高さ
var WINDOW_HEIGHT = document.documentElement.clientHeight * 0.8;
// 
var STEPTIME = 100
// 魚idに関する配列を作る
let fishData = [
    [0, 0, 0, 32, "main_fish"],
];

// 上下を決める
function decideUpOrDown(y,func_plusStep){
    let plusStep  = func_plusStep;
    // window下にいく
    if (y + func_plusStep >= WINDOW_HEIGHT) {
        plusStep = -1 * func_plusStep;
    }
    // window上にいく
    if (y + func_plusStep <= 0) {
        plusStep = -1 * func_plusStep;
    }
    // return upOrDown , plusStep
    return [ y + plusStep , plusStep ] ;
}

// 左右を決める
function decideRightOrLeft(x,func_plusStep){

    // window下にいく
    let plusStep  = func_plusStep;
    if (x + func_plusStep >= WINDOW_WIDTH) {
        plusStep = -1 * func_plusStep;
    }

    // window上にいく
    if (x + func_plusStep <= 0) {
        plusStep = -1 * func_plusStep;
    }
    // return rightOrLeft , plusStep
    return [ x + plusStep , plusStep ] ;
}

// 引数について
// 第一引数 : xの初期座標
// 第二引数 : yの初期座標
// 第三引数 : １回の移動におけるx座標のスピード
// 第四引数 : １回の移動におけるy座標のスピード
// 第五引数 : 動かす画像のid
function mainFish(func_x, func_y, func_plusRightOrLeftStep, func_plusUpOrDownStep, fishNameId){

    let [ x , plusRightOrLeftStep ]  = decideRightOrLeft(func_x,func_plusRightOrLeftStep);
    console.log("xのデバック");
    console.log(x , plusRightOrLeftStep);
    let [ y , plusUpOrDownStep ]  = decideUpOrDown(func_y,func_plusUpOrDownStep);
    console.log("yのデバック");
    console.log(y , plusUpOrDownStep);

    document.getElementById(fishNameId).style.top = y + "px";
    document.getElementById(fishNameId).style.left = x + "px";
    console.log(document.getElementById(fishNameId).style.top);
    console.log(document.getElementById(fishNameId).style.left);
    return [ x, y, plusRightOrLeftStep, plusUpOrDownStep ] ;
}

// 動かす魚をここに書く
const MoveFish = (fishData) => {
    for (let i = 0; i < fishData.length; i++) {
        let NewfishData = mainFish(fishData[i][0], fishData[i][1], fishData[i][2] ,fishData[i][3] , fishData[i][4]);
        console.log(NewfishData);
        for (let j = 0; j < NewfishData.length; j++) {
            fishData[i][j] = NewfishData[j];
        }
    }
}

setInterval(MoveFish, STEPTIME, fishData);