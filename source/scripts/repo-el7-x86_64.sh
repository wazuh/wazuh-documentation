#!/bin/bash

if egrep -q "(release 7|release 2014)" /etc/redhat-release ; then

        echo "[wazuh]" > /etc/yum.repos.d/wazuh.repo
        echo "name = WAZUH OSSEC Repository - www.wazuh.com" >> /etc/yum.repos.d/wazuh.repo
        echo "baseurl = http://ossec.wazuh.com/el7/x86_64/" >> /etc/yum.repos.d/wazuh.repo
        echo "gpgcheck = 1" >> /etc/yum.repos.d/wazuh.repo
        echo "gpgkey = http://ossec.wazuh.com/key/RPM-GPG-KEY-OSSEC" >> /etc/yum.repos.d/wazuh.repo
        echo "enabled = 1" >> /etc/yum.repos.d/wazuh.repo

fi
