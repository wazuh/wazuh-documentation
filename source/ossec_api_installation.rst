.. _ossec_api_installation:

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

 $ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
 $ sudo apt-get install -y nodejs

Red Hat, CentOS and Fedora: ::

 $ curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
 $ yum -y install nodejs

Python
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The API needs **Python 2.6** or newer to perform some tasks.

Also, you need to install the python package *xmljson*: ::

 $ sudo pip install xmljson

In case you need the **pip** tool, you can install it following these steps:

Debian and Ubuntu based Linux distributions: ::

 $ sudo apt-get install python-pip

Red Hat, CentOS and Fedora: ::

 $ sudo yum install python-pip


RESTful API
--------------------

Our server is ready to install the API. Execute the next commands to download the API and copy it to */var/ossec/api*: ::

 $ cd ~
 $ wget https://github.com/wazuh/wazuh-API/archive/v1.2.tar.gz -O wazuh-API-1.2.tar.gz
 $ tar -xvf wazuh-API-*.tar.gz
 $ sudo mkdir -p /var/ossec/api && sudo cp -r wazuh-API-*/* /var/ossec/api

Now, we need to install the NodeJS modules required by the API: ::

 $ sudo -s
 $ cd /var/ossec/api
 $ npm install --only=production

You now have the RESTFul API installed on your server!. Next step is to configure it.
