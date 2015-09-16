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

Extract the code to your server::

   tar xvfz ossec-hids-2.8.2.tar.gz

Execute the installation script::

   bash ossec-hids-2.8.2/install.sh

The installation make you several questions

-Ask for the lenguage::

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

-Ask for the lenguage::

    1.-What kind of installation do you want (server, agent, local, hybrid or help)? 

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



RedHat Centos & Fedora
----------------------
