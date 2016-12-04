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
var cfg = require("./cfg-app-platform.js")() ;          // init and config I/O resources
var test= require("./cfg-app-platform.js")();
console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n") ;   // poor man's clear console
console.log("Initializing " + APP_NAME) ;

// confirm that we have a version of libmraa and Node.js that works
// exit this app if we do not

cfg.identify() ;                // prints some interesting platform details to console

if( !cfg.test() ) {
    process.exitCode = 1 ;
    throw new Error("Call to cfg.test() failed, check console messages for details.") ;
}

if( !cfg.init() ) {
    process.exitCode = 1 ;
    throw new Error("Call to cfg.init() failed, check console messages for details.") ;
}

var blueList = ["Sweet potatoes", "Mac and cheese leftovers", "Orange juice"];
var redList = ["Thai curry", "Ketchup", "Carrots"];

Color = function(r, g, b) {
    this.red = r;
    this.green = g;
    this.blue = b
}

var blueColor = new Color(0, 0x3E, 0x62);
var redColor = new Color(0x62, 0, 0);

iterateList = function (list) {
    var i = 0;
    return {
        next: function () { 
            if (i >= list.length) {
                return {done: true}
            } else { 
                display.write(list[i++]);
                return {value: true}
            }
        }} 
}

writeWithPauses = function(list, pauseTime) {
    var iter = iterateList(list);
    var intID = setInterval(iter.next, pauseTime);
    iterateList = function (list) {
        var i = 0;
        return {
            next: function() {
                if (i >= list.length) {
                    clearInterval(intID);
                    return;
                } else {
                    clearAndWrite(list[i++]);
                    return;
                }
            }
        };
    };
};
clearAndWrite = function(str) {
    display.clear();
    display.home();
    display.write(str);
    //THIS MIGHT WORK
    display.scroll(true);
};
var showList = function (color, list) {
    display.setColor(color.red, color.green, color.blue);
    writeWithPauses(list, 4000);
}; 





// configure (initialize) our I/O pins for usage (gives us an I/O object)
// configuration is based on parameters provided by the call to cfg.init()
var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
showList(blueColor, blueList);
showList(redColor, redList);
test.io = new test.mraa.Gpio(6, true, false);
test.io = new test.mraa.Gpio(6, true, false);
test.io.dir(test.mraa.DIR_OUT);
cfg.io = new cfg.mraa.Gpio(cfg.ioPin, cfg.ioOwner, cfg.ioRaw) ;
cfg.io.dir(cfg.mraa.DIR_OUT) ;                  // configure the gpio pin as an output

console.log("Using digital output pin number: " + cfg.ioPin) ;


// now we are going to write the digital output at a periodic interval

var digOut ;
var digOut2;
var periodicActivity = function() {
    digOut = cfg.io.read() ;                    // get the current state of the output pin
    cfg.io.write(digOut?0:1) ;                  // if the pin is currently 1 write a '0' (low) else write a '1' (high)
    process.stdout.write(digOut?'0':'1') ;      // and write an unending stream of toggling 1/0's to the console
    digOut2 = test.io.read() ;                    // get the current state of the output pin
    test.io.write(digOut?1:0) ;                  // if the pin is currently 1 write a '0' (low) else write a '1' (high)
    process.stdout.write(digOut?'1\0':'0\0') ; 
} ;
//var intervalID = setInterval(periodicActivity, 1000) ;  // start the periodic write
cfg.io.write(0);
test.io.write(0);
var testActivity = function () {
    cfg.io.write(0);
    test.io.write(1);
    process.stdout.write('wrote 0 to cfg, 1 to test');
}

var secondTest = function () {
    cfg.io.write(1);
    test.io.write(0);
    process.stdout.write("okay we're done now, switched it");
}
//var intervalID = setInterval(periodicActivity, 1000) ;  // start the periodic write
setTimeout(testActivity, 5000);
setTimeout(secondTest, 8000);

// type process.exit(0) in debug console to see
// the following message be emitted to the debug console

process.on("exit", function(code) {
    //clearInterval(intervalID) ;
    console.log("\nExiting " + APP_NAME + ", with code:", code) ;
}) ;
