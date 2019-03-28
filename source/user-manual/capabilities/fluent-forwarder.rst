.. Copyright (C) 2018 Wazuh, Inc.

.. _fluent-forwarder:

Fluentd Forwarder
=================

.. versionadded:: 4.0.0

This module allows Wazuh to forward messages to a Fluentd server.

- `How it works`_
- `Input`_
- `Output`_
- `Example for testing`_

How it works
------------

This module allows the forwarding of the received messages from a dedicated UDP socket to a Fluentd server.
The Fluentd server could be located on the same local machine or a remote machine.

.. note::
    This module works only on Unix systems.

Input
-----

The ``socket_path`` tag indicates the location of the Unix UDP socket to be created by the module. From this socket, the module will read the incomming messages and forward them
to the Fluentd server.

The ``tag`` tag will be added to every message readed from the UDP socket. This allows the user to specify the flow to the Fluentd server internal routing.

.. note::
    An empty **tag** is not allowed, the module will shutdown if it is not present or empty.

Output
------

The output will be forwarded to the Fluentd server so the are no messages visible on the ``ossec.log`` to the user.


Example for testing
-------------------

This example is for testing purposes on a Debian machine, with a Wazuh manager.

Given the following configuration:

.. code-block:: xml

    <fluent-forward>
      <enabled>yes</enabled>
      <socket_path>/var/run/fluent.sock</socket_path>
      <address>localhost</address>
      <port>24224</port>
    </fluent-forward>


On a terminal, run the following commands as root to start a Fluentd server:

.. code-block:: console

    apt-get install -y ruby ruby-dev
    gem install fluentd
    fluentd -s conf
    fluentd -c conf/fluent.conf

Restart the Wazuh manager:

.. code-block:: console

    systemctl restart wazuh-manager


Send a test message to the UDP socket:

.. code-block:: console

    echo '{"json":"message"}' | nc -Uu /var/run/fluent.sock


You should see the message on the Fluentd server:

.. code-block:: console

    2019-03-28 14:47:40.000000000 +0100 debug.test: "{\"json\":\"message\"}\n"














