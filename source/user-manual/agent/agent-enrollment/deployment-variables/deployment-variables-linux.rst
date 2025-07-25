.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the variables used by Wazuh agent packages on Linux endpoints and see examples of how to use them.

Deployment variables for Linux
==============================

Below is a table describing the variables used by Wazuh agent packages on Linux endpoints and a few examples of how to use them.

+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Option                           | Description                                                                                                                                                                                             |
+==================================+=========================================================================================================================================================================================================+
|   WAZUH_MANAGER                  |  This is the primary Wazuh manager that the Wazuh agent will connect to for ongoing communication and security data exchange. Specifies the Wazuh manager IP address or FQDN (Fully Qualified Domain    |
|                                  |  Name). If you want to specify multiple managers, you can add them separated by commas. See :ref:`address <server_address>`.                                                                            |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_MANAGER_PORT             |  Specifies the Wazuh manager connection port. See :ref:`port <server_port>`.                                                                                                                            |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_PROTOCOL                 |  Sets the communication protocol between the Wazuh manager and the Wazuh agent. Accepts UDP and TCP. The default is TCP. See :ref:`protocol <server_protocol>`.                                         |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_SERVER      |  Specifies the Wazuh enrollment server, used for the Wazuh agent enrollment. See :ref:`manager_address <enrollment_manager_address>`. If empty, the value set in ``WAZUH_MANAGER`` will be used.        |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PORT        |  Specifies the port used by the Wazuh enrollment server. See :ref:`port <enrollment_manager_port>`.                                                                                                     |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_PASSWORD    |  Sets password used to authenticate during enrollment, stored in ``etc/authd.pass``. See :ref:`authorization_pass_path <enrollment_authorization_pass_path>`.                                           |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_KEEP_ALIVE_INTERVAL      |  Sets the time between Wazuh agent checks for Wazuh manager connection. See :ref:`notify_time <notify_time>`.                                                                                           |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_TIME_RECONNECT           |  Sets the time interval for the Wazuh agent to reconnect with the Wazuh manager when connectivity is lost. See :ref:`time-reconnect  <time_reconnect>`.                                                 |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CA          |  Host SSL validation need of Certificate of Authority. This option specifies the CA path. See :ref:`server_ca_path <enrollment_server_ca_path>`.                                                        |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_CERTIFICATE |  The SSL agent verification needs a CA signed certificate and the respective key. This option specifies the certificate path. See :ref:`agent_certificate_path <enrollment_agent_certificate_path>`.    |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_REGISTRATION_KEY         |  Specifies the key path completing the required variables with WAZUH_REGISTRATION_CERTIFICATE for the SSL agent verification process. See :ref:`agent_key_path <enrollment_agent_key_path>`.            |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_NAME               |  Designates the Wazuh agent's name. By default, it will be the computer name. See :ref:`agent_name <enrollment_agent_name>`.                                                                            |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   WAZUH_AGENT_GROUP              |  Assigns the Wazuh agent to one or more existing groups (separated by commas). See :ref:`agent_groups <enrollment_agent_groups>`.                                                                       |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|   ENROLLMENT_DELAY               |  Assigns the time that agentd should wait after a successful enrollment. See :ref:`delay_after_enrollment <enrollment_delay_after_enrollment>`.                                                         |
+----------------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Examples:

-  Enrollment with password:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_NAME="apt-agent" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_NAME="yum-agent" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_NAME="dnf-agent" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_NAME="zypper-agent" zypper install wazuh-agent

-  Enrollment with password and assigning a group:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_GROUP="my-group" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_GROUP="my-group" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_GROUP="my-group" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
                 WAZUH_AGENT_GROUP="my-group" zypper install wazuh-agent

-  Enrollment with relative path to CA. It will be searched at your Wazuh installation folder:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="apt-agent" \
                 WAZUH_REGISTRATION_CA="rootCA.pem" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="yum-agent" \
                 WAZUH_REGISTRATION_CA="rootCA.pem" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="dnf-agent" \
                 WAZUH_REGISTRATION_CA="rootCA.pem" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="zypper-agent" \
                 WAZUH_REGISTRATION_CA="rootCA.pem" zypper install wazuh-agent

-  Enrollment with protocol:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="apt-agent" \
                 WAZUH_PROTOCOL="udp" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="yum-agent" \
                 WAZUH_PROTOCOL="udp" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="dnf-agent" \
                 WAZUH_PROTOCOL="udp" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_AGENT_NAME="zypper-agent" \
                 WAZUH_PROTOCOL="udp" zypper install wazuh-agent

-  Enrollment and adding multiple addresses:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2,10.0.0.3" WAZUH_REGISTRATION_SERVER="10.0.0.2" \
                 WAZUH_AGENT_NAME="apt-agent" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2,10.0.0.3" WAZUH_REGISTRATION_SERVER="10.0.0.2" \
                 WAZUH_AGENT_NAME="yum-agent" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2,10.0.0.3" WAZUH_REGISTRATION_SERVER="10.0.0.2" \
                 WAZUH_AGENT_NAME="dnf-agent" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2,10.0.0.3" WAZUH_REGISTRATION_SERVER="10.0.0.2" \
                 WAZUH_AGENT_NAME="zypper-agent" zypper install wazuh-agent

-  Absolute paths to CA, certificate, or key that contain spaces can be written as shown below:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="/var/ossec/etc/sslagent.key" \
                 WAZUH_REGISTRATION_CERTIFICATE="/var/ossec/etc/sslagent.cert" apt-get install wazuh-agent

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="/var/ossec/etc/sslagent.key" \
                 WAZUH_REGISTRATION_CERTIFICATE="/var/ossec/etc/sslagent.cert" yum install wazuh-agent

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="/var/ossec/etc/sslagent.key" \
                 WAZUH_REGISTRATION_CERTIFICATE="/var/ossec/etc/sslagent.cert" dnf install wazuh-agent

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" WAZUH_REGISTRATION_KEY="/var/ossec/etc/sslagent.key" \
                 WAZUH_REGISTRATION_CERTIFICATE="/var/ossec/etc/sslagent.cert" zypper install wazuh-agent

.. note::

   It’s necessary to use both KEY and PEM options to verify Wazuh agents' identities with the enrollment server. See the :doc:`additional security options <../security-options/index>` section.
