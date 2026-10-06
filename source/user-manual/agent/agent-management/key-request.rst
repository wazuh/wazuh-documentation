.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The key request feature fetches the agent keys stored on an external database. Learn more in this section of the documentation.

Agent key request
=================

The key request feature fetches the agent keys stored on an external database.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

How it works
------------

The key request feature allows agent keys to be retrieved from an external source such as a database. This provides a mechanism to auto-enroll agents who are not enrolled in a manager instance but report to it.

When the ``<key_request>`` tag is enabled in the ``authd`` configuration, it allows retrieving the Wazuh agent information from an external database, such as MySQL or any database engine, for enrolling it to the ``client.keys`` file.

To do this, it is necessary to create a binary or script in any language that can be integrated into your database engine and thus request the Wazuh agents' information. The ``key_request`` tag must be added to the authd configuration block.

Below is the flow diagram:

.. thumbnail:: /images/manual/key-request/key-request-flow.jpg
   :title: Agent key request flow diagram
   :alt: Agent key request flow diagram
   :align: center
   :width: 80%

Input
-----

If the ``socket`` tag is not specified in the configuration block, the key request feature calls the executable with the following parameters, depending on the fetching type:

-  Fetch agent information by ID
-  Fetch agent information by IP

When polling by ID, the Wazuh manager retrieves the agent key by querying its ID. The input parameters that the program receives are as follows:

.. code-block:: none

   ./agent_key_request.py id 001

When fetching by IP address, the Wazuh manager retrieves the agent key by querying its IP address. The input parameters that the program receives are as follows:

.. code-block:: none

   ./agent_key_request.py ip 192.168.1.100

.. thumbnail:: /images/manual/key-request/executable-method.png
   :title: Executable method
   :alt: Executable method
   :align: center
   :width: 80%

.. note::

   Keep in mind that the above examples represent how Wazuh will call the binary or script you created and integrated into your database.

When the ``socket`` tag is specified, the module will send the parameters through the specified socket and read the response. The performance improvement over executing the program, as it is explained above, is significant.

The format in which the program receives the data is ``option:value``, where option can be ``id`` or ``ip`` depending on the fetching type.

.. thumbnail:: /images/manual/key-request/method-with-socket.png
   :title: Method with socket
   :alt: Method with socket
   :align: center
   :width: 80%

An **empty input** must be allowed. The key request feature performs a socket health check on startup. If the connection is established successfully, it is immediately closed.

.. note::

   If the socket option is specified and the socket is unavailable, the program to be turned on will be called if it has been specified.

Output
------

The output of your script must be a JSON object, which is the standard output.

On success example:

.. code-block:: json

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

Error identification number.

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

Agent identification number.

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

Allowed source address range in CIDR format. If specified, the Wazuh manager will only accept the Wazuh agent if its source IP address matches this address.

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

Error identification number.

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
| id                 | Varchar (8)          |
+--------------------+----------------------+
| name               | Varchar (128)        |
+--------------------+----------------------+
| ip                 | Varchar (19)         |
+--------------------+----------------------+
| agent_key          | Varchar (128)        |
+--------------------+----------------------+

.. note::

   If your executable is a script that does not include a hashbang (#!) line specifying the interpreter, you must include its interpreter in the exec_path parameter of the configuration.

The Python script below shows an example of an agent key retrieval from the database (MySQL).

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

.. note::

   Remember to use parameter binding to protect your script or binary against SQL injections.
