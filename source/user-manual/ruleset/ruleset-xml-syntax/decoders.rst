Decoders Syntax
===============

+-----------------+-----------------------------------------------------------------+
| Options         | Allowed values                                                  |
+=================+=================================================================+
| `decoder`_      | n/a                                                             |
+-----------------+-----------------------------------------------------------------+
| `parent`_       | Any decoder name                                                |
+-----------------+-----------------------------------------------------------------+
| `accumulate`_   | n/a                                                             |
+-----------------+-----------------------------------------------------------------+
| `program_name`_ | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+-----------------+-----------------------------------------------------------------+
| `prematch`_     | Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_ |
+-----------------+-----------------------------------------------------------------+
| `regex`_        | Any `regex expression <regex.html#os-regex-or-regex-syntax>`_   |
+-----------------+-----------------------------------------------------------------+
| `order`_        | location, srcuser, dstuser, user, srcip, dstip,                 |
|                 |                                                                 |
|                 | srcport, dstport, protocol, id, url, action, status, extra_data |
+-----------------+-----------------------------------------------------------------+
| `fts`_          | location, srcuser, dstuser, user, srcip, dstip,                 |
|                 |                                                                 |
|                 | srcport, dstport, protocol, id, url, action, status, extra_data |
+-----------------+-----------------------------------------------------------------+
| `ftscomment`_   | Any string                                                      |
+-----------------+-----------------------------------------------------------------+

``decoder``
-----------

The attributes list below defines a decoder.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a

.. topic:: Attributes

  id
    The ID of the decoder
  name
    The name of the decoder
  type
    The type of the decoder
  status
    The status of the decoder

``parent``
----------

It is used to link a subordinate codeblock to his parent.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any decoder name


``accumulate``
--------------

Allow OSSEC to track events over multiple log messages based on a decoded id.

.. note::

   Requires a regex populating the ``id`` field.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  n/a




``program_name``
----------------

It defines the name of the program with which the decoder is associated.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``prematch``
------------

It attempts to find a match within the log for the string defined.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any `sregex expression <regex.html#os-match-or-sregex-syntax>`_

``regex``
---------

.. topic:: Default value

  n/a

.. topic:: Allowed values

	Any `regex expression <regex.html#os-regex-or-regex-syntax>`_

``order``
---------

It defines what the parenthesis groups contain and the order in which they were received.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  srcuser
    Extracts the source username
  dstuser
    Extracts the destination (target) username
  user
    An alias to dstuser (only one of the two can be used)
  srcip
    Source ip
  dstip
    Destination ip
  srcport
    Source port
  dstport
    Destination port
  protocol
    Protocol
  id
    Event id
  url
    Url of the event
  action
    Event action (deny, drop, accept, etc)
  status
    Event status (success, failure, etc)
  extra_data
    Any extra data


``fts``
-------

It is used to designate a decoder as one in which the first time it matches the administrator would like to be alerted.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  location
    Where the log came from
  srcuser
    Extracts the source username
  dstuser
    Extracts the destination (target) username
  user
    An alias to dstuser (only one of the two can be used)
  srcip
    Source ip
  dstip
    Destination ip
  srcport
    Source port
  dstport
    Destination port
  protocol
    Protocol
  id
    Event id
  url
    Url of the event
  action
    Event action (deny, drop, accept, etc)
  status
    Event status (success, failure, etc)
  extra_data
    Any extra data

``ftscomment``
--------------

It adds a comment to a decoder when `<fts>` tag is used.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any string
