Ossec with Docker
=================

Prerequisites
-------------

Docker requires a 64-bit installation regardless of your CentOS/Debina/Ubuntu version. Also, your kernel must be 3.10 at minimum.

To check your current kernel version, open a terminal and use uname -r to display your kernel version::

   $ uname -r
   3.10.0-229.el7.x86_64

Adding yum repository
---------------------

To add docker yum repository, create a file named /etc/yum.repos.d/docker.repo::

   $ cd /etc/yum.repos.d
   $ vi docker.repo


**For CentOS**::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/centos/7
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg

**For Fedora**

For Fedora 21::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/fedora/21
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg

For Fedora 22::

   [dockerrepo]
   name=Docker Repository
   baseurl=https://yum.dockerproject.org/repo/main/fedora/22
   enabled=1
   gpgcheck=1
   gpgkey=https://yum.dockerproject.org/gpg


Adding apt-get repository
-------------------------

Add the new gpg key::

  $ apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

To add docker apt-get repository, create a file named /etc/apt/sources.list.d/docker.list::

   $ cd /etc/apt/sources.list.d/
   $ vi docker.list

**For Ubuntu**

For Ubuntu Vivid::

   # Ubuntu Vivid
   deb https://apt.dockerproject.org/repo ubuntu-vivid main

For Ubuntu Trusty::

   # Ubuntu Trusty
   deb https://apt.dockerproject.org/repo ubuntu-trusty main

For Ubuntu Wily::

   # Ubuntu Wily
   deb https://apt.dockerproject.org/repo ubuntu-wily main

**For Debian**

For Debian Wheezy::

   # Debian Wheezy
   deb https://apt.dockerproject.org/repo debian-wheezy main

For Debian Jessie::

   # Debian Jessie
   deb https://apt.dockerproject.org/repo debian-jessie main

For Debian Strech

   # Debian Stretch/Sid
   deb https://apt.dockerproject.org/repo debian-stretch main


Install the Docker package
--------------------------

For install in CentOS / Fedora::

   $ sudo yum install docker-engine

To start the daemon::

   $ sudo service docker start

For install in Ubuntu / Debian::

   $ sudo apt-get update && apt-get install docker-engine

To start the dameon:: 
 
   $ sudo service docker start


