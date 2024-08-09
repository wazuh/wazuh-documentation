.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Log data is sent to the Wazuh agent socket by default, but it's also possible to specify other sockets. Learn how to configure multiple sockets in this section of the documentation.

Using multiple socket outputs
=============================

.. note:: You can use sockets only on Linux/Unix and macOS endpoints.

Log data is sent to the Wazuh agent socket by default, but it's also possible to specify other sockets as output. The logcollector module uses UNIX-type sockets to communicate, thereby allowing TCP or UDP protocols. One scenario where this may be useful is inter-process communication where you may need to redirect the logs to a different socket for another process to read.

You can use the ``<socket>`` tag to add new output sockets and then configure the Wazuh agent to output logs to that socket. Perform the following steps on the monitored endpoint to create a new output socket and forward logs from ``file.log`` to it:

.. note:: You need to create the new socket on your endpoint before adding it to your Wazuh configuration file. You can create the socket with your custom application or with netcat. For example, the command ``nc -lkU /var/run/custom.sock`` creates a new socket ``/var/run/custom.sock`` which you can forward logs to.

#. Add the following configuration in between the ``<ossec_config>`` tags of the Wazuh agent ``/var/ossec/etc/ossec.conf`` file to add a new socket named ``custom_socket``:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <socket>
        <name>custom_socket</name>
        <location>/var/run/custom.sock</location>
        <mode>tcp</mode>
        <prefix>custom_syslog: </prefix>
      </socket>

   Where:

   - ``<name>`` is the name of the socket. This is a required field.
   - ``<location>`` is the path of the socket. This is a required field.
   - ``<mode>`` is the socket communication protocol set to UDP by default. The allowed values are either ``tcp`` or ``udp``. This field is not mandatory.
   - ``<prefix>`` is a string placed before the message. This field is not mandatory.
   
   Refer to the :doc:`socket documentation </user-manual/reference/ossec-conf/socket>` for more information about defining a socket.

#. Add the following to the agent configuration file to forward logs from ``file.log`` to ``custom_socket``:

   .. code-block:: xml
   
      <localfile>
        <log_format>syslog</log_format>
        <location>/<FILE_PATH>/file.log</location>
        <target>agent,custom_socket</target>
      </localfile>
   
   .. warning:: To keep the output to the default socket, we need to specify it using 'agent' as the target. Otherwise, the output will be redirected only to the specified targets.

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - macOS: ````