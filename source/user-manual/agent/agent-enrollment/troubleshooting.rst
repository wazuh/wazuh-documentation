.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _troubleshooting:

Troubleshooting
===============

As a general rule, it is recommended that the logs on the manager and agent are checked for errors when an agent fails to enroll.

The location of the agent log file is dependent on the operating system:

- For Linux-based systems, the log file is located at ``/var/ossec/logs/ossec.log``
- For Windows endpoints, the location of the log file is dependent on its architecture:
     - For a 64-bit endpoint, it is located at ``C:\Program Files (x86)\ossec-agent\ossec.log``
     - For a 32-bit endpoint, it is located at ``C:\Program Files\ossec-agent\ossec.logs``
- For a macOS endpoint, the log file is located at ``/Library/Ossec/logs/ossec.log``


In the list below, you can access the different cases included in this troubleshooting section:

- :ref:`troubleshooting-testing-communication`
- :ref:`troubleshooting-authentication-error`
- :ref:`troubleshooting-invalid-agent-name`
- :ref:`troubleshooting-unable-to-read-ca-certificate-file`
- :ref:`troubleshooting-unable-to-read-private-key-file`
- :ref:`troubleshooting-unable-to-read-certificate-file`
- :ref:`troubleshooting-invalid-password`


.. _troubleshooting-testing-communication:


Testing communication with the Wazuh manager
--------------------------------------------

There are situations where the agents cannot be enrolled nor connection established to the manager because the necessary ports on the manager are not reachable.

The following default ports on the manager should be opened: 

- 1514/TCP for agent communication.
- 1515/TCP for enrollment via agent configuration.
- 55000/TCP for enrollment via manager API.
- Replace ``<MANAGER_IP>`` with your Wazuh Manager IP address or DNS name.
- On Linux and macOS systems (with netcat installed), open a terminal and run the following command:

    .. code-block:: console

        # nc -zv <MANAGER_IP> 1514 1515 55000

            
    If there is connectivity, the output should be a connection success message:

    .. code-block:: xml
      :class: output

        Connection to <MANAGER_IP> port 1514 [tcp] succeeded!
        Connection to <MANAGER_IP> port 1515 [tcp] succeeded!
        Connection to <MANAGER_IP> port 55000 [tcp] succeeded!

- On Windows, open a PowerShell terminal and run the following command:

    .. code-block:: console

        # (new-object Net.Sockets.TcpClient).Connect("<MANAGER_IP>", 1514)
        # (new-object Net.Sockets.TcpClient).Connect("<MANAGER_IP>", 1515)
        # (new-object Net.Sockets.TcpClient).Connect("<MANAGER_IP>", 55000)

    If there is connectivity, there is no output, otherwise, an error is shown:

    .. code-block:: xml
      :class: output

      A connection attempt failed because the connected party did not properly respond after a period of time (...)


.. _troubleshooting-authentication-error:


Authentication error
--------------------

**Location:** Manager log.

**Error log:**

.. code-block:: xml
    :class: output

    2022/02/03 10:07:32 wazuh-remoted: WARNING: (1404): Authentication error. Wrong key or corrupt payload. Message received from agent '001' at 'any'.


**Resolution:** 
Ensure that the client key on the agent matches the key in the manager client.keys file. The key file can be found at ``/var/ossec/etc/client.keys`` on both the manager and the agent.


.. _troubleshooting-invalid-agent-name:


Invalid agent name for enrollment
---------------------------------

**Location:** Agent log.

**Error log:**

.. code-block:: xml
    :class: output



**Resolution:** 
Ensure the agent hostname is unique and does not match an already enrolled agent. Alternatively, specify a unique agent name in the ``<client><enrollment><agent_name>`` section of the agent ossec.conf file.

.. code-block:: xml
    :emphasize-lines: 4

        <client>
            ...
            <enrollment>
                <agent_name>EXAMPLE_NAME</agent_name>
                ...
            </enrollment>
        </client>


.. _troubleshooting-unable-to-read-ca-certificate-file:


Unable to read CA certificate file
----------------------------------

**Location:** Manager log

**Error log:**

.. code-block:: xml
    :class: output

    2022/01/26 08:25:01 : ERROR: Unable to read CA certificate file "/var/ossec/etc/rootCA.pem"
    2022/01/26 08:25:01 : ERROR: SSL error. Exiting.

**Resolution:**  
Ensure the certificate authority file is in the location specified in the ``<ssl_agent_ca>`` section of the manager ossec.conf file.



**Location:** Agent log

**Error log:**

.. code-block:: xml
    :class: output

    2022/01/26 08:25:01 : ERROR: Unable to read CA certificate file "/var/ossec/etc/rootCA.pem"
    2022/01/26 08:25:01 : ERROR: SSL error. Exiting.

**Location:** Agent log

**Resolution:** 
Ensure the certificate authority file is in the location specified in the ``<server_ca_path>`` section of the agent ``ossec.conf`` file.


.. _troubleshooting-unable-to-read-private-key-file:


Unable to read private key file
-------------------------------

**Location:** Agent log

**Error log:**

.. code-block:: xml
    :class: output



**Resolution:** 
Ensure the agent private key file is in the location specified in the ``<agent_key_path>`` section of the agent ``ossec.conf`` file.


.. _troubleshooting-unable-to-read-certificate-file:


Unable to read certificate file
-------------------------------


**Location:** Agent log


**Error log:**

.. code-block:: xml
    :class: output



**Resolution:**  
Ensure the agent certificate file is in the location specified in the ``<agent_certificate_path>`` section of the agent ``ossec.conf`` file.


.. _troubleshooting-invalid-password:


Invalid password
----------------

**Location:** Agent log



**Error log:**

.. code-block:: xml
    :class: output



**Resolution:** 

#. Ensure the same password is used by the manager and the agent
#. Ensure the ``“authd.pass”`` password file is in the right location and has the right permission
#. If password authentication is not needed, it should be disabled in the ``<auth>`` section of the manager ``ossec.conf`` file.





    
