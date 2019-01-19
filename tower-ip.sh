#!/bin/bash
sudo nmap -sn 192.168.3.0/24 | grep "34:64:A9:13:1E:BE" -B 2 | tac | tail -n 1 | cut -c22-