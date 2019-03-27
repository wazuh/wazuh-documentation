.. Copyright (C) 2019 Wazuh, Inc.

.. _cloud_getting_started:

Getting Started
===============

By following this guide, we will create a Wazuh monitoring structure allocated in the Wazuh Cloud.


How do I sign up?
-----------------

1. To sign up, go to Wazuh CLoud Service page:

    .. thumbnail:: ../images/wazuh-cloud/wazuh-cloud-1.png
        :title: Signing up form.
        :align: center
        :width: 100%

2. Fill every field with the required data.

3. From the list of options, select *Request a free trial*.

4. The user will receive an e-mail with a link. When clicking on that link, the registration process will be finished and the user will receive another e-mail that contains a file with all the necessary information to use the Cloud Service.

.. note::
    The verification e-mail can be stored in the *spam* folder.

Access Wazuh APP
----------------

When the Signup process is complete, the user will receive a PDF file with all the necessary data to access the cloud services.

In this PDF there is a DNS direction that grants access to the Wazuh APP, already connected and configured with the Cloud.

This file contains:

    * Access information.
    * Wazuh useful information.
    * WaaS description.
    * Agents deployment resumed guide.


    .. thumbnail:: ../images/wazuh-cloud/wazuh-cloud-2.png
        :title: PDF file data.
        :align: center
        :width: 100%

Register agent
--------------

What follows in this guide is to register the agents that will be allocated in our cloud.

This process is related in the `Registering agents <https://documentation.wazuh.com/current/user-manual/registering/index.html>`_ section of this documentation, but in the PDF file that the user will receive it comes a little guide to do it too.

The only difference with the actual guide, is that in this case we will set the ``<address>MANAGER_IP</address>`` as our manager server IP.

.. warning::
    Make sure the protocol is set as TCP. Wazuh Cloud does not support UDP.


Next steps
----------

After following all these steps, the user owns a Wazuh Cloud infrastructure totally operative, working and with the number of agents the user registered.
Now, it's time to add other Wazuh features to improve the level of monitoring the system does.
Some of these features are:

    * `Puppet <https://documentation.wazuh.com/current/deploying-with-puppet/index.html>`_
    * `Splunk <https://documentation.wazuh.com/current/installing-splunk/index.html>`_ 
    * `Docker <https://documentation.wazuh.com/current/docker-monitor/index.html>`_