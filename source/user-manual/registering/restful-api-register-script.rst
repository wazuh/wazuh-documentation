.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register-script:

Registering agents using scripts
================================

We have prepared a few different scripts to allow automatically register the Wazuh agent using the Wazuh API.

Register the agent automatically using a shell script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Below shell script allows registering the agent on a Linux/Unix host using Wazuh Api service. The script requires root access and shall be run on the agent.

1. Download the script:  `Register an agent using a shell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.sh>`_.

2. In the script replace ``API_IP`` value to your Wazuh API host IP address:

  .. code-block:: bash

    API_IP="10.0.0.1"

  You might need to amend the following lines according to your configuration:

  .. code-block:: bash

    API_PORT="55000"
    PROTOCOL="http"
    USER="foo"
    PASSWORD="bar"

  For more information about API credentials and HTTPS support please follow the :ref:`Wazuh API configuration<api_configuration>`.

3. Execute the script. If the agent's name is omitted the registration service will use the hostname as the agent's name.

   .. code-block:: console

     # ./api-register-agent.sh <AGENT_NAME>

   To see the full list of available parameters run the following command:

   .. code-block:: console

     # ./api-register-agent.sh -h

   The output of the script will display the agent's ID, Name, and IP Address:

   .. code-block:: console

     Agent information:
        ID:001
        Name:linux-agent1
        IP Address:10.0.0.8

   The script will automatically start the agent.

Register the agent automatically using a Python script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Below Python script allows registering the Wazuh agent on a Linux/Unix host using Wazuh API service. The script requires root access and shall be run on the agent host.
The script requires an installation of ``Python`` and ``pip package-management system``.

1. Download the script: `Register an agent using a Python script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.py>`_.

2. In the script under the ``Configuration`` section replace the ``base_url`` IP address with your Wazuh API host IP address:

  .. code-block:: python

    base_url = 'http://10.0.0.1:55000'

  You might also need to amend the following lines according to your configuration:

  .. code-block:: python

    base_url = 'http://10.0.0.1:55000'
    auth = HTTPBasicAuth('foo', 'bar')
    agent_name = "auto"
    verify = False  # Use with self-signed certificates.

  By default, the registration service will use the hostname as the agent's name. You can change this by replacing:

  .. code-block:: python

    agent_name = "auto"

  with:

  .. code-block:: python

    agent_name = "YOUR-AGENT-NAME"

  For more information about API credentials and HTTPS support please follow the :ref:`Wazuh API configuration<api_configuration>`.

3. Execute the script by running the following command:

   .. code-block:: console

     # ./api-register-agent.py

   The registration process requires ``requests`` package to be installed. If the following package is not found the script asks for the package installation:

   .. code-block:: console

     No module 'requests' found. Install: pip install requests

   After the script is successfully executed it returns the agent's name and ID:

   .. code-block:: console

     Adding agent.
     Agent 'linux-agent1' with ID '001' added.
     Importing authentication key.
     Restarting.

   The script will automatically start the agent.

Register the agent automatically using a PowerShell script:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Below PowerShell script allows registering the Wazuh agent on a Windows host using Wazuh API service. The script requires administrator access and shall be run on the agent's host.

1. Download the script: `Register an agent using a PowerShell script <https://raw.githubusercontent.com/wazuh/wazuh-api/3.9/examples/api-register-agent.ps1>`_.

2. In the script under the ``Configuration`` section replace ``<Wazuh-Manager-IP>`` with your Wazuh manager IP address. You might also need to amend other lines according to your configuration:

   .. code-block:: PowerShell

     $base_url = "http://<Wazuh-Manager-IP>:55000"
     $username = "foo"
     $password = "bar"
     $agent_name = $env:computername
     $path = "C:\Program Files (x86)\ossec-agent\"
     $config = "C:\Program Files (x86)\ossec-agent\ossec.conf"
     $wazuh_manager = "<Wazuh-Manager-IP>"
     Ignore-SelfSignedCerts

   By default, the registration service will use the hostname as the agent's name. You can change this by replacing:

   .. code-block:: PowerShell

     $agent_name = $env:computername

   with:

   .. code-block:: PowerShell

     $agent_name = "YOUR-AGENT-NAME"


   For more information about API credentials and HTTPS support please follow the :ref:`Wazuh API configuration<api_configuration>`.

3. Execute the script as an Administrator with the following command:

   .. code-block:: console

     # ./api-register-agent.ps1

   The output of the script will display the agent's ID, Name, and IP Address:

   .. code-block:: console

     Agent information:
        ID:001
        Name:windows-agent1
        IP Address:10.0.0.8

   The script will automatically start the agent.
   
