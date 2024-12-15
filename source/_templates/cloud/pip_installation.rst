.. Copyright (C) 2015 Wazuh, Inc.

You can install the required modules with Pip, the Python package manager. Most UNIX distributions have this tool available in their software repositories. Run the following command to install pip on your endpoint if you do not have it already installed.

.. tabs::

   .. group-tab:: Yum

      .. code-block:: console

         # yum update && yum install python3-pip

   .. group-tab:: APT

      .. code-block:: console

         # apt-get update && apt-get install python3-pip

We recommend using Pip 19.3 or later to simplify the installation of the dependencies. Run this command to check your pip version.

.. code-block:: console

   # pip3 --version

An example output is as follows.

.. code-block:: none
   :class: output

   pip 22.0.2 from /usr/lib/python3/dist-packages/pip (python 3.10)

If your pip version is less than 19.3, run the following command to upgrade the version.

.. tabs::

   .. group-tab:: Python 3.8–3.10

      .. code-block:: console

         # pip3 install --upgrade pip

   .. group-tab:: Python 3.11–3.12

      .. code-block:: console

         # pip3 install --upgrade pip --break-system-packages

      .. note::

         This command modifies the default externally managed Python environment. See the `PEP 668 <https://peps.python.org/pep-0668/>`__ description for more information.

         To prevent the modification, you can run ``pip3 install --upgrade pip`` within a virtual environment. You must update the shebang of the |module_script| Python script with the interpreter in your virtual environment. For example, ``#!/path/to/your/virtual/environment/bin/python3``.

.. End of include file
