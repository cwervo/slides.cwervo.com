#! /bin/bash
for i in {2..15}
do
    ffmpeg -f lavfi -i color=c=white@0.0:s=1920x1080,format=rgba -i "$i.png" -shortest -filter_complex "[1:v]colorkey=white[ckout];[0:v][ckout]overlay[out]" -map "[out]" "_$i.png"
done