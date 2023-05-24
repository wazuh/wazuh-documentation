.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh Cloud Command Line Interface lets you interact with Wazuh Cloud using commands in your command-line shell. Learn more about it in this section. 

.. _cloud_wazuh_cloud_cli:

CLI
===

The Wazuh Cloud Command Line Interface (``wcloud-cli``) is a tool that allows you to interact with Wazuh Cloud using commands in your command-line shell.

Requirements
------------

To use ``wcloud-cli``, you need to install the following components:

- Python 3.x
- ``boto3`` Python package
- ``requests`` Python package
  
Installation
------------

1. Use the following command to download the CLI tool.

  .. code-block:: console

    # curl -so ~/wcloud-cli https://packages.wazuh.com/resources/cloud/wcloud-cli && chmod 500  ~/wcloud-cli 

2. Run it with the version argument to confirm that the installation was successful.

  .. code-block:: console

    # ./wcloud-cli version

  .. code-block:: none
    :class: output

    Wazuh Cloud CLI - "version": "1.0.1"


Configuration
-------------

You can configure the settings that the Wazuh Cloud CLI (``wcloud-cli``) uses to interact with Wazuh Cloud.

By default, the Wazuh Cloud CLI reads the credential information from a local file named `credentials`, located in the `.wazuh-cloud` folder of your home directory. The location of your home directory varies based on the operating system, but you can find it using the environment variables `%UserProfile%` in Windows, and `$HOME` or `~ (tilde)` in Unix-based systems. 

A non-default location can be specified for the config file by setting the `WAZUH_CLOUD_CREDENTIALS_FILE` environment variable to another local path.

1. Create the credentials file and add your :ref:`API key <cloud_apis_auth>`.

  ``~/.wazuh-cloud/credentials``

  .. code-block:: none

    [default]
    wazuh_cloud_api_key_name = Test
    wazuh_cloud_api_key_secret = MDAwMDAwMDQ2T047Q4JVY1Sm5dDOqpDtkCQiY89fHjuZT3c90zs2

  The file is organized in profiles, a collection of credentials. When you specify a profile to run a command, the credentials are used to run that command. You can specify one default profile that is used when no profile is explicitly referenced. 

2. Use the following command to test your credentials. Optionally, you can specify the profile.

  .. code-block:: console

    # wcloud-cli test-credentials --profile <profile-name>

  .. code-block:: none
    :class: output

    The API key 'Test' in the profile 'default' is valid.


Examples
--------

Getting S3 token for archived data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This command generates an AWS token to access the archived data of the environment with Cloud ID `012345678ab`.

.. code-block:: console

  # wcloud-cli cold-storage get-aws-s3-token 012345678ab

.. code-block:: none
  :class: output

  The following AWS credentials will be valid until 2021-05-07 13:45:24:
  [wazuh_cloud_storage]
  aws_access_key_id = A...Q
  aws_secret_access_key = A...E
  aws_session_token = F...Q==

Listing archived data
^^^^^^^^^^^^^^^^^^^^^

This command lists the archived data files of the environment `012345678ab` between the specified dates.

.. code-block:: console

  # wcloud-cli cold-storage list 012345678ab --start 2021-05-07 --end 2021-05-07

.. code-block:: none
  :class: output

  Environment '012345678ab' files from 2021-05-07 to 2021-05-07:
  012345678ab/output/alerts/2021/05/07/012345678ab_output_alerts_20210507T1040_mXSoDTf5Pgyr8b8D.json.gz

Downloading archived data
^^^^^^^^^^^^^^^^^^^^^^^^^

This command downloads in the `/home/test` directory the archived data files of the environment `012345678ab` between the specified dates.

.. code-block:: console

  # wcloud-cli cold-storage download 012345678ab /home/test --start 2021-05-07 --end 2021-05-07

.. code-block:: none
  :class: output

  Environment '012345678ab' files from 2021-05-07 to 2021-05-07:
  Downloading object 012345678ab/output/alerts/2021/05/07/012345678ab_output_alerts_20210507T1040_mXSoDTf5Pgyr8b8D.json.gz
  Downloaded object 012345678ab/output/alerts/2021/05/07/012345678ab_output_alerts_20210507T1040_mXSoDTf5Pgyr8b8D.json.gz