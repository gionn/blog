---
layout: post
title: !binary |-
  RGViaWFuIG9uIFNvbnkgVmFpbyBWUENTMTNWOUU=
created: 1299182360
comments: true
categories: !binary |-
  ZGViaWFuIGhhcmR3YXJl
---
After selling my macbook pro, I decided to go back to PC world and searching for something more suitable for a <strong>roadwarrior sysadmin</strong>.

I've bought a 13,3" Sony Vaio (VPCS13V9E), and I have found some rusty after having successfully installed Debian Squeeze.
<!--break-->
<ul>
  <li>black screen after grub: added <strong>nomodeset</strong> kernel parameter;</li>
  <li>nvidia proprietary drivers not detecting screen: used custom <strong>xorg.conf</strong>, after copying /proc/acpi/video/IGPU/LCD0/EDID to /etc/EDID (not needed after nvidia-glx 260.19.44-1 from unstable);</li>
  <li>touchpad not working: worked after <strong>upgrading kernel</strong> 2.6.37 from unstable;</li>
  <li>audio not working: worked after <strong>upgrading kernel</strong> 2.6.37 from unstable;</li>
  <li>monitor backlight (brightness): installed <strong>nvidiabl</strong> (https://github.com/guillaumezin/nvidiabl) and created a brightness.sh (thanks to Sony BIOS that export a dummy ACPI video module) (not needed from kernel 2.6.38);</li>
  <li>umts modem: apt-get install <strong>gobi-loader</strong> and copy in /lib/firmware/gobi/ the blobs amss.mbn, apps.mbn, UQCN.mbn from Windoze.</li>
  <li>fingerprint reader (147e:1001 Upek): follow http://www.n-view.net/Appliance/fingerprint/</li>
</ul>

<code>
Section "ServerLayout"
	Identifier     "X.org Configured"
	Screen      0  "Screen0" 0 0
	InputDevice    "Mouse0" "CorePointer"
	InputDevice    "Keyboard0" "CoreKeyboard"
EndSection

Section "Files"
	ModulePath   "/usr/lib/xorg/modules"
	FontPath     "/usr/share/fonts/X11/misc"
	FontPath     "/usr/share/fonts/X11/cyrillic"
	FontPath     "/usr/share/fonts/X11/100dpi/:unscaled"
	FontPath     "/usr/share/fonts/X11/75dpi/:unscaled"
	FontPath     "/usr/share/fonts/X11/Type1"
	FontPath     "/usr/share/fonts/X11/100dpi"
	FontPath     "/usr/share/fonts/X11/75dpi"
	FontPath     "/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType"
	FontPath     "built-ins"
EndSection

Section "Module"
	Load  "extmod"
	Load  "dbe"
	Load  "glx"
	Load  "dri"
	Load  "dri2"
	Load  "record"
EndSection

Section "InputDevice"
	Identifier  "Keyboard0"
	Driver      "kbd"
EndSection

Section "InputDevice"
	Identifier  "Mouse0"
	Driver      "mouse"
	Option	    "Protocol" "auto"
	Option	    "Device" "/dev/input/mice"
	Option	    "ZAxisMapping" "4 5 6 7"
EndSection

Section "Monitor"
	Identifier   "Monitor0"
	VendorName   "Monitor Vendor"
	ModelName    "Monitor Model"
EndSection

Section "Device"
	Identifier  "Card0"
	Driver      "nvidia"
	Option "ConnectedMonitor" "DFP-0,DFP-1,CRT-0"
	Option "CustomEDID" "DFP-0: /etc/EDID"
	Option	"NoLogo" "true"
	VendorName  "nVidia Corporation"
	BoardName   "GT218 [GeForce 310M]"
	BusID       "PCI:1:0:0"
EndSection

Section "Screen"
	Identifier "Screen0"
	Device     "Card0"
	Monitor    "Monitor0"
	DefaultDepth    24
	SubSection "Display"
		Depth     24
	EndSubSection
EndSection
</code>


/etc/acpi/nvidia_backlight_up.sh
<code>
#!/bin/sh

test -f /sys/class/backlight/nvidia_backlight/brightness || exit 0

VAL=`cat /sys/class/backlight/nvidia_backlight/actual_brightness`
MAX=`cat /sys/class/backlight/nvidia_backlight/max_brightness`
STEP=10

VAL=`expr $VAL + $STEP`

if [ $VAL -gt $MAX ]; then
	VAL=$MAX
fi

echo -n $VAL > /sys/class/backlight/nvidia_backlight/brightness
</code>


/etc/acpi/nvidia_backlight_down.sh 
<code>
#!/bin/sh

test -f /sys/class/backlight/nvidia_backlight/brightness || exit 0

VAL=`cat /sys/class/backlight/nvidia_backlight/actual_brightness`
MIN=0
STEP=10

VAL=`expr $VAL - $STEP`

if [ $VAL -lt $MIN ]; then
	VAL=$MIN
fi

echo -n $VAL > /sys/class/backlight/nvidia_backlight/brightness
</code>

/etc/acpi/events/sony-brightness-up
<code>
event=video/brightnessup BRTUP 00000086 00000000
action=/etc/acpi/nvidia_backlight_up.sh
</code>

/etc/acpi/events/sony-brightness-down
<code>
event=video/brightnessdown BRTDN 00000087 00000000
action=/etc/acpi/nvidia_backlight_down.sh
</code>

<code>
faf675e54e68daa15bc95d883166e4ce  amss.mbn
d7496085f1af3d1bfdf0fa60c3222766  apps.mbn
633bed88c29244683635c261849d0e88  UQCN.mbn
</code>
