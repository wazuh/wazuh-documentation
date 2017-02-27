.. _manual_agentless:


Agentless monitoring
======================

Agentless monitoring allows you to monitorize devices or systems without having an agent installed, through ssh. Systems as: routers, firewalls, switches and linux/bsd systems

Agentless monitoring lets users who have restrictions on software being installed on systems meet security and compliance needs.

It can alert once checksum changes or doing diffs, and showing what exactly changed.

Agentless monitoring is configured in :ref:`ossec.conf <reference_ossec_conf>`, in the section :ref:`Agentless <reference_ossec_agentless>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        agentless-examples
        agentless-faq


How it works
------------

1. Connection
^^^^^^^^^^^^^

First of all, you need to enable agentless monitoring:

.. code-block:: console

  /var/ossec/bin/ossec-control enable agentless

In order to connect our server with the host using SSH authentication, we should use the script: ``register_host.sh``, located in: ``/var/ossec/agentless/``
This script has two options: ``list``  and ``add``.

Using the ``list`` option, we will get all the available host already added.

.. code-block:: console

  /var/ossec/agentless/register_host.sh list

The option ``add`` is used to connect the host to the server. If instead of a password, you want to use a public key authentication, you have to use: ``NOPASS`` as
the password when you are adding the new host. For Cisco devices such as routers or firewalls for example, you should add the parameter: ``enablepass`` to enable the password.

.. code-block:: console

  /var/ossec/agentless/register_host.sh add root@example_adress.com example_password [enablepass]

If you want to use a public key authentication you can use the below command:

.. code-block:: console

  sudo -u ossec ssh-keygen

Once it is created, you have to copy the public key in the remote host.

2. Monitoring
^^^^^^^^^^^^^

After add our hosts in the system, we need to configure the server to monitor them. There are more configuration details, about how configure ``ossec.conf``, in the :ref:`agentless <reference_ossec_agentless>` section.

There are 4  different agentless types.

Integrity check BSD
~~~~~~~~~~~~~~~~~~~
For BSD systems, it's possible to set a list of directories in the configuration section. Wazuh will do the integrity check inside the remote box. You need to configure the ``type`` option to ``ssh_integrity_check_bsd``

::

  <agentless>
    <type>ssh_integrity_check_bsd</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /var/</arguments>
  </agentless>

Integrity check Linux
~~~~~~~~~~~~~~~~~~~~~
For linux systems, it's possible to set a list of directories in the configuration and Wazuh will do the integrity check inside the remote box. This option is for linux based systems. You need to configure the ``type`` option to ``ssh_integrity_check_linux``

::

  <agentless>
    <type>ssh_integrity_check_linux</type>
    <frequency>36000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /etc/ /sbin</arguments>
  </agentless>

Generic Diff
~~~~~~~~~~~~
You can configure a set of commands to run on the remote device. Wazuh will alert you if the output of those commands changed. You need to configure the ``type`` option to ``ssh_generic_diff``

::

  <agentless>
    <type>ssh_generic_diff</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic_diff</state>
    <arguments>ls -la /etc; cat /etc/passwd</arguments>
  </agentless>

.. note::

  To use ``su`` in a command as an argument, you have to set: ``use_su`` before the hostname. In the example before will be: host>use_su root@example_adress.com</host>


Pix config
~~~~~~~~~~
This option will alert if a Cisco PIX/router configuration changes. You need to configure the ``type`` option to ``ssh_pixconfig_diff``

::

  <agentless>
    <type>ssh_pixconfig_diff</type>
    <frequency>36000</frequency>
    <host>pix@pix.fw.local</host>
    <state>periodic_diff</state>
  </agentless>

3. Checking the setup
^^^^^^^^^^^^^^^^^^^^^

Finally we should ensure that we have installed in our server the ``expect`` library which is necessary.

After installing expect library we should restart Wazuh and
in the ``/var/ossec/logs/ossec.log`` we could see:

.. code-block:: xml

  ossec-agentlessd: INFO: Test passed for 'ssh_integrity_check_linux'.

And also, when Wazuh connect with the remote host, we could see:

.. code-block:: xml

  ossec-agentlessd: INFO: ssh_integrity_check_linux: root@example_adress.com: Starting.
  ossec-agentlessd: INFO: ssh_integrity_check_linux: root@example_adress.com: Finished.

4. Alert
^^^^^^^^
Once every is configured if something changes on the monitorized directories, commands or Cisco configurations, Wazuh will alert about those changes:

Integrity check BSD/Linux example alert::

	** Alert 1486811998.93230: - ossec,syscheck,pci_dss_11.5,
	2017 Feb 11 03:19:58 ubuntu->(ssh_integrity_check_linux) root@192.168.1.3->syscheck
	Rule: 550 (level 7) -> 'Integrity checksum changed.'
	Integrity checksum changed for: '/etc/.hidden'
	Size changed from '0' to '10'
	Old md5sum was: 'd41d8cd98f00b204e9800998ecf8427e'
	New md5sum is : 'cc7bd56aba1122d0d5f9c7ef7f96de23'
	Old sha1sum was: 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
	New sha1sum is : 'b570fbdf7d6ad1d1e95ef57b74877926e2cdf196'

	File: /etc/.hidden
	Old size: 0
	New size: 10
	New permissions:   1204
	New user: 0
	New group: 0
	Old MD5: d41d8cd98f00b204e9800998ecf8427e
	New MD5: cc7bd56aba1122d0d5f9c7ef7f96de23
	Old SHA1: da39a3ee5e6b4b0d3255bfef95601890afd80709
	New SHA1: b570fbdf7d6ad1d1e95ef57b74877926e2cdf196



Generic Diff example alert::

	** Alert 1486811190.88243: - ossec,syscheck,agentless,pci_dss_11.5,pci_dss_10.6.1,
	2017 Feb 11 03:06:30 ubuntu->(ssh_generic_diff) root@192.168.1.3->agentless
	Rule: 555 (level 7) -> 'Integrity checksum for agentless device changed.'
	ossec: agentless: Change detected:
	3c3
	< drwxr-xr-x. 77 root root    8192 Feb 27 10:44 .
	---
	> drwxr-xr-x. 77 root root    8192 Feb 27 10:47 .
	176a177
	> -rw-r--r--.  1 root root       0 Feb 27 10:47 test
