.. Copyright (C) 2019 Wazuh, Inc.

.. _api-register-windows:

Windows hosts
=============

To register the Windows Agent, you need to start a Powershell as **Administrator**. The installation directory of the Wazuh agent in Windows host depends on the architecture of the host.

	- ``C:\Program Files (x86)\ossec-agent`` for ``x86_64`` hosts.
	- ``C:\Program Files\ossec-agent`` for ``x64`` hosts.

This guide suppose that the Wazuh agent is installed in a ``x86_64`` host, so the installation path will be: ``C:\Program Files (x86)\ossec-agent``.

1. Add the agent to the manager.

  1.1 If your Wazuh API is running over HTTPS and it is using a self-signed certificate, you need to execute this function in your Powershell:

    .. code-block:: powershell

      > function Ignore-SelfSignedCerts {
          add-type @"
              using System.Net;
              using System.Security.Cryptography.X509Certificates;
              public class PolicyCert : ICertificatePolicy {
                  public PolicyCert() {}
                  public bool CheckValidationResult(
                      ServicePoint sPoint, X509Certificate cert,
                      WebRequest wRequest, int certProb) {
                      return true;
                  }
              }
      "@
          [System.Net.ServicePointManager]::CertificatePolicy = new-object PolicyCert
          [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12;
      }

      > Ignore-SelfSignedCerts

  Use ``Invoke-WebRequest`` to execute the Wazuh API request to register the Wazuh agent.

  .. code-block:: console

    # $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f api_username, api_password)))
    # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method POST -Uri https://192.168.1.2:55000/agents -Body @{name=windows_agent} | ConvertFrom-Json

  This will return the ID of the Wazuh agent.

2. Extract the Wazuh agent key using the Wazuh API. In this case, we will assume that the Wazuh agent ID is ``001``:

  .. code-block:: console

    # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method GET -Uri https://192.168.1.2:55000/agents/001/key | ConvertFrom-Json

  .. code-block:: json
    :class: output

    {
      "error": 0,
      "data": {
          "id": "001",
          "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
      }
    }

3. Import the key using ``manage_agents``:

  .. code-block:: console

      # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i MDAxIG1hY29zLW1vamF2ZSBhbnkgZjcwMTI0MjQ5NDMwNzA3N2IyN2NlZjRmZDQ1NzlmYzkwYzcyMzcyZDMxMTM5ZTBkZjZiYzdmODMyODBjZjA4YQ

  .. code-block:: none
      :class: output

      Agent information:
         ID:001
         Name:windows-server
         IP Address:any

      Confirm adding it?(y/n): y
      Added.

4. Edit the Wazuh agent configuration to add the Wazuh server IP address.

  In the file ``C:\Program Files (x86)\ossec-agent\ossec.conf``, in the ``<client><server>`` section, change the *MANAGER_IP* value to the Wazuh server address:

  .. code-block:: xml

    <client>
      <server>
        <address>MANAGER_IP</address>
        ...
      </server>
    </client>

5. Start the agent.

	a) Using Powershell with administrator access:

		.. code-block:: console

			# Restart-Service -Name wazuh

	b) Using Windows cmd with administrator access:

		.. code-block:: console

			# net stop wazuh
			# net start wazuh
