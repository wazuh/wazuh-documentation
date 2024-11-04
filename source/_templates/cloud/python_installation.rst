.. Copyright (C) 2015 Wazuh, Inc.

The Wazuh module for |service| requires `Python 3 <https://www.python.org/downloads/>`__. Specifically, it's compatible with Python |py_cloud_cont_min|–|py_cloud_cont_max|. While later Python versions should work as well, we can't assure they are compatible. If you do not have Python 3 already installed, run the following command to install it on the endpoint where the Wazuh agent is installed.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3


.. End of include file
