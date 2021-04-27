.. Copyright (C) 2020 Wazuh, Inc.

.. _cloud_cold_storage_format:

.. meta::
  :description: Learn about cold storage

Filename format
===============

The files are stored in a directory structure that indicates on what date and at what time the file was delivered to the cold storage. 

The main path follows this format:

``wazuh-cloud-cold-<region>/<cloud_id>/<category>[/<subcategory>]/<year>/<month>/<day>``

And each file will have the following name:

``<cloud_id>_<category>[_<subcategory>]_<YYYYMMDDTHHmm>_<UniqueString>.<format>``

Where each of those fields have the following meaning:

- ``<region>``:  Region where the environment is located.

- ``<cloud_id>``: Environment's Cloud ID.

- ``<category>``: Either "output" or "config".

- ``<subcategory>``: Only used by the output category, contains "alerts" or "archives" files.
  
- ``<year>``: Year when the file was delivered.
  
- ``<month>``: Month when the file was delivered.
  
- ``<day>``: Day when the file was delivered.
  
- ``<YYYYMMDDTHHmm>``: Digits of the year, month, day, hour, and minute when the file was delivered. Hours are in 24-hour format and in UTC. A log file delivered at a specific time can contain records written at any point before that time.
  
- ``<UniqueString>``: The 16-character UniqueString component of the file name prevents overwriting files. It has no meaning, and log processing software should ignore it.
  
- ``<format>``: It is the encoding of the file. For "output" files is "json.gz", which is a JSON text file in compressed gzip format, and for "configuration" files is "tar.gz".