//    コンテンツ表示領域の幅
var WINDOW_WIDTH = document.documentElement.clientWidth * 0.65;
//   コンテンツ表示領域の高さ
var WINDOW_HEIGHT = document.documentElement.clientHeight * 0.33;
// 
var STEPTIME = 50
// 魚idに関する配列を作る
let fishData = [
    [0, 0, 20, 20, "main_fish"],
    [300, 20, 15, 5, "tako1"],
    [150, 100, 10, 0, "tako2"],
    [500, 70, 5, 5, "tako3"],
    [400, 50, 30, 30, "tako4"],
    [400, 200, 10, 10, "many_fish1"],
    [450, 200, 20, 10, "many_fish2"],
    [300, 10, 5, 5, "many_fish3"],
    [10, 100, -5, -5, "maguro1"],
    [40, 300, -5, 0, "maguro2"],
    [150, 150, 20, -5, "maguro3"],
    [0, 400, 20, 0, "wakame1"],
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

// 角度を決める
// y座標だけ向きに関する条件を加える
function decideRotate(x,y,plusUpOrDownStep){
    console.log(x,y);

    // もう一つ比較するベクトル
    let target_vec_x = 1;
    let target_vec_y = 0;

    // 一つのベクトルは、(x,y)比較するのは(0,1)これのなす角度を求める必要がある
    let cos = (x * target_vec_x + target_vec_y * y) / ( Math.sqrt((x * x) + (y * y)) * Math.sqrt((target_vec_x * target_vec_x) + (target_vec_y * target_vec_y)) );
    // console.log(cos);
    let rotate = Math.acos(cos) * 180 / 3.14;

    // ,plusUpOrDownStepがマイナスの場合向きを変える
    if (plusUpOrDownStep < 0) {
        rotate *= -1;
    }
    // console.log(rotate);
    return rotate
}

// 引数について
// 第一引数 : xの初期座標
// 第二引数 : yの初期座標
// 第三引数 : １回の移動におけるx座標のスピード
// 第四引数 : １回の移動におけるy座標のスピード
// 第五引数 : 動かす画像のid
function mainFish(func_x, func_y, func_plusRightOrLeftStep, func_plusUpOrDownStep, fishNameId){

    let [ x , plusRightOrLeftStep ]  = decideRightOrLeft(func_x,func_plusRightOrLeftStep);
    let [ y , plusUpOrDownStep ]  = decideUpOrDown(func_y,func_plusUpOrDownStep);

    // 角度を決める（辻褄が合うように微調整）
    console.log("plusRightOrLeftStep,plusUpOrDownStep");
    let rotate = decideRotate(plusRightOrLeftStep,plusUpOrDownStep,plusUpOrDownStep) - 180;

    document.getElementById(fishNameId).style.top = y + "px";
    document.getElementById(fishNameId).style.left = x + "px";
    document.getElementById(fishNameId).style.transform = "rotate(" + rotate + "deg)";
    // console.log(document.getElementById(fishNameId).style.top);
    // console.log(document.getElementById(fishNameId).style.left);
    // console.log(document.getElementById(fishNameId).style.transform);
    return [ x, y, plusRightOrLeftStep, plusUpOrDownStep ] ;
}

// 動かす魚をここに書く
const MoveFish = (fishData) => {
    for (let i = 0; i < fishData.length; i++) {
        let NewfishData = mainFish(fishData[i][0], fishData[i][1], fishData[i][2] ,fishData[i][3] , fishData[i][4]);
        for (let j = 0; j < NewfishData.length; j++) {
            fishData[i][j] = NewfishData[j];
        }
    }
}

setInterval(MoveFish, STEPTIME, fishData);