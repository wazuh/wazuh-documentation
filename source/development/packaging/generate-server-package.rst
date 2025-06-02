.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides an automated way of building DEB and RPM Wazuh server packages using Docker. Follow the steps below to create a Debian or RPM Wazuh server package:

Wazuh server
============

Wazuh provides an automated way of building DEB and RPM Wazuh server packages using Docker. Follow the steps below to create a Debian or RPM Wazuh server package:

Requirements
^^^^^^^^^^^^

Ensure that these dependencies are installed on the system:

-  :doc:`Docker </deployment-options/docker/docker-installation>`
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__

Creating the Wazuh server package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to create the Wazuh server package:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``packages/`` directory. Select a version, for example, ``v|WAZUH_CURRENT|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && git checkout v|WAZUH_CURRENT| && cd wazuh/packages

#. Run the below command to build a DEB or an RPM Wazuh server package:

   .. note::

      Use the following architecture equivalences:

      -  amd64 -> x86_64
      -  arm64 -> aarch64
      -  armhf -> armv7hl

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # ./generate_package.sh -s /tmp -t manager -a amd64 -r my_rev --system deb

         This command generates a Wazuh manager ``v|WAZUH_CURRENT|`` DEB package with revision ``my_rev`` for x86_64 systems.

      .. group-tab:: RPM

         .. code-block:: console

            # ./generate_package.sh -s /tmp -t manager -a amd64 -r my_rev --system rpm

         This command generates a Wazuh manager ``v|WAZUH_CURRENT|`` RPM package with revision ``my_rev`` for x86_64 systems.

You can run the ``generate_package.sh`` script with the ``-h`` flag to explore your desired options:

.. code-block:: console

   $ ./generate_package.sh -h
