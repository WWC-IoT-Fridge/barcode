/*
 * A simple Node.js application to write to a digital output.
 * Supported Intel IoT development boards are identified in the code.
 *
 * See LICENSE.md for license terms and conditions.
 *
 * https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
 */

// keep /*jslint and /*jshint lines for proper jshinting and jslinting
// see http://www.jslint.com/help.html and http://jshint.com/docs
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var APP_NAME = "IoT Digital Write" ;
var mraa = require("mraa");
var blue = require("./cfg-app-platform.js")() ;          // init and config I/O resources
var red = require("./cfg-app-platform.js")();
console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n") ;   // poor man's clear console
console.log("Initializing " + APP_NAME) ;

// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

blue.identify() ;                // prints some interesting platform details to console

if( !blue.test() ) {
    process.exitCode = 1 ;
    throw new Error("Call to cfg.test() failed, check console messages for details.") ;
}

if( !blue.init() ) {
    process.exitCode = 1 ;
    throw new Error("Call to cfg.init() failed, check console messages for details.") ;
}

var blueList = ["Sweet potatoes", "Mac and cheese leftovers", "Orange juice"];
var redList = ["Thai curry", "Ketchup", "Carrots"];

var Color = function(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b;
};

var blueColor = new Color(0, 0x3E, 0x62);
var redColor = new Color(0x62, 0, 0);



var writeWithPauses = function(list, pauseTime) {
    return new Promise( function (resolve, reject) {
        var iterateList = function (list) {
            var i = 0;
            return {
                next: function() {
                    if (i >= list.length) {
                        clearInterval(intID);
                        resolve();
                    } else {
                        clearAndWrite(list[i++]);
                        return;
                    }
                }
            };
        };
        var iter = iterateList(list);
        var intID = setInterval(iter.next, pauseTime);
    });
};
var clearAndWrite = function(str) {
    display.clear();
    display.home();
    display.write(str);
};
var showList = function (color, list) {
    display.setColor(color.red, color.green, color.blue);
    return writeWithPauses(list, 4000);
}; 





// configure (initialize) our I/O pins for usage (gives us an I/O object)
// configuration is based on parameters provided by the call to cfg.init()

var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

red.io = new red.mraa.Gpio(6, true, false);
red.io = new red.mraa.Gpio(6, true, false);
red.io.dir(red.mraa.DIR_OUT);
blue.io = new blue.mraa.Gpio(blue.ioPin, blue.ioOwner, blue.ioRaw) ;
blue.io.dir(blue.mraa.DIR_OUT) ;                  // configure the gpio pin as an output

var button = new mraa.Gpio(7);
var buttonPressed = function () {
    console.log("pressed");
    showList(blueColor, blueList).then(function() {showList(redColor, redList)});
};

console.log("before button\n");
button.isr(mraa.EDGE_BOTH, buttonPressed);
console.log("After button\n");
blue.io.write(0);
red.io.write(1);
(function wait(){
 setTimeout(wait, 1000);
 })();