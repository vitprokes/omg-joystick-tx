let y_disp = 0
let x_disp = 0
let corner = 0
let speed = 0
let y_joystick = 0
let x_joystick = 0
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
radio.setGroup(128)
basic.forever(function () {
    x_joystick = pins.analogReadPin(AnalogReadWritePin.P2)
    y_joystick = pins.analogReadPin(AnalogReadWritePin.P1)
    speed = Math.map(y_joystick, 0, 1023, -100, 100)
    corner = Math.map(x_joystick, 0, 1023, -100, 100)
    if (Math.abs(speed) < 10) {
        speed = 0
    } else if (Math.abs(corner) < 10) {
        corner = 0
    }
    radio.sendValue("left", Math.constrain(speed - corner, -100, 100))
    radio.sendValue("right", Math.constrain(speed + corner, -100, 100))
})
basic.forever(function () {
    led.unplot(x_disp, y_disp)
    x_disp = Math.round(Math.map(x_joystick, 0, 1023, 4, 0))
    y_disp = Math.round(Math.map(y_joystick, 0, 1023, 4, 0))
    led.plot(x_disp, y_disp)
})
