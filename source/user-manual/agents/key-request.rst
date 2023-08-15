.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about key request, the Wazuh feature that allows you to fetch keys stored in an external database.
  
.. _key-request:

Agent key request
=================

.. note:: The key request feature replaces the old :doc:`agent-key-polling <../reference/ossec-conf/wodle-agent-key-polling>` wodle.

The key request feature allows fetching the agent keys stored on an external database.

- `How it works`_
- `Input`_
- `Output`_
- `Example scripts`_

How it works
------------

The key request feature allows fetching agent keys from an external source, for example, a database. This provides a mechanism to auto-register agents when they are not registered on a manager instance but reporting to it.

Once the ``<key_request>`` tag is enabled in the Authd configuration, it allows retrieving the agent information from an external database, like MySQL or any database engine, for registering it to the ``client.keys`` file.

To do this, it is necessary to create a binary or script in any language that can be integrated into your database engine and thus request the agents' information. The ``key_request`` tag must be added to the Authd configuration block.

Below you can see the flow diagram:

.. thumbnail:: ../../images/manual/key-request/key-request-flow.png
  :title: Agent key request flow diagram
  :alt: Agent key request flow diagram
  :align: center
  :width: 100%

Input
-----

If the ``socket`` tag is not specified in the configuration block, the key request feature calls the executable with the following parameters, depending on the fetching type:

- Fetch agent information by ID
- Fetch agent information by IP

When polling by ID, the manager retrieves the agent key by querying its ID. The input parameters that the program receives are as the following:

::

  ./agent_key_request.py id 001

When fetching by IP address, the manager retrieves the agent key by querying his IP address. The input parameters that the program receives are as the following:

::

  ./agent_key_request.py ip 192.168.1.100

.. thumbnail:: ../../images/manual/key-request/executable-method.png
  :title: Executable method: one program call per request
  :alt: Executable method: one program call per request
  :align: center
  :width: 100%

.. note::
  Keep in mind that the above examples represent how Wazuh will call your program.

When the ``socket`` tag is specified the module will send the parameters through the specified socket and read the response. The performance improvement over executing the program, as it is explained above, is significant.

The format in which the program receives the data is ``option:value``, where option can be ``id`` or ``ip`` depending on the fetching type.

.. thumbnail:: ../../images/manual/key-request/method-with-socket.png
  :title: Method with socket: requests directly to the socket
  :alt: Method with socket: requests directly to the socket
  :align: center
  :width: 100%

An **empty input** must be allowed. The key request feature performs a socket health check on startup. If the connection is established successfully, it's immediately closed.

.. note::
  If the socket option is specified, and the socket is not available, the program that has to be turned on will be called in case it has been specified.

Output
------

The output of your script must be a JSON object in the standard output.

On success example:

.. code-block:: json
    :class: output

    {
        "error": 0,
        "data": {
            "id": "001",
            "name": "my_agent",
            "ip": "192.168.1.100",
            "key": "ac575526e8bbcddf6654e5aa0a39fa60a0020e5d34ed1370916368bdaf5f0c71"
        }
    }

**error**

    Error identificator number.

    +--------------------+----------------+
    | Allowed characters | Digits only    |
    +--------------------+----------------+
    | Allowed size       | 1 digit        |
    +--------------------+----------------+
    | Unique value       | Yes, must be 0 |
    +--------------------+----------------+

**data**

    Data in json format with the following fields.

    +--------------------+-------------------+
    | Allowed fields     | id, name, ip, key |
    +--------------------+-------------------+

**id**

    Agent identificator number.

    +--------------------+---------------+
    | Allowed characters | Digits only   |
    +--------------------+---------------+
    | Allowed size       | 3 to 8 digits |
    +--------------------+---------------+
    | Unique value       | Yes           |
    +--------------------+---------------+

**name**

    Agent name.

    +--------------------+--------------------------------------------------+
    | Allowed characters | Alphanumeric characters, ``-``, ``_`` and ``.``  |
    +--------------------+--------------------------------------------------+
    | Allowed size       | Up to 128 bytes                                  |
    +--------------------+--------------------------------------------------+
    | Unique value       | Yes                                              |
    +--------------------+--------------------------------------------------+

**address**

    Allowed source address range in CIDR format. If specified, the manager will only accept the agent if its source IP address matches this address.

    +--------------------+----------------------------+
    | Format             | CIDR. Netmask is optional. |
    +--------------------+----------------------------+
    | Unique value       | Yes                        |
    +--------------------+----------------------------+
    | Reserved values    | None                       |
    +--------------------+----------------------------+
    | Aliases            | ``any`` = ``0.0.0.0/0``    |
    +--------------------+----------------------------+

**key**

    String that will take part in the external message encryption.

    +--------------------+----------------------+
    | Allowed characters | Printable characters |
    +--------------------+----------------------+
    | Allowed size       | Up to 128 bytes      |
    +--------------------+----------------------+
    | Unique value       | No                   |
    +--------------------+----------------------+

On error example:

.. code-block:: json
    :class: output

    {
        "error": 1,
        "message": "Your error message"
    }

**error**

    Error identificator number.

    +--------------------+---------------+
    | Allowed characters | Digits only   |
    +--------------------+---------------+
    | Unique value       | Yes           |
    +--------------------+---------------+

**message**

    String that will show the message error.

    +--------------------+----------------------+
    | Allowed characters | Printable characters |
    +--------------------+----------------------+
    | Unique value       | No                   |
    +--------------------+----------------------+

Example scripts
---------------

Suppose you have a table named ``agent`` in your database with the following structure:

+--------------------+----------------------+
| Field              | Type                 |
+--------------------+----------------------+
| id                 | Varchar(8)           |
+--------------------+----------------------+
| name               | Varchar(128)         |
+--------------------+----------------------+
| ip                 | Varchar(19)          |
+--------------------+----------------------+
| agent_key          | Varchar(128)         |
+--------------------+----------------------+

.. note::
  If your executable is a script that does not include shebang, you must include its interpreter in the `exec_path` parameter of the configuration.

The python script below shows an example of an agent key retrieval from the database (MySQL).

.. code-block:: python

  import sys
  import json
  import mysql.connector
  from mysql.connector import Error

  def main():

      if len(sys.argv) < 3:
          print json.dumps({"error": 1, "message": "Too few arguments"})
          return

      try:
          conn = mysql.connector.connect(host='localhost',
                                      database='your_database',
                                      user='user',
                                      password='secret')
      except Error as e:
          print json.dumps({"error": 2, "message": str(e)})
          return

      cursor = conn.cursor()
      data = sys.argv[2]

      if sys.argv[1] == "id":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE id = '{}'".format(data))
      elif sys.argv[1] == "ip":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE ip = '{}'".format(data))
      else:
          print json.dumps({"error": 3, "message": "Bad arguments given"})
          return

      row = cursor.fetchone()

      if row:
          print json.dumps({"error": 0, "data": {"id" : row[0], "name": row[1], "ip": row[2], "key": row[3]}},sort_keys=False)
      else:
          print json.dumps({"error": 4, "message": "No agent key found"},sort_keys=False)


  if __name__ == '__main__':
      main()

The php script below shows an example of an agent key retrieval from the database (MySQL).

.. code-block:: php

  <?php
      $servername = "localhost";
      $username = "user";
      $password = "secret";
      $dbname = "your_database";

      if($argc < 3){
          echo json_encode(array('error' => 1, 'message' => 'To few arguments'));
          exit;
      }

      $conn = new mysqli($servername, $username, $password, $dbname);
      if ($conn->connect_error) {
          echo json_encode(array('error' => 2, 'message' => 'Could not connect to database'));
          exit;
      }

      $data = $argv[2];

      if($argv[1] == "id"){
          $sql = "SELECT id,name,ip,`agent_key` FROM agent WHERE id = '$data'";
      } else if ($argv[1] == "ip") {
          $sql = "SELECT id,name,ip,`agent_key` FROM agent WHERE ip = '$data'";
      } else {
          echo json_encode(array('error' => 3, 'message' => 'Bad arguments given'));
          exit;
      }

      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          echo json_encode(array('error' => 0, 'data' => array( "id" => $row["id"], "ip" => $row["ip"],"key" => $row["agent_key"],"name" => $row["name"])));
      } else {
          echo json_encode(array('error' => 4, 'message' => 'No agent key found'));
      }
      $conn->close();
  ?>

The perl script below shows an example of an agent key retrieval from the database (MySQL).

.. code-block:: perl

  use strict;
  use warnings;
  use DBI;

  my $num_args = $#ARGV + 1;

  if ($num_args < 2) {
      print "{\"error\": 1, \"message\": \"Too few arguments\"}\n";
      exit;
  }

  my $data = $ARGV[1];
  my $dbh = DBI->connect("DBI:mysql:database=your_database;host=localhost",
                      "user", "secret",
                      {'RaiseError' => 1});

  my $sql = "";

  if ($ARGV[0] eq "id") {
      $sql = "SELECT * FROM agent WHERE id = '$data'";
  } elsif ($ARGV[0] eq "ip") {
      $sql = "SELECT * FROM agent WHERE ip = '$data'";
  }

  my $sth = $dbh->prepare($sql);
  $sth->execute();
  my $rows = $sth->rows;

  if ($rows) {
      my $row = $sth->fetchrow_hashref();
      print "{\"error\": 0, \"data\": {\"id\" : \"$row->{'id'}\", \"name\": \"$row->{'name'}\", \"ip\": \"$row->{'ip'}\", \"key\": \"$row->{'agent_key'}\"}}\n";
  } else{
      print "{\"error\": 4, \"message\": \"No agent key found\"}\n";
  }

  $sth->finish();
  $dbh->disconnect();

.. note::
  Remember using parameter binding to protect your script or binary against SQL injections.
