.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_tools:

.. meta::
  :description: Learn about cold storage

Tools
=====

The `wcloud-cold-storage.py` tool allows you to download the cold storage of your environment, creating and refreshing automatically the token to access the cold storage.

1. Download the tool: `wcloud-cold-storage.py <https://wazuh-cloud-tools.s3-us-west-1.amazonaws.com/examples/wcloud-cold-storage.py>`_.

2. Specify your Cloud ID and region:

.. code-block::

   $ wcloud-cold-storage.py --cloud-id <cloud_id> --api-key <file_path> --output_path /home/cloud/data --region <region> --start_date 2021-01-01 --end_date 2020-04-27


