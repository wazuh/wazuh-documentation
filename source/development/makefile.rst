.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_makefile:

Makefile options
================

This section contains the different settings available for the ``Makefile`` when compiling Wazuh from the source code. Each setting is described and includes the default and allowed values that you can use.

Compiling the source code
-------------------------

When following the official documentation to install the Wazuh manager :ref:`from sources <sources_installation>` (or the :ref:`Wazuh agent <agent-sources>`), the user runs the ``install.sh`` script. This will automatically compile the source code before installing it, but some customizations can be made prior to the script execution.

To compile the code with ``make``, the user needs to change to the ``/src`` directory:

.. code-block:: console

  # cd wazuh/src
  # make deps
  # make <OPTIONS>

After compiling the source code, now you can execute the installation script:

.. code-block:: console

  # cd ../
  # ./install.sh

.. warning::
  Some dependencies have to be downloaded before compiling. If ``make deps`` is not executed before that, an error message will appear asking the user to do it.

Makefile reference
------------------

Available options
^^^^^^^^^^^^^^^^^

+-------------------+-------------------------------------------------------------------------------------------------------+
| **help**          | Version and license message.                                                                          |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **settings**      | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **deps**          | This help message.                                                                                    |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **external**      | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **build**         | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **utils**         | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **test**          | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **run_tests**     | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **build_tests**   | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **test_valgrind** | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+
| **test_coverage** | Debug mode. Use this parameter multiple times to increase the debug level.                            |
+-------------------+-------------------------------------------------------------------------------------------------------+

Available flags
^^^^^^^^^^^^^^^

+---------------+-----------------------------------------------------------------------------------------------------------+
| **TARGET**    | Defines the type of component that will be compiled.                                                      |
|               |                                                                                                           |
|               | The most common are ``server`` to compile a manager, and ``agent/winagent``                               |
|               | to compile agents.                                                                                        |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Default value    | n/a                                                                                    |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Allowed values   | server, local, hybrid, agent, winagent                                                 |
+---------------+------------------+----------------------------------------------------------------------------------------+
| **DEBUG**     | Time interval in which the number of alerts generated by a file accumulates.                              |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Default value    | 3600                                                                                   |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Allowed values   | Any number between 1 and 43200.                                                        |
+---------------+------------------+----------------------------------------------------------------------------------------+
| **DATABASE**  | Time interval in which the number of alerts generated by a file accumulates.                              |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Default value    | 3600                                                                                   |
|               +------------------+----------------------------------------------------------------------------------------+
|               | Allowed values   | Any number between 1 and 43200.                                                        |
+---------------+------------------+----------------------------------------------------------------------------------------+
