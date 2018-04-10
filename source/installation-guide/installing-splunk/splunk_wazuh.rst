.. _splunk_wazuh:

Splunk App for Wazuh
====================

Splunk App for Splunk offers an option to visualize Wazuh Alerts and API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.
In case that your infraestructure had a few clustered indexers, install the Wazuh app on your Search Head. 


Installation
------------

1. Download the latests stable version from the Splunk App for Wazuh `repository <https://github.com/wazuh/wazuh-splunk/>`_.

2. Install our app SplunkAppForWazuh on your Indexer, or on each search head that you have. 

  - CLI mode:

    .. code-block:: console

      $SPLUNK_HOME/bin/splunk install app SplunkAppForWazuh.tgz

  - Web GUI:

    .. code-block:: console
    
      Apps -> Manage apps -> install app from file

3. This app creates a new index named **wazuh**.



