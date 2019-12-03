.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register-script:

Using sripts to register agents with API
========================================

We have prepared a few different scripts to allow automatically register an agent using the Wazuh API.


Register the agent automatically using a shell script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Below shell script allows to register Wazuh agent on a Linux/Unix host using Wazuh Api service. The script requires root access and shall be run on the agent.

1. Download the script:  `Register an agent using a shell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.sh>`_.

|

2. In the script change the ``API_IP`` value to your Wazuh API host IP address:

  .. code-block:: console

    API_IP="10.0.0.1"

  You might need to amend the following lines according to your configuration:

  .. code-block:: console

    API_PORT="55000"
    PROTOCOL="http"
    USER="foo"
    PASSWORD="bar"

  For more information about API credentials and HTTPS support please follow the :ref:`Wazuh API configuration<api_configuration>`.

|

3. Execute the script. If the agent's name is ommitted it will use the output of the hostname command:

  .. code-block:: console

    # ./api-register-agent.sh <AGENT_NAME>

  To see the full list of available parameters run the following command:

  .. code-block:: console

    # ./api-register-agent.sh -h

  The output of the script displays the agent's registration information: id, name, and IP address.

  The script will automatically start the agent.

Register the agent automatically using a Python script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Below Python script allows us to register Wazuh agent on a Linux/Unix host, as well as on a Windows host, using Wazuh API service. The script requires root/administrator access and shall be run on the agent.
The script requires Python and pip package-management system to be installed on the agent host machine.

1. Download the script: `Register an agent using a Python script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.py>`_.

|

2. In the script under the ``Configuration`` section change the ``base_url`` IP address value to your Wazuh API host IP address:

  .. code-block:: console

    base_url = 'http://10.0.0.1:55000'

  You might need to amend the following lines according to your configuration:

  .. code-block:: console

    base_url = 'http://10.0.0.1:55000'
    auth = HTTPBasicAuth('foo', 'bar')
    agent_name = "auto"
    verify = False  # Use with self-signed certificates.

  If the ``agent_name`` has a default ``auto`` value, script will use the output of the hostname command as the agent's name.

  For more information about API credentials and HTTPS support please follow the :ref:`Wazuh API configuration<api_configuration>`.

3. Execute the script.

   On a Linux/Unix host execute the following command:

   .. code-block:: console

     # ./api-register-agent.py

   The registration process requires ``requests`` package to be installed. If the following package is not found the script asks for the package installation:

   .. code-block:: console

     No module 'requests' found. Install: pip install requests

   After the script is successfully executed it returns the agent's name and ID:

   .. code-block:: console

     Adding agent.
     Agent 'agent-010' with ID '010' added.
     Importing authentication key.
     Restarting.

   The script will automatically start the agent.
|
Register the agent automatically using a PowerShell script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- `Register an agent using a PowerShell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.ps1>`_.
