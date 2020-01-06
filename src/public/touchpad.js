let touchstartX = 0;
let touchstartY = 0;
let touchend = 0;
let deltaX = 0;
let deltaY = 0;

let ongoingTouches = [];
let firstTouch = {};

function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
}

const touchpadObj = document.getElementById("touchpad");

touchpadObj.addEventListener("touchstart", (event) => {
    let touches = event.changedTouches;

    if (touches.length > 1) {
        console.log("only single touch is allowed");
        return;
    }
    firstTouch = copyTouch(touches[0]);
    ongoingTouches.push(copyTouch(touches[0]));

});
touchpadObj.addEventListener("touchend", (event) => {
    let touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        if (touch.identifier == firstTouch.identifier) {
            if (Math.abs(touch.pageX - firstTouch.pageX) < 3 && Math.abs(touch.pageY - firstTouch.pageY) < 3) {
                socket.emit('btn', {buttonNum:1, press: true});
                socket.emit('btn', {buttonNum:1, press: false});
            }
        }

        if (touch.identifier == ongoingTouches[0].identifier) {
            ongoingTouches = [];
        }
    }
});

touchpadObj.addEventListener("touchmove", (event) => {
    let touches = event.changedTouches;

    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        if (touch.identifier == ongoingTouches[0].identifier) {
            deltaX = touch.pageX - ongoingTouches[0].pageX;
            deltaY = touch.pageY - ongoingTouches[0].pageY;
            socket.emit('move', {x:deltaX*2, y:deltaY*2});
            ongoingTouches[0] = copyTouch(touch);
        }
    }
});



