.. Copyright (C) 2024 Wazuh, Inc.

The required modules can be installed with pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories:

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

It is recommended to use a pip version greater than or equal to 19.3 to ease the installation of the required dependencies.

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages


      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.

         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the module's script shebang with your virtual environment interpreter, for example, ``#!/path/to/your/virtual/environment/bin/python3``.


.. End of include file
