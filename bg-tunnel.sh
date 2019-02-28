#!/bin/bash
autossh -N -f -o "PubkeyAuthentication=yes" -o "PasswordAuthentication=no" -R 6666:localhost:22 root@vpn.marek-vigas.sk & #remote ssh
autossh -N -f -o "PubkeyAuthentication=yes" -o "PasswordAuthentication=no" -R 3000:localhost:3000 root@vpn.marek-vigas.sk & #tower api
autossh -N -f -o "PubkeyAuthentication=yes" -o "PasswordAuthentication=no" -R 443:localhost:443 root@vpn.marek-vigas.sk & #vpntun