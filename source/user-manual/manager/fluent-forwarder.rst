.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Fluentd forwarder module allows Wazuh to forward messages to a Fluentd server. Learn more about it in this section of our documentation.

.. _fluent-forwarder:

Fluentd forwarder
=================

This module allows Wazuh to forward messages to a Fluentd server. Fluentd it's an open source data collector logger that comes along
with great plugins to build your own logging layer. Check it out at https://www.fluentd.org/

- `How it works`_
- `Input`_
- `Output`_
- `Example using logcollector`_
- `Example using analysisd`_

How it works
------------

This module allows the forwarding of the received messages from a dedicated UDP socket to a Fluentd server.
The Fluentd server could be located on the same local machine or a remote machine.

.. thumbnail:: ../../images/fluent-forward/wazuh-fluentd.png
  :title: Wazuh fluent forwarder flow diagram
  :align: center
  :width: 100%

.. note::
    This module works only on Unix systems.

Input
-----

The ``socket_path`` tag indicates the location of the Unix domain UDP socket to be created by the module. From this socket, the module will read the incoming messages and forward them
to the Fluentd server.

The ``tag`` tag it's added to every message read from the UDP socket. This allows the user to specify the flow to the Fluentd server internal routing.

.. note::
    An empty **tag** is not allowed, the module will shutdown if it is not present or empty.

Output
------

The output will be forwarded to the Fluentd server specified by the ``<address>`` tag.


Example using logcollector
--------------------------

This example is for testing purposes on a Debian machine, with the Wazuh manager installed.

Given the following configuration:

.. code-block:: xml

    <fluent-forward>
      <enabled>yes</enabled>
      <tag>debug.test</tag>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
    </fluent-forward>

Set up the ``socket`` for logcollector:

.. code-block:: xml

    <socket>
      <name>fluent_socket</name>
      <location>/var/run/fluent.sock</location>
      <mode>udp</mode>
    </socket>

Set up a ``localfile`` to read from:

.. code-block:: xml

    <localfile>
      <log_format>syslog</log_format>
      <location>/path/to/your/log</location>
      <target>fluent_socket</target>
    </localfile>

On a terminal, run the following commands as root to start a Fluentd server:

.. code-block:: console

    apt-get install -y ruby ruby-dev
    gem install fluentd
    fluentd -s conf
    fluentd -c conf/fluent.conf

Restart the Wazuh manager:

.. code-block:: console

    systemctl restart wazuh-manager


Write a string to your log file:

.. code-block:: console

    echo "message" >> /path/to/your/log


You should see the message on the Fluentd server:

.. code-block:: none
    :class: output

    2019-03-28 14:47:40.000000000 +0200 debug.test: "message"


Example using analysisd
-----------------------

This example is for testing purposes on a Debian machine, with the Wazuh manager installed.

Given the following configuration:

.. code-block:: xml

    <fluent-forward>
      <enabled>yes</enabled>
      <tag>debug.test</tag>
      <socket_path>/var/ossec/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
    </fluent-forward>

.. note::
   The ``socket_path`` must be located within the ``/var/ossec/`` directory. You can use an absolute or a relative path. For example ``var/run/fluent.sock``.

Set up the ``socket`` for analysisd:

.. code-block:: xml

    <socket>
      <name>fluent_socket</name>
      <location>/var/ossec/var/run/fluent.sock</location>
      <mode>udp</mode>
    </socket>

.. note::
   The value of ``location`` must match the value of ``socket_path`` above.

Set up a target to read from:

.. code-block:: xml

    <global>
      <forward_to>fluent_socket</forward_to>
    </global>

.. note::
   In ``forward_to`` you must specify the value of ``name`` defined in ``<socket>`` above.

On a terminal, run the following commands as root to start a Fluentd server:

.. code-block:: console

    apt-get install -y ruby ruby-dev
    gem install fluentd
    fluentd -s conf
    fluentd -c conf/fluent.conf

Restart the Wazuh manager:

.. code-block:: console

    systemctl restart wazuh-manager


When an event triggers an alert, it's sent to fluentd in JSON format. On the Fluentd server, you can see a message similar to this:

.. code-block:: none
    :class: output

    2023-04-25 11:34:32.000000000 +0000 debug.test: {"message":"{\"timestamp\":\"2023-04-25T11:34:32.802+0000\",\"rule\":{\"level\":5,\"description\":\"File added to the system.\",\"id\":\"554\",\"firedtimes\":2,\"mail\":false,\"groups\":[\"ossec\",\"syscheck\",\"syscheck_entry_added\",\"syscheck_file\"],\"pci_dss\":[\"11.5\"],\"gpg13\":[\"4.11\"],\"gdpr\":[\"II_5.1.f\"],\"hipaa\":[\"164.312.c.1\",\"164.312.c.2\"],\"nist_800_53\":[\"SI.7\"],\"tsc\":[\"PI1.4\",\"PI1.5\",\"CC6.1\",\"CC6.8\",\"CC7.2\",\"CC7.3\"]},\"agent\":{\"id\":\"000\",\"name\":\"Manager AIX\"},\"manager\":{\"name\":\"Manager AIX\"},\"id\":\"1682422472.585306\",\"full_log\":\"File '/home/test/newFile.txt' added\\nMode: scheduled\\n\",\"syscheck\":{\"path\":\"/home/test/newFile.txt\",\"mode\":\"scheduled\",\"size_after\":\"0\",\"perm_after\":\"rw-r--r--\",\"uid_after\":\"0\",\"gid_after\":\"0\",\"md5_after\":\"d41d8cd98f00b204e9800998ecf8427e\",\"sha1_after\":\"da39a3ee5e6b4b0d3255bfef95601890afd80709\",\"sha256_after\":\"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\",\"uname_after\":\"root\",\"gname_after\":\"root\",\"mtime_after\":\"2023-04-25T11:34:32\",\"inode_after\":524395,\"event\":\"added\"},\"decoder\":{\"name\":\"syscheck_new_entry\"},\"location\":\"syscheck\"}"}

For more information about Fluentd configuration options, check the documentation at https://docs.fluentd.org/v1.0/articles/quickstart
