.. Copyright (C) 2015, Wazuh, Inc.

.. code-block:: console

  # apt-get remove opendistroforelasticsearch-kibana

There are files marked as configuration and data files. Due to this designation, the package manager does not remove those files from the filesystem. A complete file removal can be done using the following command:

.. code-block:: console

  # apt-get remove --purge opendistroforelasticsearch-kibana

.. End of include file
