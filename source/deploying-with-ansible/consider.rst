.. _consider_ansible:

Considerations
==============

Before we get started with Ansible, confirm the following network requirements are met:

- **Private network DNS**: If you intended to use hostname instead of IP Address for remote hosts definitions, be sure you have correctly setup you own DNS server and it responds correctly to your hosts FQDN hostname, otherwise use your hosts file.
- **Firewall open ports**: Ansible can work with any TCP port, by default Ansible uses TCP/22 port to work with Linux hosts, be sure this port is open in hosts and/or firewalls.
