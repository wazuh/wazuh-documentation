.. _ossec_virtual_machine:

OSSEC Virtual Appliance 2.8.2
=============================

1. This virtual appliance contains the following facilities:   

    - CentOS 6.6
    - OSSEC 2.8.2
    - OSSEC WebUI 0.8 Beta
    - Elasticsearch 1.6.0
    - Logstash 1.4.3
    - Kibana 4.0.2 
    - Kopf 1.5.3
    - XAMPP 1.8.1
2. The virtual appliance is provided as an OVA which you can import into
   most virtual systems.  We recommend using VirtualBox which can import
   the OVA image directly.  We used VirtualBox to create this appliance 
   and the OVA. 

.. note:: The VM can only be run on 64 bit systems.

3. To open the appliance, unzip the package with gunzip then open the 
   ossec-virtual-appliance.ova in VirtualBox.  

4. The password for all the accounts on this system including root, user, 
   OSSEC Web UI and phpMyAdmin is "_0ssec_". Note that the user name for 
   the OSSEC Web UI is just "user" and for phpMyAdmin is "root".

5. Firefox is installed on this VM which includes links to the following:

    - OSSEC Documentation 
    - OSSEC Web UI
    - OSSEC Events (Kibana console to Elasticsearch)
    - Kopf managment console
6. OSSEC, OSSEC WebUI, and the ELK (Elasticsearch-Logstash-Kibana) stack
   are all configured to work out of the box.  There are copies of OSSEC
   agent for Linux and Windows that you can push out to systems that you
   want to monitor.

7. Before installing an OSSEC agent, make sure you change the VM network
   interface from NAT - the factory default - to bridged so that you will 
   get an IP address from you network's DHCP server or set a static IP in 
   the VM by configuring the network files on the CentOS system as you 
   would any other Redhat derived Linux system.    

8. Although you don't have to change any ELK configuration settings, if
   you feel the need to explore, the Elasticsearch system is installed 
   in /usr/share/elasticsearch and the main configuration files are 
   /etc/elasticsearch/elasticsearch.yml and /etc/sysconfig/elasticsearch. 
   Similarly, Logstash is installed in /usr/share/logstash. 

9. XAMPP is installed in /opt/lampp. 

10. OSSEC WebUI is installed in /opt/lampp/htdocs/ossec-wui and Kibana is 
    installed in /opt/lampp/htdocs/kibana.

11. You can start and stop ossec, elasticsearch, logstash, and xampp with
    the 'service' command.
