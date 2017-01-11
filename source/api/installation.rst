.. _api_installation:

Installation
======================

In this guide, we will get the Wazuh RESTful API installed along with our Wazuh Manager.


Pre-requisites
------------------------

The API will be installed in the **same server that Wazuh Manager**. So, before you begin with this guide, you need:

 - A non-root user account with sudo privileges.
 - Wazuh Manager installed, :ref:`see installation <installation>`.
 - Wazuh repositories added to your system.

 .. warning::
    Some of the following command require to be run with **root privileges**. You may become *root* by executing one of the following command at the begining of the session::

        $ su
        $ sudo -s

Installing API from packages
-------------------------------------

We provide the *wazuh-api* package to install the API. It requires NodeJS >= 4.6.1 in order to run the API. If you do not have installed NodeJS or your version is older than 4.6.1, we recommend to add the official repositories because they have more recent versions.

**Debian, Ubuntu, and other Debian-based systems**
::

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt-get install wazuh-api

**Red Hat, CentOS and other RPM-based systems**
::

    curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
    yum install wazuh-api


Installing API from sources
-------------------------------------

First, we will install the required packages and then the API from sources.

Required packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In our Wazuh Manager, we must install *NodeJS* and *pip*. Both packages are required to run the API. Most of distributions contain a version of NodeJS in its default repositories but we prefer to use the repositories maintained by *NodeSource* because they have more recent versions.


**Debian, Ubuntu, and other Debian-based systems**
::

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    apt-get install -y nodejs
    apt-get install -y python-pip

**Red Hat, CentOS and other RPM-based systems**
::

    curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
    yum -y install nodejs
    yum install -y python-pip


.. note::
	`Official guide to install NodeJS <https://nodejs.org/en/download/package-manager/>`_.


RESTful API
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Our server is ready to install the API::

    curl -s -o install_api.sh https://raw.githubusercontent.com/wazuh/wazuh-api/master/install_api.sh && bash ./install_api.sh

You now have the RESTFul API installed on your server. Check out how to configure it.
