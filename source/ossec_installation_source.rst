.. _ossec_installation_source:

Installation from sources
=========================

Source code download
--------------------

Download the source code and checksum files: ::

   $ wget https://bintray.com/artifact/download/ossec/ossec-hids/ossec-hids-2.8.3.tar.gz
   $ wget https://raw.githubusercontent.com/ossec/ossec-docs/master/docs/whatsnew/checksums/2.8.3/ossec-hids-2.8.3.tar.gz.sha256

Generate SHA256 checksum and compare with downloaded one: ::

   $ sha256sum ossec-hids-2.8.3.tar.gz
   $ cat ossec-hids-2.8.3.tar.gz.sha256

The expected hash checksum, in both cases, is: ::

   917989e23330d18b0d900e8722392cdbe4f17364a547508742c0fd005a1df7dd

.. note:: Both checksums need to match, meaning that data has not been corrupted through the download process. If that is not the case, please try it again through a reliable connection.

Build environment
-----------------

Now we need to prepare our build environment, so we can compile the downloaded OSSEC source code. 

On Debian based distributions install the ``build-essential`` package: ::

   $ apt-get install build-essential

On RPM based distributions install the ``Development tools`` package: ::

   $ yum groupinstall "Development Tools"

Or if you use the DNF package manager (Fedora 23), run this command: ::

   $ dnf groupinstall "Development tools"

.. note:: On OS X you are required to install Xcode command line tools, which include GCC compiler.

Compiling OSSEC
---------------

Extract the source code and run the installation script: ::

   $ tar xvfz ossec-hids-2.8.3.tar.gz
   $ bash ossec-hids-2.8.3/install.sh

Now the following script will pop up multiple questions, which may vary depending on your installation type:

Choose language: ::

   ** Para instalação em português, escolha [br].
   ** 要使用中文进行安装, 请选择 [cn].
   ** Fur eine deutsche Installation wohlen Sie [de].
   ** Για εγκατάσταση στα Ελληνικά, επιλέξτε [el].
   ** For installation in English, choose [en].
   ** Para instalar en Español , eliga [es].
   ** Pour une installation en français, choisissez [fr]
   ** A Magyar nyelvű telepítéshez válassza [hu].
   ** Per l'installazione in Italiano, scegli [it].
   ** 日本語でインストールします．選択して下さい．[jp].
   ** Voor installatie in het Nederlands, kies [nl].
   ** Aby instalować w języku Polskim, wybierz [pl].
   ** Для инструкций по установке на русском ,введите [ru].
   ** Za instalaciju na srpskom, izaberi [sr].
   ** Türkçe kurulum için seçin [tr].
   (en/br/cn/de/el/es/fr/hu/it/jp/nl/pl/ru/sr/tr) [en]: 

Choose installation type: ::

    1.-What kind of installation do you want (server, agent, local, hybrid or help)? 

Here you have a brief summary for all these options: ::

    - If you choose 'server', you will be able to analyze all  
      the logs, create e-mail notifications and responses,   
      and also receive logs from remote syslog machines and  
      from systems running the 'agents' (from where traffic  
      is sent encrypted to the server).
      
    - If you choose 'agent'(client), you will be able to read
      local files (from syslog, snort, apache, etc) and forward
      them (encrypted) to the server for analysis.             

    - If you choose 'local', you will be able to do everything  
      the server does, except receiving remote messages from  
      the agents or external syslog devices.

    - If you choose 'hybrid', you get the 'local' installation 
      plus the 'agent' installation. 

Choose the installation folder: ::

   2- Setting up the installation environment.

     - Choose where to install the OSSEC HIDS [/var/ossec]:

Enable or disable mail notifications: ::

   3- Configuring the OSSEC HIDS.

    3.1- Do you want e-mail notification? (y/n) [y]: 
       - What's your e-mail address? sammy@example.com
       - We found your SMTP server as: mail.example.com.
       - Do you want to use it? (y/n) [y]:

Enable or disable the file integrity monitoring daemon: ::
 
    3.2- Do you want to run the integrity check daemon? (y/n) [y]:

       - Running syscheck (integrity check daemon).

Enable or disable the rootkits and malware detection daemon: ::

    3.3- Do you want to run the rootkit detection engine? (y/n) [y]: 

       - Running rootcheck (rootkit detection).

Enable or disable the active response module: ::
    
    3.4- Active response allows you to execute a specific 
          command based on the events received. For example,
          you can block an IP address or disable access for
          a specific user.  
          More information at:
          http://www.ossec.net/en/manual.html#active-response
       
           - Do you want to enable active response? (y/n) [y]: 

            - Active response enabled.
   
            - By default, we can enable the host-deny and the 
              firewall-drop responses. The first one will add
              a host to the /etc/hosts.deny and the second one
              will block the host on iptables (if linux) or on
              ipfilter (if Solaris, FreeBSD or NetBSD).
            - They can be used to stop SSHD brute force scans, 
              portscans and some other forms of attacks. You can 
              also add them to block on snort events, for example.

          - Do you want to enable the firewall-drop response? (y/n) [y]: 

             - firewall-drop enabled (local) for levels >= 6

          - Default white list for the active response:
             - 192.168.209.2

          - Do you want to add more IPs to the white list? (y/n)? [n]:          

.. note:: If you select yes for Active response you are enabling some basic Intrusion Prevention capabilities. This is generally a good thing, but only recommended if you know what you are doing. 

Enable or disable remote syslog: ::

    3.5- Do you want to enable remote syslog (port 514 udp)? (y/n) [y]: 

After these questions are answered, the compilation process starts: ::

   5- Installing the system
      - Running the Makefile

Once completed, you will be presented with final instructions: ::

   - System is Debian (Ubuntu or derivative).
   - Init script modified to start OSSEC HIDS during boot.

   - Configuration finished properly.

   - To start OSSEC HIDS:
               /var/ossec/bin/ossec-control start

   - To stop OSSEC HIDS:
               /var/ossec/bin/ossec-control stop

   - The configuration can be viewed or modified at /var/ossec/etc/ossec.conf


   Thanks for using the OSSEC HIDS.
   If you have any question, suggestion or if you find any bug,
   contact us at contact@ossec.net or using our public maillist at
   ossec-list@ossec.net
   ( http://www.ossec.net/main/support/ ).

   More information can be found at http://www.ossec.net

   ---  Press ENTER to finish (maybe more information below). ---

