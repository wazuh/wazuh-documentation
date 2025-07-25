
.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section of our documentation to learn about Available SCA policies in Wazuh.


Available SCA policies
======================

The table below shows SCA policies pre-installed in Wazuh out-of-the-box. The Wazuh agent only installs the policy file that is applicable to the endpoint operating system:

.. table:: Available SCA policies
    :widths: auto
    :name: available_sca_policies

    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | Reference                   | Policy                                                     | Target                        |
    +=============================+============================================================+===============================+
    | cis_win10_enterprise        |  CIS Benchmark for Windows 10 Enterprise                   | Windows 10                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win11_enterprise        |  CIS Benchmark for Windows 11 Enterprise                   | Windows 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2012r2               |  CIS Benchmark for Windows Server 2012 R2                  | Windows Server 2012 R2        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2012_non_r2          |  CIS Benchmark for Windows Server 2012 non R2              | Windows Server 2012 non R2    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2016                 |  CIS Benchmark for Windows Server 2016                     | Windows Server 2016           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2019                 |  CIS Benchmark for Windows Server 2019 RTM                 | Windows Server 2019           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2022                 |  CIS Benchmark for Windows Server 2022                     | Windows Server 2022           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_win2025                 |  CIS Benchmark for Windows Server 2025                     | Windows Server 2025           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_win_audit               |  Benchmark for Windows auditing                            | Windows                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_alma_linux_8            |  CIS Benchmark for Alma Linux 8                            | Alma Linux 8                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_alma_linux_9            |  CIS Benchmark for Alma Linux 9                            | Alma Linux 9                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_alma_linux_10           |  CIS Benchmark for Alma Linux 10                           | Alma Linux 10                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rocky_linux_8           |  CIS Benchmark for Rocky Linux 8                           | Rocky Linux 8                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rocky_linux_9           |  CIS Benchmark for Rocky Linux 9                           | Rocky Linux 9                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_oracle_linux_9          |  CIS Benchmark for Oracle Linux 9                          | Oracle Linux 9                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos6_linux           |  CIS Benchmark for CentOS Linux 6                          | CentOS Linux 6                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos7_linux           |  CIS Benchmark for CentOS Linux 7                          | CentOS Linux 7                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos8_linux           |  CIS Benchmark for CentOS Linux 8                          | CentOS Linux 8                |
    |                             |                                                            +-------------------------------+
    |                             |                                                            | CentOS Stream 8               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos9_linux           |  CIS Benchmark for CentOS Stream 9                         | CentOS Stream 9               |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_centos10_linux          |  CIS Benchmark for CentOS Stream 10                        | CentOS Stream 10              |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel5_linux             |  CIS Benchmark for Red Hat Enterprise Linux 5              | Red Hat Enterprise Linux 5    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel6_linux             |  CIS Benchmark for Red Hat Enterprise Linux 6              | Red Hat Enterprise Linux 6    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel7_linux             |  CIS Benchmark for Red Hat Enterprise Linux 7              | Red Hat Enterprise Linux 7    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel8_linux             |  CIS Benchmark for Red Hat Enterprise Linux 8              | Red Hat Enterprise Linux 8    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel9_linux             |  CIS Benchmark for Red Hat Enterprise Linux 9              | Red Hat Enterprise Linux 9    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_rhel10_linux            |  CIS Benchmark for Red Hat Enterprise Linux 10             | Red Hat Enterprise Linux 10   |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian7                 |  CIS Benchmark for Debian/Linux 7                          | Debian 7                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian8                 |  CIS Benchmark for Debian/Linux 8                          | Debian 8                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian9                 |  CIS Benchmark for Debian/Linux 9                          | Debian 9                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian10                |  CIS Benchmark for Debian/Linux 10                         | Debian 10                     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian11                |  CIS Benchmark for Debian/Linux 11                         | Debian 11                     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_debian12                |  CIS Benchmark for Debian/Linux 12                         | Debian 12                     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu14-04             |  CIS Checks for Ubuntu Linux 14.04 LTS                     | Ubuntu 14.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu16-04             |  CIS Checks for Ubuntu Linux 16.04 LTS                     | Ubuntu 16.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu18-04             |  CIS Checks for Ubuntu Linux 18.04 LTS                     | Ubuntu 18.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu20-04             |  CIS Checks for Ubuntu Linux 20.04 LTS                     | Ubuntu 20.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu22-04             |  CIS Checks for Ubuntu Linux 22.04 LTS                     | Ubuntu 22.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_ubuntu24-04             |  CIS Checks for Ubuntu Linux 24.04 LTS                     | Ubuntu 24.04                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles11_linux            |  CIS SUSE Linux Enterprise 11 Benchmark                    | SUSE 11                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles12_linux            |  CIS SUSE Linux Enterprise 12 Benchmark                    | SUSE 12                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sles15_linux            |  CIS Checks for SUSE SLES 15                               | SUSE 15                       |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_amazon_linux_1          |  CIS Checks for Amazon Linux 1                             | Amazon Linux 1                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_amazon_linux_2          |  CIS Checks for Amazon Linux 2                             | Amazon Linux 2                |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_amazon_linux_2023       |  CIS Checks for Amazon Linux 2023                          | Amazon Linux 2023             |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11               |  CIS Benchmark for Oracle Solaris 11                       | Solaris 11                    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_solaris11.4             |  CIS Checks for Oracle Solaris 11.4                        | Solaris 11.4                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_hpux                    |  CIS Benchmark for HP-UX 11i                               | HPUX 11i                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_hpux_bastille           |  CIS Benchmark for HP-UX 11i using Bastille                | HPUX 11i                      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.11       |  CIS Apple macOS 10.11 Benchmark                           | macOS 10.11 (El Capitan)      |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.12       |  CIS Apple macOS 10.12 Benchmark                           | macOS 10.12 (Sierra)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.13       |  CIS Apple macOS 10.13 Benchmark                           | macOS 10.13 (High Sierra)     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.14       |  CIS Checks for macOS 10.14                                | macOS 10.14 (Mojave)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_10.15       |  CIS Checks for macOS 10.15                                | macOS 10.15 (Catalina)        |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_11.1        |  CIS Checks for macOS 11.x                                 | macOS 11.x (Big Sur)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_12.0        |  CIS Checks for macOS 12.x                                 | macOS 12.0 (Monterey)         |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_13.x        |  CIS Checks for macOS 13.x                                 | macOS 13.x (Ventura)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_14.x        |  CIS Checks for macOS 14.x                                 | macOS 14.x (Sonoma)           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apple_macOS_15.x        |  CIS Checks for macOS 15.x                                 | macOS 15.x (Sequoia)          |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | web_vulnerabilities         |  System audit for web-related vulnerabilities              | N/A                           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_apache_24               |  CIS Apache HTTP Server 2.4 Benchmark                      | Apache configuration files    |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_community      |  CIS Benchmark for Oracle MySQL Community Server 5.6       | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mysql5-6_enterprise     |  CIS Benchmark for Oracle MySQL Enterprise 5.6             | MySQL configuration files     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2012          |  CIS Microsoft SQL Server 2012                             | Microsoft SQL Server 2012     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2014          |  CIS Microsoft SQL Server 2014                             | Microsoft SQL Server 2014     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2016          |  CIS Microsoft SQL Server 2016                             | Microsoft SQL Server 2016     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2017          |  CIS Microsoft SQL Server 2017                             | Microsoft SQL Server 2017     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_sqlserver_2019          |  CIS Microsoft SQL Server 2019                             | Microsoft SQL Server 2019     |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_iis_10                  |  CIS Checks for Microsoft IIS 10                           | Microsoft IIS 10              |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_mongodb_36              |  CIS Checks for MongoDB                                    | MongoDB 3.6                   |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_nginx_1                 |  CIS Benchmark for NGINX                                   | NGINX 1.14.0                  |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_oracle_database_19c     |  CIS Checks for Oracle Database 19c                        | Oracle Database 19c           |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | cis_postgre-sql-13          |  CIS Checks for PostgreSQL 13                              | PostgreSQL 13                 |
    +-----------------------------+------------------------------------------------------------+-------------------------------+
    | sca_distro_independent_linux|  CIS Benchmark for Distribution Independent Linux          | Distribution Independent Linux|
    +-----------------------------+------------------------------------------------------------+-------------------------------+
