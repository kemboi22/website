---
title: "Having Issues with OBS Studio"
date: 2025-10-14T02:16:00+03:00
draft: false
type: "post"
description: "My journey debugging OBS Studio screen capture issues on Arch Linux with Hyprland"
tags: ["linux", "obs", "hyprland", "wayland"]
categories: ["linux"]
author: "Kemboi Elvis"
image: "https://community.linuxmint.com/img/screenshots/obs-studio.png"
---

# Having Issues with OBS Studio

From the start of this month, I have wanted to start streaming on Twitch and also to be able to record videos for programming and stuff.

So the first thing one needs to be able to start streaming is to have a broadcaster. And since I'm on Linux (I use Arch btw), I opted for OBS (Open Broadcaster Studio).

## Installation

To install OBS, the process is quite simple:

```bash
sudo pacman -S obs-studio
```

After installation, I opened OBS Studio where a setup wizard welcomed me and asked what I wanted to use OBS for. I selected that I would use OBS for streaming purposes and my main platform would be Twitch.

After finishing the setup, I thought, "Heh, that was quite easy. Now let me check if the audio is working." I saw that the audio was working well and good. Next was to check if the video capture works—that is where I was slapped with disappointment.

After selecting video source (which was screen capture using PipeWire), I saw the preview was black.

Just as a normal person would have done, I restarted my machine so that the services would restart and all the dependencies would reload. I could have done this manually, but due to my laziness, I opted to restart the machine.

After restart, I thought it would work. There is where I was surprised that I still had a black screen. This is where my journey of debugging started.

## Journey to Further Disappointment

After multiple attempts of adding and removing sources, I decided to dig deep.

### Computer Specs

So for my computer specs, I'm using:

```config
OS: Arch Linux
Desktop Environment: Hyprland
Display Server: Wayland
RAM: 16GB
CPU: AMD Ryzen 5 2600 @ 3.40 GHz
GPU: AMD Radeon R9 M360
GPU Driver: radeon
Kernel Version: 6.17.1-arch1-1
```

As you know, many apps are trying to catch up to support Wayland as they are still using X11, which is an old display server. So I thought maybe that was the main issue. I decided to explicitly instruct OBS that I'm using Wayland so that it can pick the correct configs.

```bash
export XDG_CURRENT_DESKTOP=Hyprland
export XDG_SESSION_TYPE=wayland
export XDG_SESSION_DESKTOP=Hyprland
QT_QPA_PLATFORM=wayland obs
```

Even after doing this, nothing worked (that was a little disappointing).

So first, I decided to run OBS without any flags and follow the logs.

![OBS](/images/obs-issues/obs.jpeg)

As you can see in the image above, when you open OBS directly, it automatically picks the desktop environment, session type, etc. So that means no need to pass them using flags.

I decided to dig deeper. After some few hours of research, I learned that it's the **XDG Desktop Portal** that manages file chooser, opening URLs, taking screenshots and screencasts.

[XDG Desktop Portal Wiki](https://wiki.archlinux.org/title/XDG_Desktop_Portal)

## Installing XDG Desktop Portal

So after seeing that, I installed XDG Desktop Portal with its companion `xdg-desktop-portal-hyprland`:

```bash
sudo pacman -S xdg-desktop-portal xdg-desktop-portal-hyprland
```

Next thing of business was enabling and starting the services:

```bash
systemctl --user enable xdg-desktop-portal
systemctl --user enable xdg-desktop-portal-hyprland
systemctl --user start xdg-desktop-portal
systemctl --user start xdg-desktop-portal-hyprland
```

Next order of business was to check if the services were running:

```bash
systemctl --user status xdg-desktop-portal-hyprland
```

After doing all this, I still got a black screen. I started getting very frustrated since this had taken significantly a lot of time with negative results.

I decided to go to the Hyprland wiki and check for the `xdg-desktop-portal-hyprland` documentation:

[XDG Desktop Portal Hyprland Wiki](https://wiki.hypr.land/Hypr-Ecosystem/xdg-desktop-portal-hyprland/)

As I read this, I realized, "Woah!! I did not have the configs." I quickly created `~/.config/xdg-desktop-portal/hyprland-portals.conf` and added:

```toml
[preferred]
default=hyprland;gtk
org.freedesktop.impl.portal.FileChooser=kde
```

I also created `~/.config/xdg-desktop-portal/portals.conf`:

```toml
[preferred]
default=hyprland;gtk
```

After adding this, I said to myself, "We are so done." I opened the terminal and opened OBS, then BOOM! I was slapped with a black screen in my face. At that time, I almost fainted and cried because what the hell is this, man?

I kept my composure and gave up.

## Back to Debugging

After a few hours, I decided to get back to it and look for a YouTube video. Finding YouTube videos that talk about Hyprland are very tricky to find, but then I found a video talking about setting up OBS in Wayland, and I said to myself, "This will just sort the issue since we are using the same session type."

I followed each thing he was doing exactly the same. Then BOOM!! On his machine, it works well. On my part (you guessed right), nothing works. Now this was making me so mad I was almost losing my freaking mind because of just an app that is 23MB.

## Digging Deeper and Deeper

I went to ChatGPT for more help, but it gave me some funny commands.

But there was this one command:

```bash
dbus-monitor "interface='org.freedesktop.portal.ScreenCast'"
```

So what this command does is that it listens to the D-Bus messages (Inter-Process Communication signals) from the **org.freedesktop.portal.ScreenCast** interface that is provided by the XDG Desktop Portal.

So I ran this command in the terminal, and this is what I got:

![DBUS-MONITOR](/images/obs-issues/dbus.jpeg)

I know what you are wondering: "What the hell is this?!" For me, I also did not know, so I decided to paste the whole output to ChatGPT to tell me what the hell was happening here.

ChatGPT told me everything was working fine:

- [x] XDG Portal
- [x] PipeWire
- [x] OBS getting PipeWire remote handle

Now this made me even more frustrated. Everything was working fine, but my screen was still black.

### Testing the Portal Manually

I also tested if the portal was working using:

```bash
gdbus call --session \
  --dest org.freedesktop.portal.Desktop \
  --object-path /org/freedesktop/portal/desktop \
  --method org.freedesktop.portal.ScreenCast.CreateSession
```

This confirmed the portal was responding correctly.

### Checking PipeWire

I checked if PipeWire was receiving the stream:

```bash
pw-dump | grep -A 20 "node.name.*obs"
```

This showed that PipeWire was negotiating formats, but the framerate was 0/1 (no frames being sent).

### Multiple Portal Conflicts

I asked ChatGPT, and it suggested that I try using `xdg-desktop-portal-wlr`, `xdg-desktop-portal-gtk`. I quickly tried them, this taking less time since this is what I had been doing for I don't know how many hours. After retrying all of them, still nothing.

I officially raised my hands up. I didn't know where the issue was.

After a few hours, I said, "Wait a minute, maybe the issue was because I was running various XDG portals—maybe that was the issue."

I ran:

```bash
ps aux | grep portal
```

Guess what? I found 4 running XDG portals:

- xdg-desktop-portal-wlr
- xdg-desktop-portal-gtk
- xdg-desktop-portal-hyprland
- xdg-desktop-portal

I said to myself positively, "Maybe this can be the issue."

I killed all the sessions of running XDG and started only the ones I needed: `xdg-desktop-portal` and `xdg-desktop-portal-hyprland`:

```bash
killall xdg-desktop-portal xdg-desktop-portal-wlr xdg-desktop-portal-gtk xdg-desktop-portal-hyprland
systemctl --user start xdg-desktop-portal-hyprland
systemctl --user start xdg-desktop-portal
```

I checked their status, and guess what? Green was the color.

```bash
systemctl --user status xdg-desktop-portal-hyprland
```

![XDG Hyprland](/images/obs-issues/xdg-hyprland.jpeg)

As you can see above, the service was running very well. But as you scroll down, wait a minute—are those logs which seem to be errors?

### Checking the Logs

I checked the logs:

```bash
journalctl --user -u xdg-desktop-portal-hyprland -f
```

I saw repeated messages:

```
[LOG] [pw] Building modifiers for dma
[LOG] [pw] Building modifiers for dma
[LOG] [pw] Building modifiers for dma
...
```

I pasted them to ChatGPT, and it said we maybe were having issues with the GPU.

AI told me that `xdg-desktop-portal-hyprland` was trying to use **DMA-BUF (Direct Memory Access Buffer)**.

So what does DMA-BUF do? This is a Linux kernel mechanism that allows different devices or processes to share the same memory buffer efficiently without copying data. This is used in GPUs, video decoders, compositors, and Wayland.

AI said maybe we could try to downgrade Mesa (all I can say for now: **NEVER try that**). I once tried it, and I ended up having a fresh installation of the OS because I had messed up so many files and I was too lazy to retrace back. All of this was caused by my sound not working.

So for that, I said a very big fat **NOOOOOO!**

### Trying to Disable DMA-BUF

I tried launching OBS with DMA-BUF disabled:

```bash
QT_QPA_PLATFORM=wayland PW_DISABLE_DMABUF=1 obs
```

This helped a bit—the format negotiated correctly, but still no frames were being sent. The portal itself was still trying to use DMA-BUF.

I extended my curiosity further and found out about **wf-recorder**, which unfortunately is another pain in the ass.

## WF-Recorder

What is wf-recorder? wf-recorder is a utility program for screen recording of wlroots-based compositors (more specifically, those that support wlr-screencopy-v1 and xdg-output). Its dependencies are ffmpeg, wayland-client, and wayland-protocols.

### Install

```bash
sudo pacman -S wf-recorder
```

### Testing

So I decided to test if this works:

```bash
wf-recorder -f test.mp4 -g "$(slurp)"
```

When I ran this command, my screen turned blur with white, which made me excited (as you all know, the white blur comes when you want to cut a selection of your screen so that you can either screenshot or screen record). My heart beat with happiness. After selecting the selection, I was hit with disappointment—I got an error below:

![WF Recorder](/images/obs-issues/wf-recorder.jpeg)

As is my tradition, I went to GitHub issues and checked if the issue had been raised and resolved. Unfortunately, no.

[WF Recorder pix_fmts error](https://github.com/ammen99/wf-recorder/issues/323)

Above is the issue. It's about ffmpeg versions compatibility—one is required to downgrade to version 7, and currently I'm on version 8. And to me, I cannot do such a thing because it's very dangerous. So I am patiently waiting for an update and will test it out.

## Solution

As of now, you are wondering what the heck I have decided to do.

To cut the long chit-chat short, I have decided to go with **wlrobs** (wlroots OBS plugin).

[wlrobs - OBS Forum](https://obsproject.com/forum/resources/wlrobs.774/)

## Install

```bash
yay -S wlrobs-hg
```

As of now, this one works, but I have not tested it deeply yet—but it works!

![OBS WLROBS](/images/obs-issues/obs-wlrobs.jpeg)

Below is how it looked with PipeWire:

![OBS Pipewire](/images/obs-issues/obs-pipewire.jpeg)

## Conclusion

So my conclusion is that my GPU is too old and not compatible with the latest drivers, hence the issues. The funny thing is I tried it on my laptop, and everything works flawlessly.

The core issue was:

1. My AMD Radeon R9 M360 (VERDE) GPU has issues with DMA-BUF on newer Mesa drivers
2. `xdg-desktop-portal-hyprland` kept trying to use DMA-BUF for screen capture
3. This caused the PipeWire stream to fail, resulting in a black screen
4. The solution was to use the wlroots capture method instead, which bypasses the problematic DMA-BUF path

Hopefully, I get a new GPU and test it out to see if it works well with the standard PipeWire capture method.

## Commands Summary

Here's a quick reference of useful commands I used during debugging:

```bash
# Check portal status
systemctl --user status xdg-desktop-portal-hyprland

# Monitor D-Bus screencast messages
dbus-monitor "interface='org.freedesktop.portal.ScreenCast'"

# Check PipeWire stream info
pw-dump | grep -A 20 "node.name.*obs"

# Test portal manually
gdbus call --session \
  --dest org.freedesktop.portal.Desktop \
  --object-path /org/freedesktop/portal/desktop \
  --method org.freedesktop.portal.ScreenCast.CreateSession

# Check portal logs
journalctl --user -u xdg-desktop-portal-hyprland -f

# Launch OBS with DMA-BUF disabled (didn't fully work for me)
QT_QPA_PLATFORM=wayland PW_DISABLE_DMABUF=1 obs

# Check running portals
ps aux | grep portal
```

If you're experiencing similar issues with an older AMD GPU on Wayland, I highly recommend trying the wlrobs plugin as a workaround!
