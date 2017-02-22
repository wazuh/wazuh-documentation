.. _singlehost_installation:

Single-host architecture installation
==============================================

Usally, Wazuh is installed using a distributed architecture but you can optionally install the Wazuh Manager and Elastic Stack on the same server:

.. thumbnail:: ../../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh Manager - Single-host
    :align: center
    :width: 100%

To do this, follow the guide :ref:`Installation via packages <installation_guide>`, taking note of the special instructions about single-server deployments.  This will result in completely bypassing Filebeat, and instead just having Logstash locally read the *alerts.json* or *archives.json* file.
