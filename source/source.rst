Install OSSEC from Sources
==========================

Ubuntu & Debian
---------------

On Ubuntu and Debian you will need the **build-essential** package in order to compile and install OSSEC::

   apt-get install build-essential

now can continue with the installation in the section `Common installation for all distributions`_

RedHat Centos & Fedora
----------------------

On RedHat, Centos or Fedora you need the **Development Tools** package in order to compile and install OSSEC::

   yum groupinstall "Development Tools"

or in Fedora 23::

   dnf groupinstall "Development tools"

now can continue with the installation in the section `Common installation for all distributions`_

Common installation for all distributions
-----------------------------------------


Download the sources from ossec.net::  

   wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.2.tar.gz

To download the checksum file, type::

   wget -U ossec http://www.ossec.net/files/ossec-hids-2.8.2-checksum.txt

Now, let's examine the checksum file with the **cat** command, like so::

   cat ossec-hids-2.8.2-checksum.txt 

Expected output::

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

.. alert:: Both need to be the same or something it't grong

Extract the code to your server::

   tar xvfz ossec-hids-2.8.2.tar.gz

Execute the installation script::

   bash ossec-hids-2.8.2/install.sh

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

If you reply yes to this question the system make you other two questions::



RedHat Centos & Fedora
----------------------
