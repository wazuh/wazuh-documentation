Install OSSEC from Sources
==========================

Download and integrity verification
-----------------------------------

Download the sources from ossec.net::

   wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.2.tar.gz

To download the checksum file, type::

   wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.2-checksum.txt

Now, let's examine the checksum file with the **cat** command, like so::

   cat ossec-hids-2.8.2-checksum.txt

   MD5(ossec-hids-2.8.2.tar.gz)= 3036d5babc96216135759338466e1f79
   SHA1(ossec-hids-2.8.2.tar.gz)= a0f403270f388fbc6a0a4fd46791b1371f5597ec

To generate the MD5sum of the tarball, type::

   md5sum ossec-hids-2.8.2.tar.gz

Expected output::

   3036d5babc96216135759338466e1f79  ossec-hids-2.8.2.tar.gz

Compare the generated MD5 checksum with the one in the checksum file. They should match.

Do the same for the SHA1 checksum by typing::

   sha1sum ossec-hids-2.8.2.tar.gz

Expected output::

   a0f403270f388fbc6a0a4fd46791b1371f5597ec  ossec-hids-2.8.2.tar.gz

.. warning:: Both cheksum need to be the same or something goes wrong

Ubuntu & Debian
---------------

On Ubuntu and Debian you will need the **build-essential** package in order to compile and install OSSEC::

   apt-get install build-essential

now can continue with the installation in the section `Common installation for all distributions`_

RedHat CentOS & Fedora
----------------------

On RedHat, CentOS or Fedora you need the **Development Tools** package in order to compile and install OSSEC::

   yum groupinstall "Development Tools"

or in Fedora 23::

   dnf groupinstall "Development tools"

now can continue with the installation in the section `Common installation for all distributions`_

Common installation for all distributions
-----------------------------------------

Extract the code to your server::

   tar xvfz ossec-hids-2.8.2.tar.gz

Execute the installation script::

   bash ossec-hids-2.8.2/install.sh

The next step is make the `Manager installation`_ or `Agent installation`_

Manager installation
^^^^^^^^^^^^^^^^^^^^

The installation make you several questions

-Ask for the installation lenguage::

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

-What kind of installation::

    1.-What kind of installation do you want (server, agent, local, hybrid or help)? 

-Here do you have a resume from every type::

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

-Installation folder::

   2- Setting up the installation environment.

     - Choose where to install the OSSEC HIDS [/var/ossec]:

-Mail notifications::

   3- Configuring the OSSEC HIDS.

    3.1- Do you want e-mail notification? (y/n) [y]: 
       - What's your e-mail address? sammy@example.com
       - We found your SMTP server as: mail.example.com.
       - Do you want to use it? (y/n) [y]:

-This is for file integrity checking, alerts you to changes to
files on your system::
 
    3.2- Do you want to run the integrity check daemon? (y/n) [y]:

       - Running syscheck (integrity check daemon).

-This checks for rootkits on a regular basis::

    3.3- Do you want to run the rootkit detection engine? (y/n) [y]: 

       - Running rootcheck (rootkit detection).

-The next is for enable the Active response::
    
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

.. note:: If you select yes for Active response you are adding Intrusion Prevention capability, this is a good thing but keep in mind it is a good idea to white list your own IP's as you don't want active response to trigger against your IP and auto block your access. This could happen if you failed multiple ssh logins, or if you were to run a vulnerability scan against your IP - as ossec would detect this as an attack. So your IP would get blocked, and then you would be unable to ssh to your server for example to manage it

-To activate the remote syslog::

    3.5- Do you want to enable remote syslog (port 514 udp)? (y/n) [y]: 

-After this questions start the compilation::

   5- Installing the system
      - Running the Makefile

-After compiling is complete you will be presented with final instructions::

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

Agent installation
^^^^^^^^^^^^^^^^^^

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
  which: no host in (/sbin:/bin:/usr/sbin:/usr/bin)


 OSSEC HIDS v2.8 Installation Script - http://www.ossec.net
 
 You are about to start the installation process of the OSSEC HIDS.
 You must have a C compiler pre-installed in your system.
 If you have any questions or comments, please send an e-mail
 to dcid@ossec.net (or daniel.cid@gmail.com).
 
  - System: Linux localhost.localdomain 3.10.0-229.11.1.el7.x86_64
  - User: root
  - Host: localhost.localdomain


  -- Press ENTER to continue or Ctrl-C to abort. --


1- What kind of installation do you want (server, agent, local, hybrid or help)? agent

  - Agent(client) installation chosen.

2- Setting up the installation environment.

 - Choose where to install the OSSEC HIDS [/var/ossec]: 

    - Installation will be made at  /var/ossec .

3- Configuring the OSSEC HIDS.

  3.1- What's the IP Address or hostname of the OSSEC HIDS server?: localhot 

   - Adding Hostname localhot

  3.2- Do you want to run the integrity check daemon? (y/n) [y]: 

   - Running syscheck (integrity check daemon).

  3.3- Do you want to run the rootkit detection engine? (y/n) [y]: 

   - Running rootcheck (rootkit detection).

  3.4 - Do you want to enable active response? (y/n) [y]: 


  3.5- Setting the configuration to analyze the following logs:
    -- /var/log/messages
    -- /var/log/secure
    -- /var/log/maillog

 - If you want to monitor any other file, just change 
   the ossec.conf and add a new localfile entry.
   Any questions about the configuration can be answered
   by visiting us online at http://www.ossec.net .
   
   
   --- Press ENTER to continue ---
                           
-After this questions start the compilation::

   5- Installing the system
      - Running the Makefile 
