// TODO
// 價錢計算 => OK
// 內部導航按鈕變色
// fix: 元素會跟不上捲動

/* 活動照輪播 */
let slideEleArr = Array.from(document.querySelector(".event-intro-carousel").querySelectorAll(".slide"));
let ctrlBtnEleArr = Array.from(document.querySelector(".event-intro-carousel__ctrl-box").querySelectorAll(".ctrl-btn"));
let goPrevBtnEle = document.querySelector("#caro-prev-btn");
let goNextBtnEle = document.querySelector("#caro-next-btn");
let caroActiveIndex = 0;

goNextBtnEle.addEventListener("click", function () {
    const goNum = 1;
    const topNum = slideEleArr.length - 1;
    caroActiveIndex = cyclingNum(caroActiveIndex, goNum, topNum);
    updateCaro();
});

goPrevBtnEle.addEventListener("click", function () {
    const goNum = -1;
    const topNum = slideEleArr.length - 1;
    caroActiveIndex = cyclingNum(caroActiveIndex, goNum, topNum);
    updateCaro();
});

ctrlBtnEleArr.forEach((ctrlBtn, index) => {
    ctrlBtn.addEventListener("click", function () {
        caroActiveIndex = index;
        updateCaro();
    });
});

// 依照現在的caroActiveIndex更新輪播
function updateCaro() {
    switchActive(slideEleArr, caroActiveIndex);
    switchActive(ctrlBtnEleArr, caroActiveIndex);
}

// 切換active元素，arrToSwitch => 要被切換的陣列、targetIndex => 切換目標index
function switchActive(arrToSwitch, targetIndex) {
    arrToSwitch.forEach((arrEle) => {
        arrEle.classList.remove('active');
    });
    arrToSwitch[targetIndex].classList.add('active');
}

// 循環botNum-topNum
// 1. 要移動的步數diff % 區間長度 = 真正要移動的步數
// 2. 從fromNum開始移動，移動到超出區間範圍就要回到另一端
// 3. 做序數修正
// 參數名稱 => fromNum: 開始數字，diff: 要移動的步數，topNum, botNum: 循環區間最大(小)值
function cyclingNum(fromNum, diff, topNum, botNum = 0) {
    // 循環數字的區間長度，大減小後+1才會是正確的長度
    let numLength = topNum - botNum + 1;
    let result = 0;
    // 當result超過範圍的時候應該要立刻回到另一端並算做一次計數，然而在我們的計算過程中這個計數被忽略了，所以要校正
    // 例如，假設現在區間範圍是-1~4，當從4再往上加1的時候應該要直接變成-1，但我們的計算會將他算成4+1=5，所以要-1做校正
    const ordinalCorrect = 1;
    // 往前或後移動的步數
    let move = diff % numLength;
    result = fromNum + move;
    // 超出移動範圍就循環
    if (result > topNum) {
        result = botNum + (result - topNum) - ordinalCorrect;
    } else if (result < botNum) {
        result = topNum - (botNum - result) + ordinalCorrect;
    }
    return result;
}

/* 蒐藏按鈕 */
document.getElementById("event-fav-btn").onclick = function () {
    $("#event-fav-btn .add-fav-icon").toggleClass("add-fav-icon--faved");
};
document.getElementById("founder-fav-btn").onclick = function () {
    $("#founder-fav-btn .add-fav-icon").toggleClass("add-fav-icon--faved");
};

/* 內部導覽列 */
let innerNavOriginTop = $(".event-inner-nav").position().top;
// console.log(innerNavOriginTop);
// 滾動時
$(window).scroll(function (ev) {
    let eventInnerNav = $(".event-inner-nav");
    let navBtns = $(".event-inner-nav .event-inner-nav__btn")
    // 移動超過內部導覽列一開始的位置後
    if ($(this).scrollTop() > innerNavOriginTop) {
        // 移動
        // $(".event-inner-nav").css('position', "sticky");
        $(".event-inner-nav").css('top', $(this).scrollTop() - innerNavOriginTop);
        // 改變圓角
        $.each(navBtns, (index, btn) => {
            btn.style.borderRadius = "0px";
        });
    } else {
        $(".event-inner-nav").css('top', 0);
        $.each(navBtns, (index, btn) => {
            btn.style.borderRadius = "20px 20px 0 0";
        });
    }
});
// 介於特定位置時按鈕變色
let navBtns = document.querySelectorAll(".event-inner-nav__btn");
// 區間分界線
let zoneLines = [];
// 把區間分界線push進陣列中
for (let i = 0; i < navBtns.length; i++) {
    // 最後要減去內部導航列的高度，多減1px可以防止小數點帶來的錯誤
    zoneLines.push($(`#${navBtns[i].dataset.scrollto}`).offset().top - $(".event-inner-nav").outerHeight() - 1);
}

// 把body的結尾當成最後一條線
zoneLines.push($("body").offset().top + $("body").outerHeight());
for (let i = 0; i < navBtns.length; i++) {
    $(window).scroll(function () {
        // let startLine = $(`#${navBtns[i].dataset.scrollto}`).offset().top;
        // let endLine = $(`#${navBtns[i + 1].dataset.scrollto}`).offset().top;
        if ($(this).scrollTop() >= zoneLines[i] && $(this).scrollTop() < zoneLines[i + 1]) {
            navBtns[i].classList.add("active");
        } else {
            navBtns[i].classList.remove("active");
        }
    });
}
// 按下按鈕自動滾動
$(".event-inner-nav__btn").each((index, btn) => {
    let data = btn.dataset;
    let targetPos = $(`#${data.scrollto}`).offset();
    btn.addEventListener("click", function () {
        $("html, body").animate({
            scrollTop: targetPos.top - $(".event-inner-nav").height()
        }, 350, "linear");
    });
});

/* 活動方案懸浮面板 */
// 面板一開始的位置
let planBoardOriginTop = $(".event-plan-board").offset().top;
// row-gap
let rowGap = 25;
// 面板終點的底部位置
let planBoardEndBot = $(".event-introduction-container").offset().top + $(".event-introduction-container").height() - rowGap;
// console.log(planBoardEndBot);

// 面板與最上的間隙
let planBoardGap = 15;
$(window).scroll(function (ev) {
    // 移動超過方案面板一開始的位置後
    if ($(this).scrollTop() + planBoardGap > planBoardOriginTop && $(this).scrollTop() < planBoardEndBot - $(".event-plan-board").outerHeight() - planBoardGap) {
        // 移動
        // $(".event-plan-board").css("position", "sticky");
        $(".event-plan-board").css('top', $(this).scrollTop() - planBoardOriginTop + planBoardGap);
    } else if ($(this).scrollTop() + planBoardGap < planBoardOriginTop) {
        $(".event-plan-board").css('top', 0);
    } else if ($(this).scrollTop() > planBoardEndBot - $(".event-plan-board").outerHeight() + planBoardGap) {
        // console.log($(".event-plan-board").height());
        $(".event-plan-board").css('top', planBoardEndBot - $(".event-plan-board").outerHeight() - planBoardOriginTop);
    }
})

/* 活動金額計算 */
// 一開始先跑一次金額和切換金額欄位顯示以防萬一
calcTotalPrice();
switchPriceDisplay();
// 改變表單時計算金額和切換顯示
$("#plan").change(function () {
    switchPriceDisplay();
    calcTotalPrice();
});
// 減號按鈕
$(".minus-btn").click(function () {
    // 如果票數-1之後仍大於0則-1
    if (Number($(".ticket-amount-box .amount").text()) - 1 > 0) {
        $(".ticket-amount-box .amount").text(Number($(".ticket-amount-box .amount").text()) - 1);
    }
    calcTotalPrice();
});
// 加號按鈕
$(".plus-btn").click(function () {
    // 票數加1
    $(".ticket-amount-box .amount").text(Number($(".ticket-amount-box .amount").text()) + 1);
    calcTotalPrice();
});
// 方案介紹區塊的按鈕
let planChooseBtnArr = document.querySelectorAll("#event-page-plan-intro .plan-choose-btn");
planChooseBtnArr.forEach((btn, index) => {
    btn.addEventListener("click", function () {
        // 方案下拉選單
        let planSelect = document.getElementById("plan");
        // 方案下拉選單的選項陣列
        let planOpts = planSelect.getElementsByTagName("option");
        // 按鈕的index + 1剛好是該被選擇的選項
        planOpts[index + 1].selected = true;
        // 不會觸發選單的change所以要刷新金額跟切換顯示
        calcTotalPrice();
        switchPriceDisplay();
    });
})

// 依照選單選項計算金額並直接修改.total-price的數字
function calcTotalPrice() {
    let totalPrice = 0;
    // 取得各票種的票價(照上下順序取得)
    let priceArr = $.map($("#event-page-plan-intro .plan-list .price"), function (ele, index) {
        return ele.textContent;
    });
    // 取得票種選擇器
    let planSelect = $("#plan");
    let planSelectIndex = planSelect.find("option:selected").index();
    // 取得票數
    let amount = $(".ticket-amount-box .amount").text();
    if (planSelectIndex != 0) {
        totalPrice = priceArr[planSelectIndex - 1] * amount;
    }
    // 修改票價
    $(".event-plan-board .total-price").text(totalPrice);
    calcFunPoint();
    function calcFunPoint() {
        $(".event-plan-board .fun-point").text($(".event-plan-board .total-price").text() / 100);
    }
    // 判斷減號按鈕要不要disabled
    if (Number($(".ticket-amount-box .amount").text() <= 1)) {
        $(".minus-btn").addClass("disabled");
    } else {
        $(".minus-btn").removeClass("disabled");
    }
}

// 切換顯示總金額
function switchPriceDisplay() {
    let switchedEleArr = [$(".ticket-amount-box"), $(".event-plan-board .price-box"), $(".fun-point-box")];
    if (($("#plan").find("option:selected").index() != 0)) {
        switchedEleArr.forEach(function (ele) {
            ele.css("display", "flex");
        });
    } else {
        switchedEleArr.forEach(function (ele) {
            ele.css("display", "none");
        });
    }
}

// 報名按鈕
$("#sign-up-btn").click(() => {
    // 目前先直接跳轉
    location.href = "../Check/check.html";
});

