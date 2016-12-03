Intel® XDK IoT Node.js\* LCD Demo App
=====================================
See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

App Overview
------------
This example drives a JHD1313m1 LCD as found in the Grive Starter
Kit. This connects to an i2c buss.

The code can be used in either of two ways. By default, it will
use the upm module. This is much the simpler way to drive a upm
supported device.

By commenting out the call to the upm code and uncommenting the
useLcd call, you can also drive the device directly using the lcd
module. The purpose of this is to demonstrate driving the i2c
buss directly from Javascript. Notice that we need delays between
some of the bus transactions. There is no direct equivalent to
"wait" in Javascript. Instead we have to set up a callback on a
timer. So lcd.js creates a queue driven execution engine for
i2c devices.

The advantage of this is that you can do other things while
waiting for the buss to respond. For some applications this may
be important but for most, the blocking waits used by upm will
not cause problems.

Important Sample App Files
--------------------------
* main.js
* lcd.js
* package.json

Important Sample Project Files
------------------------------
* README.md
* LICENSE.md
* project-name.xdk
* project-name.xdke
