.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this section, we show how to generate the Wazuh agent package for different environments using dedicated automation scripts.

Wazuh agent
===========

In this section, we show how to generate the Wazuh agent package for different environments using dedicated automation scripts. We show package generation for Linux, macOS, Windows, Solaris, and Wazuh signed packages (WPK). 

Follow the steps outlined in each sub-section to build the Wazuh agent package for your preferred environment.

Linux endpoint
--------------

Wazuh provides an automated way of building DEB and RPM Linux agent packages using Docker.

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue:

-  :doc:`Docker </deployment-options/docker/docker-installation>`
-  `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`__

Creating the Wazuh Linux agent package
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to create the Wazuh DEB and RPM  agent packages:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``packages/`` directory. Select the version, v|WAZUH_CURRENT|.


   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v|WAZUH_CURRENT|

#. Run the command below  to build a DEB or an RPM Wazuh agent package:

   .. note::

      Use the following architecture equivalences:

      -  ``amd64`` -> x86_64
      -  ``arm64`` -> aarch64
      -  ``armhf`` -> armv7hl

   .. tabs::

      .. group-tab:: DEB

         .. code-block:: console

            # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system deb

         This command generates a  Wazuh agent v|WAZUH_CURRENT| DEB package with ``/opt/ossec/`` as the installation directory for ``x86_64`` systems.

      .. group-tab:: RPM

         .. code-block:: console

            # ./generate_package.sh -t agent -a amd64 -p /opt/ossec --system rpm

         This command generates a  Wazuh agent v|WAZUH_CURRENT| RPM package with ``/opt/ossec/`` as the installation directory for ``x86_64`` systems.

You can run the ``generate_package.sh`` script with the ``-h`` flag to explore your desired options:

.. code-block:: console

   $ ./generate_package.sh -h

macOS endpoint
--------------

Wazuh provides an automated way of building the Wazuh agent package for macOS environments.

.. note::

   To build the Wazuh agent package for macOS, you must perform this operation in a macOS environment.

Requirements
^^^^^^^^^^^^

Ensure that you meet the following requirements to continue.

-  `Packages <http://s.sudre.free.fr/Software/Packages/about.html>`__
-  `Brew <https://brew.sh/>`__
-  **git**: Install with Homebrew using this command:  ``brew install git``.

If ``Packages`` and ``Brew`` are not already installed on your system, they will be installed when you run the ``generate_wazuh_packages.sh`` script below.

Follow the steps below to create a macOS package:

#. Clone the `wazuh <https://github.com/wazuh/wazuh>`__ repository from GitHub and navigate to the ``macos/`` directory. Select the version, ``v|WAZUH_CURRENT|``.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh && cd wazuh/packages && git checkout v|WAZUH_CURRENT| && cd macos

#. Install the build dependencies using the command:

   .. code-block:: console

      $ ./generate_wazuh_packages.sh -i

#. Build the macOS package. Find some examples below.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp

   This will build a version ``v|WAZUH_CURRENT|`` Wazuh agent macOS package and store it in ``/tmp``.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp -j 6

   This will also build a ``v|WAZUH_CURRENT|`` Wazuh agent macOS package and store it in ``/tmp`` but will use 6 jobs to compile the sources.

   .. code-block:: console

      # ./generate_wazuh_packages.sh -s /tmp -j 6 -c

   In addition to the previous settings, this will generate a ``.sha512`` file containing the checksum of the package.

You can run the ``generate_package.sh`` script with the ``-h`` flag to explore your desired options:

.. code-block:: console

   $ ./generate_package.sh -h

Apple notarization process
^^^^^^^^^^^^^^^^^^^^^^^^^^
