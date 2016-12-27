.. _wazuh_api_installation:

Installation
======================

In this guide, we will get the Wazuh RESTful API installed along with our OSSEC Manager.


Pre-requisites
------------------------

The API will be installed in the **same server that OSSEC Manager**. So, before you begin with this guide, you need:

 - A non-root user account with sudo privileges.
 - Wazuh HIDS Manager installed, :ref:`see installation <wazuh_installation>`.


Required packages
------------------------

Let's install the required packages in our OSSEC Manager server. In the following steps we will guide you to install them.

NodeJS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
NodeJS is a JavaScript platform for general-purpose programming that allows to build network applications with a great performance. It is shipped with several core modules out of the box, among them, we use *HTTP/HTTPS module* to create the API service.

Most of distributions contain a version of NodeJS in its default repositories but we prefer to use the repositories maintained by *NodeSource* because they have more recent versions. Follow the `official guide <https://nodejs.org/en/download/package-manager/>`_ to install it.

Usually, it is enough with the next commands:

Debian and Ubuntu based Linux distributions: ::

 $ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
 $ sudo apt-get install -y nodejs

Red Hat, CentOS and Fedora: ::

 $ curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
 $ yum -y install nodejs

Other packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You will need *pip* to install the API:

Debian and Ubuntu based Linux distributions: ::

  sudo apt-get install -y python-pip

Red Hat, CentOS and Fedora: ::

  sudo yum install -y python-pip


RESTful API
--------------------
Our server is ready to install the API. There are two ways to install it: manually or automatically.

Automatically
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This option is the most confortable and also it allows to configure the API easily: ::

  $ wget https://raw.githubusercontent.com/wazuh/wazuh-API/development/scripts/install_api.sh && bash ./install_api.sh

Manually
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Execute the next commands to download the API and copy it to */var/ossec/api*: ::

 $ cd ~
 $ wget https://github.com/wazuh/wazuh-API/archive/v1.2.1.tar.gz -O wazuh-API-1.2.1.tar.gz
 $ tar -xvf wazuh-API-*.tar.gz
 $ sudo mkdir -p /var/ossec/api && sudo cp -r wazuh-API-*/* /var/ossec/api

Now, we need to install the NodeJS modules required by the API and python dependencies: ::

 $ sudo -s
 $ cd /var/ossec/api
 $ npm install --only=production
 $ pip install xmljson

You now have the RESTFul API installed on your server. Check out how to configure it.
