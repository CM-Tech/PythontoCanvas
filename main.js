var c = $("#c");
c[0].setAttribute("width", $(window).width());
c[0].setAttribute("height", $(window).height());
$(window).resize(function() {
    w = $(window).width();
    h = $(window).height();
    c[0].setAttribute("width", $(window).width());
    c[0].setAttribute("height", $(window).height());
});
var shots = [];
var w = $(window).width();
var h = $(window).height();
var ctx = c[0].getContext("2d");
var enemies = [];
var you = {
    x: 1,
    y: 1
};
var direction = {
    left: false,
    right: false,
    up: false,
    down: false
};
var axis = {
    x: 0,
    y: 0
};
var time = 0;
var speed = 0.9;
var score = 0;
var running = true;
var timer = setInterval(tick, 0.01);
var easy = true;
$("body").keydown(function(event) {
    if (running === true) {

        if (easy === true) {
            if (event.which == 87) {
                event.preventDefault();
                allfalse();
                direction.up = true;
            }
            if (event.which == 83) {
                event.preventDefault();
                allfalse();
                direction.down = true;
            }
            if (event.which == 65) {
                event.preventDefault();
                allfalse();
                direction.left = true;
            }
            if (event.which == 68) {
                event.preventDefault();
                allfalse();
                direction.right = true;
            }
            if (event.which == 38) {
                event.preventDefault();
                allfalse();
                direction.up = true;
            }
            if (event.which == 40) {
                event.preventDefault();
                allfalse();
                direction.down = true;
            }
            if (event.which == 37) {
                event.preventDefault();
                allfalse();
                direction.left = true;
            }
            if (event.which == 39) {
                event.preventDefault();
                allfalse();
                direction.right = true;
            }
        } else {
            if (event.which == 87) {
                event.preventDefault();
                axis.y -= 0.1;
            }
            if (event.which == 83) {
                event.preventDefault();
                axis.y += 0.1;
            }
            if (event.which == 65) {
                event.preventDefault();
                axis.x -= 0.1;
            }
            if (event.which == 68) {
                event.preventDefault();
                axis.x += 0.1;
            }
            if (event.which == 38) {
                event.preventDefault();
                axis.y -= 0.1;
            }
            if (event.which == 40) {
                event.preventDefault();
                axis.y += 0.1;
            }
            if (event.which == 37) {
                event.preventDefault();
                axis.x -= 0.1;
            }
            if (event.which == 39) {
                event.preventDefault();
                axis.x += 0.1;
            }
        }
        if (event.which == 32) {
            event.preventDefault();
            shoot();
        }
        if (event.which == 16) {
            event.preventDefault();
            cenemy();
        }
    }
    if (event.which == 32) {
        event.preventDefault();
        if (running === false) {
            startgame();
        }
    }
});

function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "hsla( " + score * 100 + ", 100%, 50%, 1)";
    ctx.fillRect(you.x, you.y, 50, 50);
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, you.x + 25, you.y - 5);
    time++;
    if (time == 1000) {
        cenemy();
        time = 0;
    }

    if (easy === true) {
        if (direction.left === true && (you.x > 0)) {
            you.x -= speed;
        }
        if (direction.right === true && (you.x < w - 50)) {
            you.x += speed;
        }
        if (direction.up === true && (you.y > 0)) {
            you.y -= speed;
        }
        if (direction.down === true && (you.y < h - 50)) {
            you.y += speed;
        }
    } else {
        if (((you.x < w - 50) || (axis.y >= 0)) && ((you.x > 0) || (axis.y <= 0))) {
            you.x += axis.x;
        }
        if (((you.y < h - 50) || (axis.y <= 0)) && ((you.y > 0) || (axis.y >= 0))) {
            you.y += axis.y;
        }
        if (you.x >= w - 50) {
            axis.x = 0;
            you.x--;
        }
        if (you.x <= 0) {
            axis.x = 0;
            you.x++;
        }
        if (you.y >= h - 50) {
            axis.y = 0;
            you.y--;
        }
        if (you.y <= 0) {
            axis.y = 0;
            you.y++;
        }
    }
    if (shots.length !== 0) {
        shots[0].x += 5;
        ctx.fillStyle = "lawngreen";
        ctx.fillRect(shots[0].x, shots[0].y, 80, 25);
        if (shots[0].x > w) {
            shots.splice(0, 1);
        }
    }
    if (enemies.length !== 0) {
        for (var i = 0; i < enemies.length; i++) {
            ctx.fillStyle = "red";
            enemies[i].x -= 0.5;
            ctx.fillRect(enemies[i].x, enemies[i].y, 25, 25);

            if (enemies[i].x <= 0) {
                endgame();
            }
            if (enemies[i].x <= you.x + 50 && enemies[i].x >= you.x - 25 && enemies[i].y <= you.y + 50 && enemies[i].y >= you.y - 25) {
                endgame();
            }
            if (shots[0]) {
                if (enemies[i].y <= shots[0].y + 25 && enemies[i].y >= shots[0].y - 25 && enemies[i].x < shots[0].x + 80) {
                    enemies.splice(i, 1);
                    score++;
                }
            }
        }
    }
}

function startgame() {
    clearInterval(timer);
    timer = setInterval(tick, 0.01);
    running = true;
    enemies = [];
    you = {
        x: 0,
        y: 0
    };
    allfalse();
    shots = [];
    score = 0;
}

function endgame() {
    clearInterval(timer);
    timer = setInterval(egame, 100);
    running = false;
}

function egame() {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Nice Try!", w / 2, h / 2);
    ctx.fillText("Your score was: " + score, w / 2, h / 2 + 30);
    ctx.fillText("Press space to retry", w / 2, h / 2 + 75);
}

function allfalse() {
    direction.left = false;
    direction.right = false;
    direction.up = false;
    direction.down = false;
}

function shoot() {
    if (shots.length === 0) {
        shots.push({
                x: you.x + 60,
                y: you.y + 12.5
            });
    }
}

function cenemy() {
    var enemy = {
        x: w,
        y: Math.floor((Math.random() * (h - 25)) + 1),
        speed: 0
    };
    enemies.push(enemy);
}
$('#fscreen').on('click', function() {
    // if already full screen; exit
    // else go fullscreen
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        element = $('#cscreen').get(0);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    c[0].setAttribute("width", $(window).width());
    c[0].setAttribute("height", $(window).height());
});
