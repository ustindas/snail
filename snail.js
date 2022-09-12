var timerSnake = null, blocktimer = null, fallBlock = null;
var X = 10, Y = 0, x1 = 0, y1 = 0, score = 0, x2 = 0, y2 = 0;
var f = false;
var j = false;
var pau = false, st1 = false;
var nowname;

$(document).ready(function (event) {
    $(document).keydown(click);
    $("#regul").load("regulations.html");
    $("#rect").append($("#back"));
    $("#rating").css("display", "none");
    $("#regulations").click(Regulations);
    
    setTimeout(function () {

        $("#letter_1").animate({"margin-top": "+=30%", opacity: 0}, 1000);
        $("#letter_2").animate({"margin-top": "+=30%", opacity: 0}, 1500);
        $("#letter_3").animate({"margin-top": "+=30%", opacity: 0}, 1700);
        $("#letter_4").animate({"margin-top": "+=30%", opacity: 0}, 1500);
        $("#letter_5").animate({"margin-top": "+=30%", opacity: 0}, 1000);
        $("#letter_6").animate({"margin-top": "+=30%", opacity: 0}, 1300);
        $("#letter_7").animate({"margin-top": "+=30%", opacity: 0}, 1200);
        $("#letter_8").animate({"margin-top": "+=30%", opacity: 0}, 1400);
        $("#rect").show();
    }, 300);
    setTimeout(function () {
        $("#intro").animate({opacity: 0}, 300);
    }, 2100);

    setTimeout(function () {
        $("#intro").remove();
    }, 2800);

    Name();
});

function Regulations() {
    $("#back").show();
    $("#regul").show();
    if (j === true)
        Pause();
    $("#back").click(function () {
        $("#regul").css("display", "none");
        $("#back").css("display", "none");
    });
}
function Name() {
    $("#name").val(null);
    $("#start").css("display", "none");
    $("#regulations").css("display", "none");
    if (f === false)
        f = true;
    else {
        $("#rating").css("display", "none");
        $('div.itog').remove();
        $('div.knopki').remove();
    }
    $("#startName").show();
    $("#start_button").on("click", Start);

    for (i = 1; i < 6; i++) {
        $("#id_" + i).html(localStorage.getItem("top" + i + " name"));
        $("#id_" + i + i).html(localStorage.getItem("top" + i + " score"));
    }
}

function Start() {
    if ($("#name").val() === "")
        nowname = "--------";
    else
        nowname = $("#name").val();
    $("#startName").css("display", "none");
    $("#rect").append($("#regulations"));
    $("#regulations").show();
    $("#start").remove();

    var startSnake = $("<div>");
    startSnake.text("Начать игру");
    startSnake.attr("id", "start");
    $("#rect").append(startSnake);
    (startSnake).addClass("startSnake");
    (startSnake).click(StartGame);
}
function StartGame() {
    $("#start").remove();
    if (pau === true)
        $(".pau").remove();
    if (st1 === false) {
        st1 = true;
    }
    var pause = $("<button>",
            {
                id: "pause",
                class: "pau",
                css: {
                    "background": "url(pictures/pauz1.jpg)"
                }

            });
    $("#rect").append(pause);
    if (f === true) {
        $("#rating").css("display", "none");
        $('div.itog').remove();
        $('div.knopki').remove();
    //     $("#rat").css("display", "none");
    }

    pau = false;
    if (j === false) {
        SnakeBlock();
        Food();
        var Score = $("<div>",
                {
                    id: "food",
                    class: "score"
                });
        $("#rect").append(Score);
        Score.text(0);
    } else {

    timerSnake = setInterval(go, 70);
    }
    blocktimer = setInterval(Block, 700);
    fallBlock = setInterval(goBlock, 70);
    var pause = $("#pause");
    pause.click(Pause);
}

function Pause() {
    $(".pau").remove();
    var prod = $("<button>",
            {
                css: {
                    "background": "url(pictures/buttpr1.jpg)"
                },
                id: "pause",
                class: "pau"

            });
    pau = true;
    clearInterval(timerSnake);
    clearInterval(fallBlock);
    clearInterval(blocktimer);
    $("#rect").append(prod);
    prod.click(StartGame);
}

function SnakeBlock() {
    j = true;
    var Snake = $("<div>",
            {
                "x": 400,
                "y": 250,
                css: {
                    "left": "400px",
                    "top": "250px"
                },
                class: "snake-cell",
                id: "gos"
            });
    $("#rect").append(Snake);
    timerSnake = setInterval(go, 70);
}

function go() {
    el = $("#gos");
    x1 = parseInt(el.attr("x"));
    y1 = parseInt(el.attr("y"));
    if (x1 + X < 0 || x1 + X > 765 || y1 + Y < 0 || y1 + Y > 460) {
        GameOver();
    } else {
        x1 += X;
        y1 += Y;
        el.css("left", x1 + "px");
        if (X === 10)
            el.css("background", "url(pictures/sn1.jpg) no-repeat");
        else if (X === -10)
            el.css("background", "url(pictures/sn2.jpg) no-repeat");
        el.css("top", y1 + "px");

        el.attr("x", x1);
        el.attr("y", y1);

        if (x1 + 20 >= x2 - 10 && x1 - 20 <= x2 - 10 && y1 - 20 <= y2 - 10 && y1 + 20 >= y2 - 10 ||
                x1 + 20 >= x2 - 10 && x1 - 20 <= x2 - 10 && y1 - 20 <= y2 + 10 && y1 + 20 >= y2 + 10 ||
                x1 + 20 >= x2 + 10 && x1 - 20 <= x2 + 10 && y1 - 20 <= y2 + 10 && y1 + 20 >= y2 + 10 ||
                x1 + 20 >= x2 + 10 && x1 - 20 <= x2 + 10 && y1 - 20 <= y2 - 10 && y1 + 20 >= y2 - 10) {
            $('div.food').remove();
            score++;
            $("#food").text(score);

            Food();
        }
    }
}
function Block() {
    var random = Math.floor(Math.random() * 760);
    var block = $("<div>",
            {
                "x": random,
                "y": 0,
                class: "block",
                css: {
                    "left": random + "px",
                    "top": 0 + "px"
                }
            });
    $("#rect").append(block);
}
function goBlock() {
    $("div.block").each(function (index, e) {
        el = $(e);
        var x = parseInt(el.attr("x"));
        var y = parseInt(el.attr("y"));
        if (x + 20 >= x1 - 20 && x - 20 <= x1 - 20 && y - 20 <= y1 - 20 && y + 20 >= y1 - 20 || // 1.левый верхний угол 
                x + 20 >= x1 - 20 && x - 20 <= x1 - 20 && y - 20 <= y1 + 20 && y + 20 >= y1 + 20 || // 2.левый нижний угол
                x + 20 >= x1 + 20 && x - 20 <= x1 + 20 && y - 20 <= y1 + 20 && y + 20 >= y1 + 20 || // 3.
                x + 20 >= x1 + 20 && x - 20 <= x1 + 20 && y - 20 <= y1 - 20 && y + 20 >= y1 - 20) // 4.
            GameOver();
        else {
            y += 5;
            el.css("top", y + "px");
            el.attr("y", y);
            if (y > 455) {
                el.remove();
            }
        }
    });
}

function Food() {
    for (var i = 0; i < 1; i++) {
        x2 = Math.floor(10 + Math.random() * 730);
        y2 = Math.floor(10 + Math.random() * 380);
        var food = $("<div>",
                {

                    "x": x2,
                    "y": y2,
                    css: {
                        "left": x2 + "px",
                        "top": y2 + "px"
                    },
                    class: "food"
                });
        $("#rect").append(food);
    }
}

function GameOver() {
    $("#rating").show();
    $("#name_id").show();
    $("#score_id").show();
    X = 10;
    Y = 0;
    clearInterval(timerSnake);
    clearInterval(fallBlock);
    clearInterval(blocktimer);
    var Itog = $("<div>",
            {
                class: "itog"
            });
    $("#rect").append(Itog);
    $('div.block').remove();
    $('div.snake-cell').remove();
    $('div.food').remove();
    $("#pause").remove();
    Itog.text("Ваш результат: " + score);
    for (var i = 1; i < 6; i++) {
        if ($("#id_" + i + i).html() < score) {
            for (var k = 5; k > i; k--) {
                $("#id_" + k).html(($("#id_" + (k - 1)).html()));// }

                $("#id_" + k + k).html($("#id_" + (k - 1) + (k - 1)).html());
                localStorage.setItem("top" + k + " name", $("#id_" + (k - 1)).html());
                localStorage.setItem("top" + k + " score", $("#id_" + (k - 1) + (k - 1)).html());
            }
            $("#id_" + i).html(nowname);
            $("#id_" + i + i).html(score);
            localStorage.setItem("top" + i + " name", nowname);
            localStorage.setItem("top" + i + " score", score);
            break;
        }
    }
    $('div.score').remove();
    var ob = $("<div>",
            {
                class: "knopki"
            });
    $("#rect").append(ob);
    var inmenu = $("<div>",
            {
                css: {
                    "background": "url(pictures/change.png)"
                },
                class: "in"
            });
    ob.append(inmenu);
    var restart = $("<div>",
            {
                css: {
                    "background": "url(pictures/restart.png)"
                },
                class: "in"
            });
    ob.append(restart);
    inmenu.click(Name);
    restart.click(StartGame);
    j = false;
    score = 0;
    st1 = false;
}
function click(event) {
    var ch = event.keyCode;

    if (ch === 38) {
        Y = -10;
        X = 0;

    } else if (ch === 39) {
        X = 10;
        Y = 0;
    } else if (ch === 40) {
        X = 0;
        Y = 10;
    } else if (ch === 37) {
        X = -10;
        Y = 0;
    } else if (ch === 32) {
        if (pau === false) {
            Pause();
        } else {
            StartGame();
        }
    }
}