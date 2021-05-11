.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_wazuh_cloud_cli:

.. meta::
  :description: Learn about Wazuh Cloud tools

CLI
===

The Wazuh Cloud Command Line Interface (``wcloud-cli``) is a tool that enables you to interact with Wazuh Cloud using commands in your command-line shell.

Requirements
------------

In order to use ``wcloud-cli``, you will need to install the following components:

- Python 3.x
- ``boto3`` Python package
- ``request`` Python package
  
Installation
------------

Use the following command to download the tool:

.. code-block:: console

  # curl -so ~/wcloud-cli https://pending.cloud.wazuh.com/wcloud-cli && chmod 500  ~/wcloud-cli 


Run it with the version argument to confirm that the installation was successful.

.. code-block:: console

  # wcloud-cli version

.. code-block:: none
  :class: output

  Wazuh Cloud CLI - "version": "1.0.0"


Configuration
-------------

This section explains how to configure the settings that the Wazuh Cloud CLI (``wcloud-cli``) uses to interact with Wazuh Cloud.

By default, the Wazuh Cloud CLI reads the credential information from a local file named `credentials`, in a folder named `.wazuh-cloud` in your home directory. Where you find your home directory location varies based on the operating system, but is referred to using the environment variables `%UserProfile%` in Windows and `$HOME` or `~ (tilde)` in Unix-based systems. You can specify a non-default location for the config file by setting the WAZUH_CLOUD_CREDENTIALS_FILE environment variable to another local path.

1. Create the credentials file and add your :ref:`API key <cloud_apis_auth>`.

``~/.wazuh-cloud/credentials``

.. code-block:: none

  [default]
  wazuh_cloud_api_key_name = Test
  wazuh_cloud_api_key_secret = MDAwMDAwMDQ2T047Q4JVY1Sm5dDOqpDtkCQiY89fHjuZT3c90zs2

The file is organzied in profiles (a collection of credentials). When you specify a profile to run a command, the credentials are used to run that command. You can specify one default profile that is used when no profile is explicitly referenced. 

2. Use the following command to test your credentials. Optionaly, you can specify the profile.


.. code-block:: console

  # wcloud-cli test-credentials --profile <profile-name>

.. code-block:: none
  :class: output

  The API key 'Test' in the profile 'default' is valid.


Examples
--------

Get S3 token for Cold storage
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

  # wcloud-cli cold-storage get-aws-s3-token <cloud-id>

.. code-block:: none
  :class: output

  Pending

Listing Cold storage
^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

  # wcloud-cli cold-storage list <cloud-id> --start <YYYY-MM-DD> --end <YYYY-MM-DD>

.. code-block:: none
  :class: output

  Pending

Downloading Cold storage
^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: console

  # wcloud-cli cold-storage download <cloud-id> <output-path> --start <YYYY-MM-DD> --end <YYYY-MM-DD>

.. code-block:: none
  :class: output

  Pending
