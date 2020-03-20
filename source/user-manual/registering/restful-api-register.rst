.. Copyright (C) 2019 Wazuh, Inc.

.. _restful-api-register:

Registering agents using the Wazuh API
======================================

Wazuh API allows agent registration by running a single request from any host. This request returns agent's registration key, which must be manually added to the agent using ``manage_agents`` program.

.. note:: Root user privileges are necessary to execute all the commands described below.

Choose the tab corresponding to the agent host operating system:

.. tabs::

  .. group-tab:: Linux/Unix host

   1. Open a session in the agent host as a root user. To add the agent to the manager and extract the registration key execute the API request replacing the values in the brackets:

    .. code-block:: console

     # curl -u <API_username>:<API_password> -k -X POST -d '{"name":"<agent_name>","ip":"<agent_IP>"}' -H 'Content-Type:application/json' "https://<manager_IP>:55000/agents?pretty"

    The output of the API request returns the registration key:

    .. code-block:: none
            :class: output

            {
             "error": 0,
             "data": {
                 "id": "001",
                 "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
             }
            }

    More about API credentials and HTTPS support can be found on :ref:`Wazuh API configuration<api_configuration>`.

   2. Import the registration key to the agent using ``manage_agents`` program. Replave the agent's registration key:

    .. code-block:: console

     # /var/ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

    An example output of the command looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
               ID:001
               Name:agent_1
               IP Address:any

            Confirm adding it?(y/n): y
            Added.

   3. Edit the agent's ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   4. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst



  .. group-tab:: Windows host

   1. Open a Powershell session in the agent host as an Administrator and add the agent to the manager.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

    If the Wazuh API is running over HTTPS and it is using a self-signed certificate, the function below has to be executed in Powershell:

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

    Use ``Invoke-WebRequest`` to execute the Wazuh API request to register the Wazuh agent. Values in the angle brackets have to be replaced:

    .. code-block:: console

      # $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f <API_username>, <API_password>)))
      # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method POST -Uri https://<manager_IP>:55000/agents -Body @{name=<agent_name>} | ConvertFrom-Json

    The command above returns the agent's ``ID``.

   2. Extract the agent's key using the agent's ID. Values in the angle brackets have to be replaced:

    .. code-block:: console

     # Invoke-WebRequest -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -Method GET -Uri https://<manager_IP>:55000/agents/<agent_ID>/key | ConvertFrom-Json

    The output of the request returns the registration key:

    .. code-block:: none
            :class: output

            {
              "error": 0,
              "data": {
                  "id": "001",
                  "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
             }
            }

   3. Import the registration key to the agent using ``manage_agents`` program:

    .. code-block:: console

     # 'C:\Program Files (x86)\ossec-agent\manage_agents' -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

    An example output of the command looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
               ID:001
               Name:agent_1
               IP Address:any

            Confirm adding it?(y/n): y
            Added.

   4. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   5. Start the agent:

    .. include:: ../../_templates/registrations/windows/start_agent.rst



  .. group-tab:: MacOS X host

   1. Open a session in the agent host as a root user. To add the agent to the manager and extract the registration key execute the API request replacing the values in the brackets:

    .. code-block:: console

     # curl -u <API_username>:<API_password> -k -X POST -d '{"name":"<agent_name>","ip":"<agent_IP>"}' -H 'Content-Type:application/json' "https://<manager_IP>:55000/agents?pretty"

    The output of the API request returns the registration key:

    .. code-block:: none
            :class: output

            {
             "error": 0,
             "data": {
               "id": "001",
               "key": "MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM="
             }
            }

    More about API credentials and HTTPS support can be found on :ref:`Wazuh API configuration<api_configuration>`.

   2. Import the registration key to the agent using ``manage_agents`` program. Replave the agent's registration key:

    .. code-block:: console

     # /Library/Ossec/bin/manage_agents -i MDAxIE5ld0FnZW50IDEwLjAuMC44IDM0MGQ1NjNkODQyNjcxMWIyYzUzZTE1MGIzYjEyYWVlMTU1ODgxMzVhNDE3MWQ1Y2IzZDY4M2Y0YjA0ZWVjYzM=

    An example output of the command looks as follows:

    .. code-block:: none
            :class: output

            Agent information:
                ID:001
                Name:agent_1
                IP Address:any

            Confirm adding it?(y/n): y
            Added.

   3. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   4. Start the agent:

    .. include:: ../../_templates/registrations/macosx/start_agent.rst
