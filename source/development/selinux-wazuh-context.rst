.. Copyright (C) 2021 Wazuh, Inc.

.. _selinux-wazuh-context:

SELinux Wazuh context
======================

- `Introduction`_
- `Create wazuh context`_
- `Troubleshooting`_

Introduction
------------
Security-Enhanced Linux (SELinux) defines access controls for the applications, processes, and files on a system.
SELinux is based on "security contexts", assigning one to every element under supervision and a policy that defines what access and operations are allowed.
The default SELinux behavior is context inheritance, so if there is no SELinux policy specifying otherwise, every process created will inherit the context of its parent. That said, as Wazuh does not have a defined context it inherits the context from systemd which is in charge of starting the service, this context is of type unconfined_t, which means that it is not under any security restriction, so only the standard Linux DAC restrictions will be applied to it.

Create wazuh context
--------------------
In case of having the need to run Wazuh as a confined process, we propose to create a new SELinux policy module which allows the transition to a Wazuh own context which we will call wazuh_t, we will also create a set of rules assigning the necessary permissions to run.
For the following example we used the Wazuh OVA image based on centOS 7 and the default Wazuh configuration.

SELinux module example to confine Wazuh
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To create a new module that allows Wazuh to transition to the new context we need the following files:

.. tabs::

        .. group-tab:: Wazuh Manager

            .. collapse:: wazuhT.fc

                .. code-block:: console

                    /var/ossec/active-response                  gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/active-response/bin(/.*)?        gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/agentless(/.*)?                  gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/api                              gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/api/configuration(/.*)?          gen_context(system_u:object_r:wazuh_etc_t,s0)
                    /var/ossec/api/scripts(/.*)?                gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/backup(/.*)?                     gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/bin(/.*)?                        gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/etc(/.*)?                        gen_context(system_u:object_r:wazuh_etc_t,s0)
                    /var/ossec/framework(/.*)?                  gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/integrations(/.*)?               gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/lib(/.*)?                        gen_context(system_u:object_r:wazuh_lib_t,s0)
                    /var/ossec/logs(/.*)?                       gen_context(system_u:object_r:wazuh_log_t,s0)
                    /var/ossec/queue(/.*)?                      gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/ruleset(/.*)?                    gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/stats(/.*)?                      gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/tmp(/.*)?                        gen_context(system_u:object_r:wazuh_tmp_t,s0)
                    /var/ossec/var(/.*)?                        gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/wodles(/.*)?                     gen_context(system_u:object_r:wazuh_exec_t,s0)

            .. collapse:: wazuhT.te

                .. code-block:: console

                    policy_module(wazuhT,1.0)

                    require {
                    type bin_t;
                    type tmp_t;
                    type unconfined_t;
                    type initrc_t;
                    type unconfined_service_t;
                    type user_home_t;
                    type user_home_dir_t;
                    type user_tmp_t;
                    type insmod_t;
                    role unconfined_r;
                    type system_cronjob_t;
                    type shell_exec_t;
                    type proc_t;
                    type passwd_file_t;
                    type var_t;
                    type cert_t;
                    type node_t;
                    type init_t;
                    type kernel_t;
                    type syslogd_t;
                    type udev_t;
                    type auditd_t;
                    type systemd_logind_t;
                    type policykit_t;
                    type system_dbusd_t;
                    type unconfined_t;
                    type rpcbind_t;
                    type NetworkManager_t;
                    type tuned_t;
                    type dhcpc_t;
                    type chronyd_t;
                    type postfix_master_t;
                    type postfix_pickup_t;
                    type sshd_t;
                    type crond_t;
                    type getty_t;
                    type postfix_qmgr_t;
                    type gssproxy_t;
                    type fs_t;
                    type unreserved_port_t;
                    type gluster_port_t;
                    type vfio_device_t;
                    type setsebool_exec_t;
                    type netutils_exec_t;
                    type unlabeled_t;
                    type load_policy_exec_t;
                    type agentx_port_t;
                    type msnp_port_t;
                    type rabbitmq_port_t;
                    type syslog_tls_port_t;
                    type systemd_hwdb_exec_t;
                    type rndc_port_t;
                    type sound_device_t;
                    type ocsp_port_t;
                    type rsync_exec_t;
                    type nessus_port_t;
                    type openvpn_port_t;
                    type dhcpc_port_t;
                    type reserved_port_t;
                    type pdps_port_t;
                    type xserver_etc_t;
                    type pki_tps_port_t;
                    type netsupport_port_t;
                    type jacorb_port_t;
                    type getty_t;
                    type uucpd_port_t;
                    type pxe_port_t;
                    type wazuh_t;
                    type sip_port_t;
                    type i18n_input_port_t;
                    type virt_qemu_ga_exec_t;
                    type kprop_port_t;
                    type ipmi_port_t;
                    type gpsd_port_t;
                    type dhcpd_port_t;
                    type postgresql_port_t;
                    type fusermount_exec_t;
                    type speech_port_t;
                    type sysctl_net_t;
                    type brlp_port_t;
                    type kerberos_port_t;
                    type servistaitsm_port_t;
                    type dict_port_t;
                    type syslog_conf_t;
                    type systemd_unit_file_t;
                    type router_port_t;
                    type jabber_interserver_port_t;
                    type tcsd_exec_t;
                    type ipsecnat_port_t;
                    type sulogin_exec_t;
                    type pinentry_exec_t;
                    type systemd_notify_exec_t;
                    type condor_port_t;
                    type hwclock_exec_t;
                    type oa_system_port_t;
                    type svn_port_t;
                    type lmtp_port_t;
                    type xodbc_connect_port_t;
                    type commplex_main_port_t;
                    type auditd_exec_t;
                    type sieve_port_t;
                    type tram_port_t;
                    type crash_device_t;
                    type chronyd_port_t;
                    type virt_port_t;
                    type flash_port_t;
                    type cgroup_t;
                    type loadkeys_exec_t;
                    type asterisk_port_t;
                    type printer_port_t;
                    type initrc_exec_t;
                    type hugetlbfs_t;
                    type ms_streaming_port_t;
                    type intermapper_port_t;
                    type imaze_port_t;
                    type systemd_hostnamed_exec_t;
                    type jboss_messaging_port_t;
                    type nfsd_exec_t;
                    type rwho_port_t;
                    type winshadow_port_t;
                    type sixxsconfig_port_t;
                    type usbmon_device_t;
                    type ptal_port_t;
                    type debuginfo_exec_t;
                    type rpcd_exec_t;
                    type chkpwd_exec_t;
                    type updpwd_exec_t;
                    type gopher_port_t;
                    type wccp_port_t;
                    type systemd_timedated_exec_t;
                    type tangd_port_t;
                    type git_port_t;
                    type varnishd_port_t;
                    type lsm_plugin_port_t;
                    type mmcc_port_t;
                    type dmesg_exec_t;
                    type ntp_port_t;
                    type sysfs_t;
                    type hostname_exec_t;
                    type system_cron_spool_t;
                    type sshd_key_t;
                    type zope_port_t;
                    type pppd_exec_t;
                    type adjtime_t;
                    type chronyc_exec_t;
                    type fac_restore_port_t;
                    type transproxy_port_t;
                    type rsh_port_t;
                    type l2tp_port_t;
                    type systemd_logind_exec_t;
                    type su_exec_t;
                    type wsicopy_port_t;
                    type ibm_dt_2_port_t;
                    type apcupsd_port_t;
                    type zabbix_port_t;
                    type dhcpc_exec_t;
                    type framebuf_device_t;
                    type auditctl_exec_t;
                    type kerberos_admin_port_t;
                    type iptables_exec_t;
                    type setfiles_exec_t;
                    type audit_port_t;
                    type ftp_data_port_t;
                    type random_device_t;
                    type scsi_generic_device_t;
                    type hddtemp_port_t;
                    type mountd_port_t;
                    type jboss_debug_port_t;
                    type sge_port_t;
                    type ricci_port_t;
                    type ifconfig_exec_t;
                    type monopd_port_t;
                    type dey_keyneg_port_t;
                    type zebra_port_t;
                    type zented_port_t;
                    type namespace_init_exec_t;
                    type shellinaboxd_port_t;
                    type osapi_compute_port_t;
                    type lvm_exec_t;
                    type rlogind_port_t;
                    type mail_spool_t;
                    type pki_tks_port_t;
                    type mxi_port_t;
                    type vmtools_unconfined_exec_t;
                    type dhcp_etc_t;
                    type logrotate_exec_t;
                    type oddjob_mkhomedir_exec_t;
                    type firewalld_etc_rw_t;
                    type virtual_places_port_t;
                    type mongod_port_t;
                    type bgp_port_t;
                    type cyphesis_port_t;
                    type afs3_callback_port_t;
                    type hi_reserved_port_t;
                    type ssh_exec_t;
                    type afs_pt_port_t;
                    type selinux_config_t;
                    type dri_device_t;
                    type virt_qemu_ga_unconfined_exec_t;
                    type radius_port_t;
                    type pyzor_port_t;
                    type gpg_agent_exec_t;
                    type memory_device_t;
                    type firewalld_exec_t;
                    type bctp_port_t;
                    type pki_ocsp_port_t;
                    type fingerd_port_t;
                    type comsat_port_t;
                    type nvram_device_t;
                    type whois_port_t;
                    type prelude_port_t;
                    type rtsp_port_t;
                    type svrloc_port_t;
                    type squid_port_t;
                    type sshd_exec_t;
                    type mouse_device_t;
                    type zookeeper_election_port_t;
                    type device_t;
                    type fixed_disk_device_t;
                    type boinc_port_t;
                    type razor_port_t;
                    type ptmx_t;
                    type ssh_agent_exec_t;
                    type telnetd_port_t;
                    type isns_port_t;
                    type etc_aliases_t;
                    type NetworkManager_etc_t;
                    type fmpro_internal_port_t;
                    type rsync_etc_t;
                    type dey_sapi_port_t;
                    type jabber_router_port_t;
                    type distccd_port_t;
                    type postfix_policyd_port_t;
                    type useradd_exec_t;
                    type sudo_exec_t;
                    type iscsi_port_t;
                    type mysqlmanagerd_port_t;
                    type crond_exec_t;
                    type bootloader_etc_t;
                    type postfix_postqueue_exec_t;
                    type postfix_map_exec_t;
                    type admin_home_t;
                    type syslogd_port_t;
                    type gatekeeper_port_t;
                    type traceroute_exec_t;
                    type lltng_port_t;
                    type prosody_port_t;
                    type snmp_port_t;
                    type semanage_exec_t;
                    type howl_port_t;
                    type journalctl_exec_t;
                    type lvm_control_t;
                    type rsync_port_t;
                    type tuned_etc_t;
                    type dmidecode_exec_t;
                    type wsdapi_port_t;
                    type pegasus_http_port_t;
                    type ktalkd_port_t;
                    type pulseaudio_port_t;
                    type usernetctl_exec_t;
                    type pppd_etc_t;
                    type zarafa_port_t;
                    type syslogd_exec_t;
                    type showmount_exec_t;
                    type presence_port_t;
                    type ssh_port_t;
                    type nsd_control_port_t;
                    type checkpolicy_exec_t;
                    type proc_net_t;
                    type postfix_master_exec_t;
                    type sendmail_exec_t;
                    type afs_vl_port_t;
                    type salt_port_t;
                    type pstore_t;
                    type cluster_port_t;
                    type pptp_port_t;
                    type mount_exec_t;
                    type lirc_port_t;
                    type xinuexpansion3_port_t;
                    type var_lib_t;
                    type exports_t;
                    type ups_port_t;
                    type luci_port_t;
                    type user_tmp_t;
                    type movaz_ssc_port_t;
                    type games_exec_t;
                    type insmod_exec_t;
                    type dns_port_t;
                    type gssd_exec_t;
                    type udev_exec_t;
                    type console_device_t;
                    type trisoap_port_t;
                    type tun_tap_device_t;
                    type dbusd_etc_t;
                    type netport_port_t;
                    type mpd_port_t;
                    type pki_ca_port_t;
                    type xinuexpansion4_port_t;
                    type autofs_device_t;
                    type ionixnetmon_port_t;
                    type gssproxy_exec_t;
                    type epmd_port_t;
                    type samba_etc_t;
                    type fuse_device_t;
                    type udev_rules_t;
                    type sshd_keygen_exec_t;
                    type chronyd_exec_t;
                    type neutron_port_t;
                    type tcs_port_t;
                    type websm_port_t;
                    type zabbix_agent_port_t;
                    type redis_port_t;
                    type anacron_exec_t;
                    type mssql_port_t;
                    type auditd_log_t;
                    type conman_port_t;
                    type afs_fs_port_t;
                    type spamd_port_t;
                    type cvs_port_t;
                    type tor_port_t;
                    type userhelper_conf_t;
                    type systemd_systemctl_exec_t;
                    type us_cli_port_t;
                    type vnc_port_t;
                    type tftp_port_t;
                    type http_cache_port_t;
                    type tuned_exec_t;
                    type cma_port_t;
                    type systemd_initctl_exec_t;
                    type rpcbind_exec_t;
                    type passwd_exec_t;
                    type amqp_port_t;
                    type openhpid_port_t;
                    type kubernetes_port_t;
                    type mysqld_port_t;
                    type crack_exec_t;
                    type embrace_dp_c_port_t;
                    type systemd_passwd_agent_exec_t;
                    type modules_object_t;
                    type netcontrol_device_t;
                    type boinc_client_port_t;
                    type system_dbusd_var_run_t;
                    type crontab_exec_t;
                    type ricci_modcluster_port_t;
                    type loop_control_device_t;
                    type NetworkManager_exec_t;
                    type event_device_t;
                    type amanda_port_t;
                    type rpm_script_tmp_t;
                    type bootloader_exec_t;
                    type ntop_port_t;
                    type pktcable_cops_port_t;
                    type trivnet1_port_t;
                    type smbd_port_t;
                    type gds_db_port_t;
                    type amavisd_send_port_t;
                    type hadoop_namenode_port_t;
                    type xen_port_t;
                    type time_port_t;
                    type krb5_conf_t;
                    type login_exec_t;
                    type tcpd_exec_t;
                    type ldconfig_exec_t;
                    type echo_port_t;
                    type sype_transport_port_t;
                    type devlog_t;
                    type soundd_port_t;
                    type ssdp_port_t;
                    type oracle_port_t;
                    type dcc_port_t;
                    type epmap_port_t;
                    type postfix_etc_t;
                    type net_conf_t;
                    type afs_ka_port_t;
                    type llmnr_port_t;
                    type cobbler_port_t;
                    type hypervvssd_exec_t;
                    type inetd_child_port_t;
                    type dbusd_exec_t;
                    type swift_port_t;
                    type mailbox_port_t;
                    type pam_console_exec_t;
                    type xfs_port_t;
                    type ovsdb_port_t;
                    type zookeeper_client_port_t;
                    type glance_port_t;
                    type games_data_t;
                    type pki_kra_port_t;
                    type memcache_port_t;
                    type systemd_tmpfiles_exec_t;
                    type rtsclient_port_t;
                    type radacct_port_t;
                    type openvswitch_port_t;
                    type vmtools_exec_t;
                    type clock_device_t;
                    type ipp_port_t;
                    type mdadm_exec_t;
                    type nodejs_debug_port_t;
                    type clamd_port_t;
                    type mythtv_port_t;
                    type aol_port_t;
                    type swat_port_t;
                    type dogtag_port_t;
                    type uhid_device_t;
                    type pegasus_https_port_t;
                    type giftd_port_t;
                    type pop_port_t;
                    type cyrus_imapd_port_t;
                    type xdmcp_port_t;
                    type hplip_port_t;
                    type pki_ra_port_t;
                    type dnssec_port_t;
                    type wap_wsp_port_t;
                    type systemd_localed_exec_t;
                    type init_exec_t;
                    type systemd_sysctl_exec_t;
                    type mail_port_t;
                    type pgpkeyserver_port_t;
                    type modules_conf_t;
                    type chfn_exec_t;
                    type afs_bos_port_t;
                    type systemd_bootchart_exec_t;
                    type traceroute_port_t;
                    type geneve_port_t;
                    type ppp_device_t;
                    type efs_port_t;
                    type irqbalance_exec_t;
                    type ssh_keygen_exec_t;
                    type cupsd_rw_etc_t;
                    type dbskkd_port_t;
                    type xserver_misc_device_t;
                    type auth_port_t;
                    type chronyd_keys_t;
                    type rpm_exec_t;
                    type tty_device_t;
                    type policykit_exec_t;
                    type openflow_port_t;
                    type user_fonts_t;
                    type ping_exec_t;
                    type proc_t;
                    type readahead_exec_t;
                    type jboss_management_port_t;
                    type commplex_link_port_t;
                    type getty_exec_t;
                    type pingd_port_t;
                    type devpts_t;
                    type zookeeper_leader_port_t;
                    type interwise_port_t;
                    type vhost_device_t;
                    type hostname_etc_t;
                    type munin_port_t;
                    type ftp_port_t;
                    type quota_exec_t;
                    type repository_port_t;
                    type groupadd_exec_t;
                    type pam_timestamp_exec_t;
                    type sap_port_t;
                    type apertus_ldp_port_t;
                    type ctdb_port_t;
                    type rdisc_exec_t;
                    type freeipmi_port_t;
                    type ephemeral_port_t;
                    type innd_port_t;
                    type postfix_postdrop_exec_t;
                    type wtmp_t;
                    type clockspeed_port_t;
                    type smtp_port_t;
                    type dccm_port_t;
                    type ldap_port_t;
                    type kerberos_password_port_t;
                    type configfs_t;
                    type saphostctrl_port_t;
                    type admin_passwd_exec_t;
                    type apm_bios_t;
                    type isakmp_port_t;
                    type apc_port_t;
                    type audisp_exec_t;
                    type policykit_auth_exec_t;
                    type collectd_port_t;
                    type puppet_port_t;
                    type vlock_exec_t;
                    type auditd_etc_t;
                    type radsec_port_t;
                    type fsadm_exec_t;
                    type amavisd_recv_port_t;
                    type xserver_port_t;
                    type milter_port_t;
                    type gdomap_port_t;
                    type couchdb_port_t;
                    type var_log_t;
                    type rtp_media_port_t;
                    type kmsg_device_t;
                    type mysqld_etc_t;
                    type preupgrade_port_t;
                    type gpg_exec_t;
                    type connlcli_port_t;
                    type http_port_t;
                    type shadow_t;
                    type portmap_port_t;
                    type mandb_exec_t;
                    type systemd_machined_exec_t;
                    type cpu_device_t;
                    type jabber_client_port_t;
                    type ircd_port_t;
                    type hypervkvp_exec_t;
                    type nfs_port_t;
                    type daap_port_t;
                    type nmbd_port_t;
                    type blkmapd_exec_t;
                    type rlogin_port_t;
                    type systemd_hwdb_etc_t;
                    type bacula_port_t;
                    type tmpfs_t;
                    type slapd_cert_t;
                    type glance_registry_port_t;
                    type NetworkManager_var_lib_t;
                    type authconfig_var_lib_t;
                    type bootloader_var_lib_t;
                    type chronyd_var_lib_t;
                    type chronyd_var_log_t;
                    type cron_log_t;
                    type default_context_t;
                    type dhcpc_state_t;
                    type faillog_t;
                    type gssproxy_var_lib_t;
                    type hypervkvp_var_lib_t;
                    type init_var_lib_t;
                    type lastlog_t;
                    type logrotate_var_lib_t;
                    type policykit_var_lib_t;
                    type postfix_data_t;
                    type rhsmcertd_log_t;
                    type rpcbind_var_lib_t;
                    type rpm_log_t;
                    type samba_log_t;
                    type samba_var_t;
                    type selinux_login_config_t;
                    type semanage_store_t;
                    type syslogd_var_lib_t;
                    type NetworkManager_etc_rw_t;
                    type NetworkManager_initrc_exec_t;
                    type NetworkManager_unit_file_t;
                    type auditd_unit_file_t;
                    type bluetooth_unit_file_t;
                    type chronyd_unit_file_t;
                    type crond_unit_file_t;
                    type firewalld_unit_file_t;
                    type getty_unit_file_t;
                    type gssproxy_unit_file_t;
                    type hypervvssd_unit_file_t;
                    type nfsd_unit_file_t;
                    type power_unit_file_t;
                    type pppd_etc_rw_t;
                    type pppd_initrc_exec_t;
                    type rdisc_unit_file_t;
                    type rpcd_unit_file_t;
                    type sshd_keygen_unit_file_t;
                    type sshd_unit_file_t;
                    type system_dbusd_var_lib_t;
                    type systemd_bootchart_unit_file_t;
                    type systemd_hwdb_unit_file_t;
                    type systemd_machined_unit_file_t;
                    type systemd_machined_var_lib_t;
                    type systemd_timedated_unit_file_t;
                    type systemd_vconsole_unit_file_t;
                    type tcsd_var_lib_t;
                    type tuned_log_t;
                    type tuned_rw_etc_t;
                    type user_devpts_t;
                    type var_lib_nfs_t;
                    type virt_qemu_ga_log_t;
                    type vmtools_unit_file_t;
                    type file_context_t;
                    type init_var_run_t;
                    type mount_var_run_t;
                    type rpc_pipefs_t;
                    type rpm_var_lib_t;
                    type syslogd_var_run_t;
                    type usermodehelper_t;
                    type var_run_t;
                    type etc_t;
                    type system_map_t;
                    type security_t;
                    type user_cron_spool_t;
                    type rpm_var_cache_t;
                    type firewalld_var_log_t;
                    type firewalld_t;
                    type sshd_net_t;
                    type irqbalance_t;
                    type local_login_t;
                    type user_tty_device_t;
                    type plymouthd_var_log_t;
                    type home_cert_t;
                    role system_r;
                    class process { transition getattr getpgid getsession setrlimit setsched signull open read};
                    class fifo_file { getattr open read };
                    class rawip_socket {setopt open};
                    class netlink_route_socket {bind setopt create open};
                    class netlink_audit_socket {bind setopt create open};
                    class lnk_file {getattr open read};
                    class file { getattr open read execute getattr read};
                    class dir { getattr open read search };
                    class tcp_socket { bind connect create getopt listen name_bind name_connect node_bind setopt };
                    class capability { chown dac_override fowner fsetid kill net_bind_service net_raw setgid setuid sys_chroot sys_resource sys_ptrace};
                    class unix_dgram_socket { read write create ioctl sendto bind getopt connect};
                    class chr_file { getattr open read };
                    class netlink_tcpdiag_socket {create getattr setopt bind nlmsg_read};
                    class filesystem { getattr open read };
                    class sock_file { getattr open read };
                    class blk_file { getattr open read };
                    class udp_socket name_bind;
                    class unix_stream_socket {connectto ioctl getattr};
                    class dbus send_msg;
                    }

                    # Private type declarations
                    type wazuh_t;
                    type wazuh_exec_t;
                    type wazuh_etc_t;
                    type wazuh_lib_t;
                    type wazuh_log_t;
                    type wazuh_tmp_t;
                    type wazuh_var_t;

                    # ports label
                    type wazuh_port_t;
                    corenet_port(wazuh_port_t)

                    # domain_type macro specifies the type wazuh_t to be a domain.
                    domain_type(wazuh_t)

                    # domain_entry_file specifies an entry point to the wazuh_t domain for the executable file of type wazuh_exec_t.
                    domain_entry_file(wazuh_t, wazuh_exec_t)

                    # logging_log_file macro makes wazuh_log_t become the type of log file with the necessary groups and rules
                    logging_log_file(wazuh_log_t)

                    # allow domain wazuh_t to manipulate log files
                    allow wazuh_t wazuh_log_t:file append_file_perms;

                    # files_tmp_file takes the type of wazuh_tmp_t to the necessary groups so that it becomes the type of temp file
                    files_tmp_file(wazuh_tmp_t)

                    # allow the wazuh_t domain write privileges into the tmp_t labeled directory, but with an automatic file transition towards wazuh_tmp_t for every file written
                    files_tmp_filetrans(wazuh_t,wazuh_tmp_t,file)

                    # allow domain wazuh_t to manipulate tmp files
                    allow wazuh_t wazuh_tmp_t:file manage_file_perms;

                    #============== Allow transition
                    role unconfined_r types wazuh_t;
                    role system_r types wazuh_t;

                    allow wazuh_t bin_t : file { execute read getattr };
                    allow unconfined_t wazuh_t : process transition;
                    allow initrc_t wazuh_t : process transition;
                    allow unconfined_service_t wazuh_t : process transition;
                    allow unconfined_t wazuh_exec_t : file { execute read getattr };
                    allow initrc_t wazuh_exec_t : file { execute read getattr };
                    allow unconfined_service_t wazuh_exec_t : file { execute read getattr };
                    allow wazuh_t wazuh_exec_t : file entrypoint;

                    type_transition unconfined_t wazuh_exec_t : process wazuh_t;
                    type_transition initrc_t wazuh_exec_t : process wazuh_t;
                    type_transition unconfined_service_t wazuh_exec_t : process wazuh_t;

                    #============== Permissions for wazuh-control to run wazuh
                    allow wazuh_t shell_exec_t:file { execute execute_no_trans };
                    allow wazuh_t bin_t:file execute_no_trans;
                    allow wazuh_t proc_t:file { getattr open read ioctl};
                    allow wazuh_t passwd_file_t:file { getattr ioctl open read };

                    allow wazuh_t wazuh_var_t:dir { create rmdir open add_name read remove_name write getattr setattr search};
                    allow wazuh_t wazuh_var_t:file { create getattr open read append rename setattr unlink write ioctl lock};
                    allow wazuh_t wazuh_exec_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_exec_t:file { create getattr open read append rename setattr link unlink write ioctl lock execute execute_no_trans};
                    allow wazuh_t wazuh_log_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_log_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_etc_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_etc_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_tmp_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_tmp_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_lib_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_lib_t:file { getattr open read map execute};
                    allow wazuh_t wazuh_var_t:filesystem { associate};
                    allow wazuh_var_t fs_t:filesystem { associate};
                    allow wazuh_etc_t fs_t:filesystem { associate};

                    #============== Permissions for Framework and API
                    allow wazuh_t wazuh_exec_t:lnk_file {getattr open read};
                    allow wazuh_t self:tcp_socket { bind connect create getopt listen setopt };
                    allow wazuh_t self:udp_socket { bind connect create getattr ioctl setopt };

                    #============== Permissions for analysisd to run
                    allow wazuh_t self:process { getattr getpgid getsession setrlimit setsched };
                    allow wazuh_t user_cron_spool_t:dir {getattr open read search};
                    allow wazuh_t security_t:security compute_av;
                    allow wazuh_t security_t:file {getattr open read write};
                    allow wazuh_t security_t:dir {getattr open read search write};
                    allow wazuh_t var_t:file link;

                    #============== Permissions to read /proc
                    allow wazuh_t proc_t:dir read;
                    allow wazuh_t init_t:dir { getattr open read search };
                    allow wazuh_t init_t:file { getattr open read };
                    allow wazuh_t init_t:lnk_file read;
                    allow wazuh_t init_t:process { getattr getpgid getsession };
                    allow wazuh_t init_t:unix_stream_socket {connectto ioctl getattr};
                    allow wazuh_t init_t:system { status };
                    allow wazuh_t init_t:service { status };
                    allow wazuh_t irqbalance_t:dir { getattr open read search };
                    allow wazuh_t irqbalance_t:file { open read };
                    allow wazuh_t local_login_t:dir { getattr open read search };
                    allow wazuh_t local_login_t:file { open read };
                    allow wazuh_t kernel_t:dir { getattr open read search };
                    allow wazuh_t kernel_t:file { open read };
                    allow wazuh_t kernel_t:process { getattr getpgid getsession signull };
                    allow wazuh_t kernel_t:unix_dgram_socket sendto;
                    allow wazuh_t kernel_t:system module_request;
                    allow wazuh_t syslogd_t:dir { getattr open read search };
                    allow wazuh_t syslogd_t:file { getattr open read };
                    allow wazuh_t syslogd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t udev_t:dir { getattr open read search };
                    allow wazuh_t udev_t:file { open read };
                    allow wazuh_t udev_t:process { getattr getpgid getsession signull };
                    allow wazuh_t auditd_t:dir { getattr open read search };
                    allow wazuh_t auditd_t:file { getattr open read };
                    allow wazuh_t auditd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t systemd_logind_t:dir { getattr open read search };
                    allow wazuh_t systemd_logind_t:file { open read };
                    allow wazuh_t systemd_logind_t:process { getattr getpgid getsession signull };
                    allow wazuh_t policykit_t:dir { getattr open read search };
                    allow wazuh_t policykit_t:file { open read };
                    allow wazuh_t policykit_t:process { getattr getpgid getsession signull };
                    allow wazuh_t system_dbusd_t:dir { getattr open read search };
                    allow wazuh_t system_dbusd_t:file { open read };
                    allow wazuh_t system_dbusd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t system_dbusd_t:dbus send_msg;
                    allow wazuh_t NetworkManager_t:dir { getattr open read search };
                    allow wazuh_t NetworkManager_t:file { open read };
                    allow wazuh_t NetworkManager_t:process { getattr getpgid getsession signull };
                    allow wazuh_t chronyd_t:dir { getattr open read search };
                    allow wazuh_t chronyd_t:file { open read };
                    allow wazuh_t chronyd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t crond_t:dir { getattr open read search };
                    allow wazuh_t crond_t:file { getattr open read };
                    allow wazuh_t crond_t:process { getattr getpgid getsession signull };
                    allow wazuh_t dhcpc_t:dir { getattr open read search };
                    allow wazuh_t dhcpc_t:file { open read };
                    allow wazuh_t dhcpc_t:process { getattr getpgid getsession signull };
                    allow wazuh_t getty_t:dir { getattr open read search };
                    allow wazuh_t getty_t:file { open read };
                    allow wazuh_t getty_t:process { getattr getpgid getsession signull };
                    allow wazuh_t gssproxy_t:dir { getattr open read search };
                    allow wazuh_t gssproxy_t:file { open read };
                    allow wazuh_t gssproxy_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_master_t:dir { getattr open read search };
                    allow wazuh_t postfix_master_t:file { open read };
                    allow wazuh_t postfix_master_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_pickup_t:dir { getattr open read search };
                    allow wazuh_t postfix_pickup_t:file { open read };
                    allow wazuh_t postfix_pickup_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_qmgr_t:dir { getattr open read search };
                    allow wazuh_t postfix_qmgr_t:file { open read };
                    allow wazuh_t postfix_qmgr_t:process { getattr getpgid getsession signull };
                    allow wazuh_t rpcbind_t:dir { getattr open read search };
                    allow wazuh_t rpcbind_t:file { open read };
                    allow wazuh_t rpcbind_t:process { getattr getpgid getsession signull };
                    allow wazuh_t sshd_t:dir { getattr open read search };
                    allow wazuh_t sshd_t:file { open read };
                    allow wazuh_t sshd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t tuned_t:dir { getattr open read search };
                    allow wazuh_t tuned_t:file { open read };
                    allow wazuh_t tuned_t:process { getattr getpgid getsession signull };
                    allow wazuh_t unconfined_service_t:dir { getattr open read search };
                    allow wazuh_t unconfined_service_t:file { open read };
                    allow wazuh_t unconfined_service_t:process { getattr getpgid getsession signull };
                    allow wazuh_t unconfined_t:dir { getattr open read search };
                    allow wazuh_t unconfined_t:file { open read };
                    allow wazuh_t unconfined_t:lnk_file read;
                    allow wazuh_t unconfined_t:process { getattr getpgid getsession signull };

                    #============== Permissions for remoted to use sockets
                    allow wazuh_t wazuh_var_t:sock_file { read write getattr create setattr unlink} ;
                    allow wazuh_t wazuh_t:unix_stream_socket {connectto ioctl};
                    allow wazuh_t wazuh_port_t:tcp_socket {name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:tcp_socket {accept bind name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_port_t:udp_socket {name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:udp_socket {accept name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:unix_dgram_socket { read write create ioctl sendto bind getopt connect};

                    #============== Permissions for logcollector to read logs
                    allow wazuh_t auditd_log_t:dir { getattr open read search};
                    allow wazuh_t var_log_t:dir read;

                    #============== Permissions for syscheckd to monitor files and directories
                    allow wazuh_t var_t:dir { getattr open read search};
                    allow wazuh_t var_t:file { getattr open read };
                    allow wazuh_t system_map_t:file { getattr open read };
                    allow wazuh_t fs_t:filesystem { getattr open read };
                    allow wazuh_t NetworkManager_etc_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_exec_t:file { getattr open read };
                    allow wazuh_t adjtime_t:file { getattr open read };
                    allow wazuh_t admin_home_t:dir read;
                    allow wazuh_t admin_passwd_exec_t:file { getattr open read };
                    allow wazuh_t anacron_exec_t:file { getattr open read };
                    allow wazuh_t apm_bios_t:chr_file { getattr open read };
                    allow wazuh_t audisp_exec_t:file { getattr open read };
                    allow wazuh_t auditctl_exec_t:file { getattr open read };
                    allow wazuh_t auditd_etc_t:dir { getattr open read search};
                    allow wazuh_t auditd_exec_t:file { getattr open read };
                    allow wazuh_t autofs_device_t:chr_file { getattr open read };
                    allow wazuh_t blkmapd_exec_t:file { getattr open read };
                    allow wazuh_t bootloader_etc_t:file { getattr open read };
                    allow wazuh_t bootloader_exec_t:file { getattr open read };
                    allow wazuh_t cert_t:dir { getattr open read search write create add_name remove_name rmdir};
                    allow wazuh_t cert_t:file { getattr open read lock write};
                    allow wazuh_t cert_t:lnk_file { getattr open read };
                    allow wazuh_t cgroup_t:dir { getattr open search read};
                    allow wazuh_t cgroup_t:file { getattr open read};
                    allow wazuh_t checkpolicy_exec_t:file { getattr open read };
                    allow wazuh_t chfn_exec_t:file { getattr read open};
                    allow wazuh_t chkpwd_exec_t:file { getattr open read };
                    allow wazuh_t chronyc_exec_t:file { getattr open read };
                    allow wazuh_t chronyd_exec_t:file { getattr open read };
                    allow wazuh_t chronyd_keys_t:file { getattr open read };
                    allow wazuh_t clock_device_t:chr_file { getattr open read };
                    allow wazuh_t user_tty_device_t:chr_file { getattr open read };
                    allow wazuh_t irqbalance_t:process { signull getsession getpgid getattr};
                    allow wazuh_t local_login_t:process { signull getsession getpgid getattr};
                    allow wazuh_t configfs_t:dir { getattr open read search};
                    allow wazuh_t configfs_t:filesystem { getattr open read };
                    allow wazuh_t console_device_t:chr_file { getattr open read };
                    allow wazuh_t cpu_device_t:chr_file { getattr open read };
                    allow wazuh_t crack_exec_t:file { getattr open read };
                    allow wazuh_t crash_device_t:chr_file { getattr open read };
                    allow wazuh_t system_cronjob_t:process { getattr open read signull getsession getpgid};
                    allow wazuh_t system_cronjob_t:file { getattr open read };
                    allow wazuh_t system_cronjob_t:dir { getattr open read search};
                    allow wazuh_t crond_exec_t:file { getattr read open};
                    allow wazuh_t crontab_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t cupsd_rw_etc_t:file { getattr open read };
                    allow wazuh_t dbusd_etc_t:dir { getattr open read search};
                    allow wazuh_t dbusd_etc_t:file { getattr open read};
                    allow wazuh_t dbusd_exec_t:file { getattr open read };
                    allow wazuh_t debuginfo_exec_t:file { getattr open read };

                    #!!!! WARNING: 'device_t' is a base type.
                    allow wazuh_t device_t:filesystem { getattr open read };
                    allow wazuh_t devlog_t:sock_file { read write getattr create setattr unlink};
                    allow wazuh_t devpts_t:dir { getattr open read search};
                    allow wazuh_t dhcp_etc_t:dir { getattr open read search};
                    allow wazuh_t dhcp_etc_t:file { getattr open read };
                    allow wazuh_t dhcpc_exec_t:file { getattr open read };
                    allow wazuh_t dmesg_exec_t:file { getattr open read };
                    allow wazuh_t dmidecode_exec_t:file { getattr open read };
                    allow wazuh_t dri_device_t:chr_file { getattr open read };
                    allow wazuh_t etc_aliases_t:file { getattr open read };
                    allow wazuh_t event_device_t:chr_file { getattr open read };
                    allow wazuh_t exports_t:file { getattr open read };
                    allow wazuh_t firewalld_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t firewalld_exec_t:file { getattr open read };
                    allow wazuh_t fixed_disk_device_t:blk_file { getattr open read };
                    allow wazuh_t fixed_disk_device_t:chr_file { getattr open read };
                    allow wazuh_t framebuf_device_t:chr_file { getattr open read };
                    allow wazuh_t fsadm_exec_t:file { getattr open read };
                    allow wazuh_t fuse_device_t:chr_file { getattr open read };
                    allow wazuh_t fusermount_exec_t:file { getattr open read };
                    allow wazuh_t games_data_t:dir { getattr open read search};
                    allow wazuh_t games_exec_t:dir { getattr open read search};
                    allow wazuh_t getty_exec_t:file { getattr open read };
                    allow wazuh_t getty_t:lnk_file read;
                    allow wazuh_t gpg_agent_exec_t:file { getattr open read };
                    allow wazuh_t gpg_exec_t:file { getattr open read };
                    allow wazuh_t groupadd_exec_t:file { getattr open read };
                    allow wazuh_t gssd_exec_t:file { getattr open read };
                    allow wazuh_t gssproxy_exec_t:file { getattr open read };
                    allow wazuh_t hostname_etc_t:file { getattr open read };
                    allow wazuh_t hostname_exec_t:file { getattr open read };
                    allow wazuh_t home_cert_t:dir { getattr open read search};
                    allow wazuh_t home_cert_t:file { getattr open read };
                    allow wazuh_t hugetlbfs_t:dir { getattr open read search};
                    allow wazuh_t hugetlbfs_t:filesystem { getattr open read };
                    allow wazuh_t hwclock_exec_t:file { getattr open read };
                    allow wazuh_t hypervkvp_exec_t:file { getattr open read };
                    allow wazuh_t hypervvssd_exec_t:file { getattr open read };
                    allow wazuh_t ifconfig_exec_t:file { getattr open read };
                    allow wazuh_t init_exec_t:file { getattr open read };
                    allow wazuh_t initrc_exec_t:file { getattr open read };
                    allow wazuh_t insmod_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t iptables_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t irqbalance_exec_t:file { getattr open read };
                    allow wazuh_t journalctl_exec_t:file { execute execute_no_trans getattr open read execute};
                    allow wazuh_t kmsg_device_t:chr_file { getattr open read };
                    allow wazuh_t krb5_conf_t:file { getattr open read };
                    allow wazuh_t ldconfig_exec_t:file { getattr open read };
                    allow wazuh_t load_policy_exec_t:file { getattr open read };
                    allow wazuh_t loadkeys_exec_t:file { getattr open read };
                    allow wazuh_t login_exec_t:file { getattr open read };
                    allow wazuh_t logrotate_exec_t:file { getattr open read };
                    allow wazuh_t loop_control_device_t:chr_file { getattr open read };
                    allow wazuh_t lvm_control_t:chr_file { getattr open read };
                    allow wazuh_t lvm_exec_t:file { getattr open read };
                    allow wazuh_t mandb_exec_t:file { getattr open read };
                    allow wazuh_t mdadm_exec_t:file { getattr open read };
                    allow wazuh_t memory_device_t:chr_file { getattr open read };
                    allow wazuh_t modules_conf_t:dir { getattr open read search};
                    allow wazuh_t modules_conf_t:file { getattr open read };
                    allow wazuh_t modules_object_t:dir { getattr open read search};
                    allow wazuh_t modules_object_t:file { getattr open read };
                    allow wazuh_t mount_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t mouse_device_t:chr_file { getattr open read };
                    allow wazuh_t mysqld_etc_t:dir { getattr open read search};
                    allow wazuh_t mysqld_etc_t:file { getattr open read };
                    allow wazuh_t namespace_init_exec_t:file { getattr open read };
                    allow wazuh_t net_conf_t:dir { getattr open read search};
                    allow wazuh_t net_conf_t:file { getattr open read append unlink};
                    allow wazuh_t netcontrol_device_t:chr_file { getattr open read };
                    allow wazuh_t netutils_exec_t:file { getattr open read };
                    allow wazuh_t nfsd_exec_t:file { getattr open read };
                    allow wazuh_t nvram_device_t:chr_file { getattr open read };
                    allow wazuh_t oddjob_mkhomedir_exec_t:file { getattr open read };
                    allow wazuh_t pam_console_exec_t:file { getattr open read };
                    allow wazuh_t pam_timestamp_exec_t:file { getattr open read };
                    allow wazuh_t passwd_exec_t:file { getattr open read };
                    allow wazuh_t pinentry_exec_t:file { getattr open read };
                    allow wazuh_t ping_exec_t:file { getattr open read };
                    allow wazuh_t plymouthd_var_log_t:file { getattr open read };
                    allow wazuh_t policykit_auth_exec_t:file { getattr open read };
                    allow wazuh_t policykit_exec_t:file { getattr open read };
                    allow wazuh_t postfix_etc_t:dir { getattr open read search};
                    allow wazuh_t postfix_map_exec_t:file { getattr open read };
                    allow wazuh_t postfix_master_exec_t:file { getattr open read };
                    allow wazuh_t postfix_postdrop_exec_t:file { getattr open read };
                    allow wazuh_t postfix_postqueue_exec_t:file { getattr open read };
                    allow wazuh_t ppp_device_t:chr_file { getattr open read };
                    allow wazuh_t pppd_etc_t:dir { getattr open read search};
                    allow wazuh_t pppd_exec_t:file { getattr open read };
                    allow wazuh_t proc_t:filesystem { getattr open read };
                    allow wazuh_t pstore_t:dir { getattr open read search};
                    allow wazuh_t pstore_t:filesystem { getattr open read };
                    allow wazuh_t ptmx_t:chr_file { getattr open read write};
                    allow wazuh_t quota_exec_t:file { getattr open read };
                    allow wazuh_t random_device_t:chr_file { getattr open read };
                    allow wazuh_t rdisc_exec_t:file { getattr open read };
                    allow wazuh_t readahead_exec_t:file { getattr open read };
                    allow wazuh_t rpcbind_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t rpcd_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t rpm_exec_t:file { execute getattr open read execute_no_trans ioctl};
                    allow wazuh_t rpm_script_tmp_t:dir { read search};
                    allow wazuh_t rsync_etc_t:file { getattr open read };
                    allow wazuh_t rsync_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t samba_etc_t:dir { getattr open read search};
                    allow wazuh_t scsi_generic_device_t:chr_file { getattr open read };
                    allow wazuh_t selinux_config_t:dir { read search};
                    allow wazuh_t selinux_config_t:file { getattr open read };
                    allow wazuh_t semanage_exec_t:file { getattr open read };
                    allow wazuh_t sendmail_exec_t:file { getattr open read };
                    allow wazuh_t setfiles_exec_t:file { getattr open read };
                    allow wazuh_t setsebool_exec_t:file { getattr open read };
                    allow wazuh_t shadow_t:file { getattr open read };
                    allow wazuh_t showmount_exec_t:file { getattr open read };
                    allow wazuh_t slapd_cert_t:dir { getattr open read search};
                    allow wazuh_t sound_device_t:chr_file { getattr open read };
                    allow wazuh_t ssh_agent_exec_t:file { getattr open read };
                    allow wazuh_t ssh_exec_t:file { getattr open read };
                    allow wazuh_t ssh_keygen_exec_t:file { getattr open read };
                    allow wazuh_t sshd_exec_t:file { execute execute_no_trans getattr open read };
                    allow wazuh_t sshd_key_t:file { getattr open read };
                    allow wazuh_t sshd_keygen_exec_t:file { getattr open read };
                    allow wazuh_t su_exec_t:file { getattr open read };
                    allow wazuh_t sudo_exec_t:file { getattr open read };
                    allow wazuh_t sulogin_exec_t:file { getattr open read };
                    allow wazuh_t sysctl_net_t:dir search;
                    allow wazuh_t sysfs_t:filesystem { getattr open read };
                    allow wazuh_t syslog_conf_t:dir { getattr open read search };
                    allow wazuh_t syslog_conf_t:file { getattr open read ioctl};
                    allow wazuh_t syslogd_exec_t:file { getattr open read };
                    allow wazuh_t system_cron_spool_t:dir { getattr open read search};
                    allow wazuh_t system_cron_spool_t:file { getattr open read ioctl};
                    allow wazuh_t system_dbusd_var_run_t:dir search;
                    allow wazuh_t systemd_bootchart_exec_t:file { getattr open read };
                    allow wazuh_t systemd_hostnamed_exec_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_etc_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_exec_t:file { getattr open read };
                    allow wazuh_t systemd_initctl_exec_t:file { getattr open read };
                    allow wazuh_t systemd_localed_exec_t:file { getattr open read };
                    allow wazuh_t systemd_logind_exec_t:file { getattr open read };
                    allow wazuh_t systemd_machined_exec_t:file { getattr open read };
                    allow wazuh_t systemd_notify_exec_t:file { getattr open read };
                    allow wazuh_t systemd_passwd_agent_exec_t:file { getattr open read };
                    allow wazuh_t systemd_sysctl_exec_t:file { getattr open read };
                    allow wazuh_t systemd_systemctl_exec_t:file { execute getattr execute_no_trans read};
                    allow wazuh_t systemd_timedated_exec_t:file { getattr open read };
                    allow wazuh_t systemd_tmpfiles_exec_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:dir { getattr open read search};
                    allow wazuh_t systemd_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:service { status start};
                    allow wazuh_t tcpd_exec_t:file { getattr read open};
                    allow wazuh_t tcsd_exec_t:file { getattr open read };
                    allow wazuh_t tmpfs_t:dir read;
                    allow wazuh_t tmpfs_t:filesystem { getattr open read };
                    allow wazuh_t traceroute_exec_t:file { getattr open read };
                    allow wazuh_t tty_device_t:chr_file { getattr open read };
                    allow wazuh_t tun_tap_device_t:chr_file { getattr open read };
                    allow wazuh_t tuned_etc_t:dir { getattr open read search};
                    allow wazuh_t tuned_exec_t:file { getattr open read };
                    allow wazuh_t udev_exec_t:file { getattr open read };
                    allow wazuh_t udev_rules_t:dir { getattr open read search};
                    allow wazuh_t udev_rules_t:file { getattr open read };
                    allow wazuh_t uhid_device_t:chr_file { getattr open read };

                    #!!!! WARNING: 'unlabeled_t' is a base type.
                    allow wazuh_t unlabeled_t:file { getattr open read };
                    allow wazuh_t updpwd_exec_t:file { getattr open read };
                    allow wazuh_t usbmon_device_t:chr_file { getattr open read };
                    allow wazuh_t user_fonts_t:dir { getattr open read search };
                    allow wazuh_t user_tmp_t:dir { getattr open read search };
                    allow wazuh_t useradd_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t userhelper_conf_t:dir { getattr open read };
                    allow wazuh_t usernetctl_exec_t:file { getattr open read };

                    #!!!! WARNING: 'var_lib_t' is a base type.
                    allow wazuh_t var_lib_t:dir { getattr open read };
                    allow wazuh_t vfio_device_t:chr_file { getattr open read };
                    allow wazuh_t vhost_device_t:chr_file { getattr open read };
                    allow wazuh_t virt_qemu_ga_exec_t:file { getattr open read };
                    allow wazuh_t virt_qemu_ga_unconfined_exec_t:dir { getattr open read };
                    allow wazuh_t vlock_exec_t:file { getattr open read };
                    allow wazuh_t vmtools_exec_t:file { getattr open read };
                    allow wazuh_t vmtools_unconfined_exec_t:dir { getattr open read search};
                    allow wazuh_t wtmp_t:file read;
                    allow wazuh_t xserver_etc_t:dir { getattr open read };
                    allow wazuh_t xserver_misc_device_t:chr_file { getattr open read };
                    allow wazuh_t NetworkManager_var_lib_t:dir { getattr open read search};
                    allow wazuh_t admin_home_t:file { getattr open read };
                    allow wazuh_t auditd_etc_t:file { getattr open read };
                    allow wazuh_t authconfig_var_lib_t:dir { getattr open read search};
                    allow wazuh_t bootloader_var_lib_t:dir { getattr open read search};
                    allow wazuh_t cgroup_t:filesystem { getattr open read };
                    allow wazuh_t chronyd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t chronyd_var_log_t:dir { getattr open read search};
                    allow wazuh_t cron_log_t:file { getattr open read };
                    allow wazuh_t default_context_t:dir { getattr open read search};
                    allow wazuh_t dhcpc_state_t:dir { getattr open read search};
                    allow wazuh_t dhcpc_state_t:file { getattr open read };
                    allow wazuh_t faillog_t:file { getattr open read };
                    allow wazuh_t gssproxy_var_lib_t:dir { getattr open read search};
                    allow wazuh_t hypervkvp_var_lib_t:dir { getattr open read search};
                    allow wazuh_t init_var_lib_t:dir { getattr open read search};
                    allow wazuh_t lastlog_t:file { getattr open read };
                    allow wazuh_t logrotate_var_lib_t:dir { getattr open read search};
                    allow wazuh_t mail_spool_t:lnk_file { getattr open read };
                    allow wazuh_t policykit_var_lib_t:dir { getattr open read search};
                    allow wazuh_t postfix_data_t:dir { getattr open read search};
                    allow wazuh_t rhsmcertd_log_t:dir { getattr open read search};
                    allow wazuh_t rpcbind_var_lib_t:dir { getattr open read search};
                    allow wazuh_t rpm_log_t:file { getattr open read append};
                    allow wazuh_t samba_log_t:dir { getattr open read search};
                    allow wazuh_t samba_var_t:dir { getattr open read search};
                    allow wazuh_t selinux_login_config_t:dir { getattr open read search};
                    allow wazuh_t semanage_store_t:dir { getattr open read search};
                    allow wazuh_t sysctl_net_t:file { getattr open read };
                    allow wazuh_t sysfs_t:dir read;
                    allow wazuh_t sysfs_t:file {open read};
                    allow wazuh_t syslogd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_etc_rw_t:file { getattr open read };
                    allow wazuh_t NetworkManager_initrc_exec_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_unit_file_t:file { getattr open read };
                    allow wazuh_t auditd_log_t:file { getattr open read };
                    allow wazuh_t auditd_unit_file_t:file { getattr open read };
                    allow wazuh_t auditd_unit_file_t:service { status };
                    allow wazuh_t bluetooth_unit_file_t:file { getattr open read };
                    allow wazuh_t chronyd_unit_file_t:file { getattr open read };
                    allow wazuh_t crond_unit_file_t:file { getattr open read };
                    allow wazuh_t crond_unit_file_t:service { status };
                    allow wazuh_t firewalld_etc_rw_t:file { getattr open read };
                    allow wazuh_t firewalld_unit_file_t:file { getattr open read };
                    allow wazuh_t getty_unit_file_t:file { getattr open read };
                    allow wazuh_t gssproxy_unit_file_t:file { getattr open read };
                    allow wazuh_t hypervvssd_unit_file_t:file { getattr open read };
                    allow wazuh_t modules_object_t:lnk_file { getattr open read };
                    allow wazuh_t nfsd_unit_file_t:file { getattr open read };
                    allow wazuh_t postfix_etc_t:file { getattr open read };
                    allow wazuh_t power_unit_file_t:file { getattr open read };
                    allow wazuh_t pppd_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t pppd_initrc_exec_t:file { getattr open read };
                    allow wazuh_t rdisc_unit_file_t:file { getattr open read };
                    allow wazuh_t rpcd_unit_file_t:file { getattr open read };
                    allow wazuh_t samba_etc_t:file { getattr open read };
                    allow wazuh_t slapd_cert_t:file { getattr open read };
                    allow wazuh_t sshd_keygen_unit_file_t:file { getattr open read };
                    allow wazuh_t sshd_unit_file_t:file { getattr open read };
                    allow wazuh_t system_dbusd_t:unix_stream_socket connectto;
                    allow wazuh_t system_dbusd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t systemd_bootchart_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_machined_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_machined_var_lib_t:dir { getattr open read search};
                    allow wazuh_t systemd_systemctl_exec_t:file { open read };
                    allow wazuh_t systemd_timedated_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:lnk_file { getattr open read };
                    allow wazuh_t systemd_vconsole_unit_file_t:file { getattr open read };
                    allow wazuh_t tcsd_var_lib_t:dir { getattr open read search };
                    allow wazuh_t tuned_etc_t:file { getattr open read };
                    allow wazuh_t tuned_log_t:dir { getattr open read search};
                    allow wazuh_t tuned_rw_etc_t:file { getattr open read };
                    allow wazuh_t user_devpts_t:chr_file { getattr open read write};
                    allow wazuh_t var_lib_nfs_t:dir { getattr open read search};
                    allow wazuh_t var_lib_t:file { getattr open read };
                    allow wazuh_t var_log_t:file { getattr open read ioctl};
                    allow wazuh_t virt_qemu_ga_log_t:dir { getattr open read search};
                    allow wazuh_t vmtools_unit_file_t:file { getattr open read };
                    allow wazuh_t wtmp_t:file { getattr open };
                    allow wazuh_t NetworkManager_initrc_exec_t:file { getattr open read };
                    allow wazuh_t NetworkManager_var_lib_t:file { getattr open read };
                    allow wazuh_t authconfig_var_lib_t:file { getattr open read };
                    allow wazuh_t chronyd_var_lib_t:file { getattr open read };
                    allow wazuh_t default_context_t:file { getattr open read };
                    allow wazuh_t devpts_t:chr_file { getattr open read };
                    allow wazuh_t file_context_t:dir { getattr open read search};
                    allow wazuh_t gssproxy_var_lib_t:sock_file { getattr open read };
                    allow wazuh_t init_var_run_t:dir { getattr open read search };
                    allow wazuh_t logrotate_var_lib_t:file { getattr open read };
                    allow wazuh_t mount_var_run_t:dir { getattr open read write search write};
                    allow wazuh_t postfix_data_t:file { getattr open read };
                    allow wazuh_t rpc_pipefs_t:dir { getattr open read search };
                    allow wazuh_t rpm_var_lib_t:dir { getattr open read search};
                    allow wazuh_t rpm_var_lib_t:file { getattr open read};
                    allow wazuh_t rpm_var_cache_t:dir { getattr open read search};
                    allow wazuh_t rpm_var_cache_t:file { getattr open read};
                    allow wazuh_t self:rawip_socket {bind setopt getopt create open};
                    allow wazuh_t semanage_store_t:file { getattr open read };
                    allow wazuh_t syslogd_var_lib_t:file { getattr open read };
                    allow wazuh_t syslogd_var_run_t:dir { getattr open read search};
                    allow wazuh_t tuned_log_t:file { getattr open read };
                    allow wazuh_t usermodehelper_t:file { getattr open read };
                    allow wazuh_t var_lib_nfs_t:file { getattr open read };
                    allow wazuh_t file_context_t:file { getattr open read };
                    allow wazuh_t init_var_lib_t:file { getattr open read };
                    allow wazuh_t self:netlink_audit_socket {bind setopt getopt create open};
                    allow wazuh_t syslogd_var_run_t:file { getattr open read };
                    allow wazuh_t vmtools_unconfined_exec_t:file { getattr open read };
                    allow wazuh_t var_run_t:dir { getattr open read search write add_name};
                    allow wazuh_t var_run_t:file { getattr open read lock create};
                    allow wazuh_t firewalld_var_log_t:file { getattr open read };

                    #============== Permissions for rootcheck to monitor ports
                    allow wazuh_t afs3_callback_port_t:tcp_socket name_bind;
                    allow wazuh_t afs3_callback_port_t:udp_socket name_bind;
                    allow wazuh_t ibm_dt_2_port_t:tcp_socket name_bind;
                    allow wazuh_t ibm_dt_2_port_t:udp_socket name_bind;
                    allow wazuh_t l2tp_port_t:tcp_socket name_bind;
                    allow wazuh_t l2tp_port_t:udp_socket name_bind;
                    allow wazuh_t i18n_input_port_t:tcp_socket name_bind;
                    allow wazuh_t trivnet1_port_t:tcp_socket name_bind;
                    allow wazuh_t trivnet1_port_t:udp_socket name_bind;
                    allow wazuh_t xinuexpansion3_port_t:tcp_socket name_bind;
                    allow wazuh_t xinuexpansion3_port_t:udp_socket name_bind;
                    allow wazuh_t xinuexpansion4_port_t:tcp_socket name_bind;
                    allow wazuh_t xinuexpansion4_port_t:udp_socket name_bind;
                    allow wazuh_t unreserved_port_t:tcp_socket name_bind;
                    allow wazuh_t unreserved_port_t:udp_socket name_bind;
                    allow wazuh_t agentx_port_t:tcp_socket name_bind;
                    allow wazuh_t agentx_port_t:udp_socket name_bind;
                    allow wazuh_t amanda_port_t:tcp_socket name_bind;
                    allow wazuh_t amanda_port_t:udp_socket name_bind;
                    allow wazuh_t amqp_port_t:tcp_socket name_bind;
                    allow wazuh_t amqp_port_t:udp_socket name_bind;
                    allow wazuh_t aol_port_t:tcp_socket name_bind;
                    allow wazuh_t aol_port_t:udp_socket name_bind;
                    allow wazuh_t apc_port_t:tcp_socket name_bind;
                    allow wazuh_t apc_port_t:udp_socket name_bind;
                    allow wazuh_t apcupsd_port_t:tcp_socket name_bind;
                    allow wazuh_t apcupsd_port_t:udp_socket name_bind;
                    allow wazuh_t asterisk_port_t:tcp_socket name_bind;
                    allow wazuh_t asterisk_port_t:udp_socket name_bind;
                    allow wazuh_t audit_port_t:tcp_socket name_bind;
                    allow wazuh_t auth_port_t:tcp_socket name_bind;
                    allow wazuh_t bacula_port_t:tcp_socket name_bind;
                    allow wazuh_t bacula_port_t:udp_socket name_bind;
                    allow wazuh_t bctp_port_t:tcp_socket name_bind;
                    allow wazuh_t bctp_port_t:udp_socket name_bind;
                    allow wazuh_t bgp_port_t:tcp_socket name_bind;
                    allow wazuh_t bgp_port_t:udp_socket name_bind;
                    allow wazuh_t boinc_port_t:tcp_socket name_bind;
                    allow wazuh_t brlp_port_t:tcp_socket name_bind;
                    allow wazuh_t chronyd_port_t:udp_socket name_bind;
                    allow wazuh_t clamd_port_t:tcp_socket name_bind;
                    allow wazuh_t clockspeed_port_t:udp_socket name_bind;
                    allow wazuh_t cluster_port_t:tcp_socket name_bind;
                    allow wazuh_t cluster_port_t:udp_socket name_bind;
                    allow wazuh_t cma_port_t:tcp_socket name_bind;
                    allow wazuh_t cma_port_t:udp_socket name_bind;
                    allow wazuh_t cobbler_port_t:tcp_socket name_bind;
                    allow wazuh_t collectd_port_t:udp_socket name_bind;
                    allow wazuh_t comsat_port_t:udp_socket name_bind;
                    allow wazuh_t condor_port_t:tcp_socket name_bind;
                    allow wazuh_t condor_port_t:udp_socket name_bind;
                    allow wazuh_t conman_port_t:tcp_socket name_bind;
                    allow wazuh_t conman_port_t:udp_socket name_bind;
                    allow wazuh_t connlcli_port_t:tcp_socket name_bind;
                    allow wazuh_t connlcli_port_t:udp_socket name_bind;
                    allow wazuh_t couchdb_port_t:tcp_socket name_bind;
                    allow wazuh_t couchdb_port_t:udp_socket name_bind;
                    allow wazuh_t ctdb_port_t:tcp_socket name_bind;
                    allow wazuh_t ctdb_port_t:udp_socket name_bind;
                    allow wazuh_t cvs_port_t:tcp_socket name_bind;
                    allow wazuh_t cvs_port_t:udp_socket name_bind;
                    allow wazuh_t cyphesis_port_t:tcp_socket name_bind;
                    allow wazuh_t daap_port_t:tcp_socket name_bind;
                    allow wazuh_t daap_port_t:udp_socket name_bind;
                    allow wazuh_t dbskkd_port_t:tcp_socket name_bind;
                    allow wazuh_t dcc_port_t:udp_socket name_bind;
                    allow wazuh_t dccm_port_t:tcp_socket name_bind;
                    allow wazuh_t dccm_port_t:udp_socket name_bind;
                    allow wazuh_t dhcpc_port_t:tcp_socket name_bind;
                    allow wazuh_t dhcpc_port_t:udp_socket name_bind;
                    allow wazuh_t dhcpd_port_t:tcp_socket name_bind;
                    allow wazuh_t dhcpd_port_t:udp_socket name_bind;
                    allow wazuh_t dict_port_t:tcp_socket name_bind;
                    allow wazuh_t distccd_port_t:tcp_socket name_bind;
                    allow wazuh_t dns_port_t:tcp_socket name_bind;
                    allow wazuh_t dns_port_t:udp_socket name_bind;
                    allow wazuh_t dnssec_port_t:tcp_socket name_bind;
                    allow wazuh_t dogtag_port_t:tcp_socket name_bind;
                    allow wazuh_t echo_port_t:tcp_socket name_bind;
                    allow wazuh_t echo_port_t:udp_socket name_bind;
                    allow wazuh_t efs_port_t:tcp_socket name_bind;
                    allow wazuh_t ephemeral_port_t:tcp_socket name_bind;
                    allow wazuh_t ephemeral_port_t:udp_socket name_bind;
                    allow wazuh_t epmap_port_t:tcp_socket name_bind;
                    allow wazuh_t epmap_port_t:udp_socket name_bind;
                    allow wazuh_t epmd_port_t:tcp_socket name_bind;
                    allow wazuh_t epmd_port_t:udp_socket name_bind;
                    allow wazuh_t fingerd_port_t:tcp_socket name_bind;
                    allow wazuh_t flash_port_t:tcp_socket name_bind;
                    allow wazuh_t flash_port_t:udp_socket name_bind;
                    allow wazuh_t freeipmi_port_t:tcp_socket name_bind;
                    allow wazuh_t freeipmi_port_t:udp_socket name_bind;
                    allow wazuh_t ftp_port_t:tcp_socket name_bind;
                    allow wazuh_t ftp_port_t:udp_socket name_bind;
                    allow wazuh_t gatekeeper_port_t:tcp_socket name_bind;
                    allow wazuh_t gatekeeper_port_t:udp_socket name_bind;
                    allow wazuh_t gdomap_port_t:tcp_socket name_bind;
                    allow wazuh_t gdomap_port_t:udp_socket name_bind;
                    allow wazuh_t geneve_port_t:tcp_socket name_bind;
                    allow wazuh_t giftd_port_t:tcp_socket name_bind;
                    allow wazuh_t git_port_t:tcp_socket name_bind;
                    allow wazuh_t git_port_t:udp_socket name_bind;
                    allow wazuh_t glance_port_t:tcp_socket name_bind;
                    allow wazuh_t glance_port_t:udp_socket name_bind;
                    allow wazuh_t gluster_port_t:tcp_socket name_bind;
                    allow wazuh_t gluster_port_t:udp_socket name_bind;
                    allow wazuh_t gopher_port_t:tcp_socket name_bind;
                    allow wazuh_t gopher_port_t:udp_socket name_bind;
                    allow wazuh_t gpsd_port_t:tcp_socket name_bind;
                    allow wazuh_t hddtemp_port_t:tcp_socket name_bind;
                    allow wazuh_t howl_port_t:tcp_socket name_bind;
                    allow wazuh_t howl_port_t:udp_socket name_bind;
                    allow wazuh_t hplip_port_t:tcp_socket name_bind;
                    allow wazuh_t imaze_port_t:tcp_socket name_bind;
                    allow wazuh_t imaze_port_t:udp_socket name_bind;
                    allow wazuh_t innd_port_t:tcp_socket name_bind;
                    allow wazuh_t intermapper_port_t:tcp_socket name_bind;
                    allow wazuh_t interwise_port_t:tcp_socket name_bind;
                    allow wazuh_t interwise_port_t:udp_socket name_bind;
                    allow wazuh_t ionixnetmon_port_t:tcp_socket name_bind;
                    allow wazuh_t ionixnetmon_port_t:udp_socket name_bind;
                    allow wazuh_t ipmi_port_t:udp_socket name_bind;
                    allow wazuh_t ipp_port_t:tcp_socket name_bind;
                    allow wazuh_t ipp_port_t:udp_socket name_bind;
                    allow wazuh_t ipsecnat_port_t:tcp_socket name_bind;
                    allow wazuh_t ipsecnat_port_t:udp_socket name_bind;
                    allow wazuh_t ircd_port_t:tcp_socket name_bind;
                    allow wazuh_t isakmp_port_t:udp_socket name_bind;
                    allow wazuh_t iscsi_port_t:tcp_socket name_bind;
                    allow wazuh_t isns_port_t:tcp_socket name_bind;
                    allow wazuh_t isns_port_t:udp_socket name_bind;
                    allow wazuh_t jacorb_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_port_t:udp_socket name_bind;
                    allow wazuh_t kprop_port_t:tcp_socket name_bind;
                    allow wazuh_t ktalkd_port_t:udp_socket name_bind;
                    allow wazuh_t kubernetes_port_t:tcp_socket name_bind;
                    allow wazuh_t ldap_port_t:tcp_socket name_bind;
                    allow wazuh_t ldap_port_t:udp_socket name_bind;
                    allow wazuh_t lirc_port_t:tcp_socket name_bind;
                    allow wazuh_t llmnr_port_t:tcp_socket name_bind;
                    allow wazuh_t llmnr_port_t:udp_socket name_bind;
                    allow wazuh_t lltng_port_t:tcp_socket name_bind;
                    allow wazuh_t lmtp_port_t:tcp_socket name_bind;
                    allow wazuh_t lmtp_port_t:udp_socket name_bind;
                    allow wazuh_t luci_port_t:tcp_socket name_bind;
                    allow wazuh_t mail_port_t:tcp_socket name_bind;
                    allow wazuh_t mailbox_port_t:tcp_socket name_bind;
                    allow wazuh_t memcache_port_t:tcp_socket name_bind;
                    allow wazuh_t memcache_port_t:udp_socket name_bind;
                    allow wazuh_t milter_port_t:tcp_socket name_bind;
                    allow wazuh_t mmcc_port_t:tcp_socket name_bind;
                    allow wazuh_t mmcc_port_t:udp_socket name_bind;
                    allow wazuh_t mongod_port_t:tcp_socket name_bind;
                    allow wazuh_t monopd_port_t:tcp_socket name_bind;
                    allow wazuh_t mountd_port_t:tcp_socket name_bind;
                    allow wazuh_t mountd_port_t:udp_socket name_bind;
                    allow wazuh_t mpd_port_t:tcp_socket name_bind;
                    allow wazuh_t msnp_port_t:tcp_socket name_bind;
                    allow wazuh_t msnp_port_t:udp_socket name_bind;
                    allow wazuh_t mssql_port_t:tcp_socket name_bind;
                    allow wazuh_t mssql_port_t:udp_socket name_bind;
                    allow wazuh_t munin_port_t:tcp_socket name_bind;
                    allow wazuh_t munin_port_t:udp_socket name_bind;
                    allow wazuh_t mxi_port_t:tcp_socket name_bind;
                    allow wazuh_t mxi_port_t:udp_socket name_bind;
                    allow wazuh_t mysqld_port_t:tcp_socket name_bind;
                    allow wazuh_t mysqlmanagerd_port_t:tcp_socket name_bind;
                    allow wazuh_t mythtv_port_t:tcp_socket name_bind;
                    allow wazuh_t nessus_port_t:tcp_socket name_bind;
                    allow wazuh_t netport_port_t:tcp_socket name_bind;
                    allow wazuh_t netport_port_t:udp_socket name_bind;
                    allow wazuh_t netsupport_port_t:tcp_socket name_bind;
                    allow wazuh_t netsupport_port_t:udp_socket name_bind;
                    allow wazuh_t neutron_port_t:tcp_socket name_bind;
                    allow wazuh_t nfs_port_t:tcp_socket name_bind;
                    allow wazuh_t nfs_port_t:udp_socket name_bind;
                    allow wazuh_t nmbd_port_t:udp_socket name_bind;
                    allow wazuh_t node_t:tcp_socket node_bind;
                    allow wazuh_t node_t:udp_socket node_bind;
                    allow wazuh_t ntop_port_t:tcp_socket name_bind;
                    allow wazuh_t ntop_port_t:udp_socket name_bind;
                    allow wazuh_t ntp_port_t:udp_socket name_bind;
                    allow wazuh_t ocsp_port_t:tcp_socket name_bind;
                    allow wazuh_t openflow_port_t:tcp_socket name_bind;
                    allow wazuh_t openhpid_port_t:tcp_socket name_bind;
                    allow wazuh_t openhpid_port_t:udp_socket name_bind;
                    allow wazuh_t openvpn_port_t:tcp_socket name_bind;
                    allow wazuh_t openvpn_port_t:udp_socket name_bind;
                    allow wazuh_t openvswitch_port_t:tcp_socket name_bind;
                    allow wazuh_t oracle_port_t:tcp_socket name_bind;
                    allow wazuh_t oracle_port_t:udp_socket name_bind;
                    allow wazuh_t ovsdb_port_t:tcp_socket name_bind;
                    allow wazuh_t pdps_port_t:tcp_socket name_bind;
                    allow wazuh_t pdps_port_t:udp_socket name_bind;
                    allow wazuh_t pgpkeyserver_port_t:tcp_socket name_bind;
                    allow wazuh_t pgpkeyserver_port_t:udp_socket name_bind;
                    allow wazuh_t pingd_port_t:tcp_socket name_bind;
                    allow wazuh_t pop_port_t:tcp_socket name_bind;
                    allow wazuh_t portmap_port_t:tcp_socket name_bind;
                    allow wazuh_t portmap_port_t:udp_socket name_bind;
                    allow wazuh_t postgresql_port_t:tcp_socket name_bind;
                    allow wazuh_t pptp_port_t:tcp_socket name_bind;
                    allow wazuh_t pptp_port_t:udp_socket name_bind;
                    allow wazuh_t prelude_port_t:tcp_socket name_bind;
                    allow wazuh_t prelude_port_t:udp_socket name_bind;
                    allow wazuh_t presence_port_t:tcp_socket name_bind;
                    allow wazuh_t presence_port_t:udp_socket name_bind;
                    allow wazuh_t preupgrade_port_t:tcp_socket name_bind;
                    allow wazuh_t printer_port_t:tcp_socket name_bind;
                    allow wazuh_t prosody_port_t:tcp_socket name_bind;
                    allow wazuh_t ptal_port_t:tcp_socket name_bind;
                    allow wazuh_t pulseaudio_port_t:tcp_socket name_bind;
                    allow wazuh_t pulseaudio_port_t:udp_socket name_bind;
                    allow wazuh_t puppet_port_t:tcp_socket name_bind;
                    allow wazuh_t pxe_port_t:udp_socket name_bind;
                    allow wazuh_t pyzor_port_t:udp_socket name_bind;
                    allow wazuh_t rabbitmq_port_t:tcp_socket name_bind;
                    allow wazuh_t radacct_port_t:tcp_socket name_bind;
                    allow wazuh_t radacct_port_t:udp_socket name_bind;
                    allow wazuh_t radius_port_t:tcp_socket name_bind;
                    allow wazuh_t radius_port_t:udp_socket name_bind;
                    allow wazuh_t radsec_port_t:tcp_socket name_bind;
                    allow wazuh_t razor_port_t:tcp_socket name_bind;
                    allow wazuh_t redis_port_t:tcp_socket name_bind;
                    allow wazuh_t repository_port_t:tcp_socket name_bind;
                    allow wazuh_t reserved_port_t:tcp_socket name_bind;
                    allow wazuh_t reserved_port_t:udp_socket name_bind;
                    allow wazuh_t ricci_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_port_t:udp_socket name_bind;
                    allow wazuh_t rlogin_port_t:tcp_socket name_bind;
                    allow wazuh_t rlogind_port_t:tcp_socket name_bind;
                    allow wazuh_t rndc_port_t:tcp_socket name_bind;
                    allow wazuh_t rndc_port_t:udp_socket name_bind;
                    allow wazuh_t router_port_t:tcp_socket name_bind;
                    allow wazuh_t router_port_t:udp_socket name_bind;
                    allow wazuh_t rsh_port_t:tcp_socket name_bind;
                    allow wazuh_t rsync_port_t:tcp_socket name_bind;
                    allow wazuh_t rsync_port_t:udp_socket name_bind;
                    allow wazuh_t rtsclient_port_t:tcp_socket name_bind;
                    allow wazuh_t rtsp_port_t:tcp_socket name_bind;
                    allow wazuh_t rtsp_port_t:udp_socket name_bind;
                    allow wazuh_t rwho_port_t:udp_socket name_bind;
                    allow wazuh_t salt_port_t:tcp_socket name_bind;
                    allow wazuh_t sap_port_t:tcp_socket name_bind;
                    allow wazuh_t sap_port_t:udp_socket name_bind;
                    allow wazuh_t saphostctrl_port_t:tcp_socket name_bind;
                    allow wazuh_t servistaitsm_port_t:tcp_socket name_bind;
                    allow wazuh_t servistaitsm_port_t:udp_socket name_bind;
                    allow wazuh_t sge_port_t:tcp_socket name_bind;
                    allow wazuh_t shellinaboxd_port_t:tcp_socket name_bind;
                    allow wazuh_t sieve_port_t:tcp_socket name_bind;
                    allow wazuh_t sip_port_t:tcp_socket name_bind;
                    allow wazuh_t sip_port_t:udp_socket name_bind;
                    allow wazuh_t sixxsconfig_port_t:tcp_socket name_bind;
                    allow wazuh_t sixxsconfig_port_t:udp_socket name_bind;
                    allow wazuh_t smbd_port_t:tcp_socket name_bind;
                    allow wazuh_t smtp_port_t:tcp_socket name_bind;
                    allow wazuh_t snmp_port_t:tcp_socket name_bind;
                    allow wazuh_t snmp_port_t:udp_socket name_bind;
                    allow wazuh_t soundd_port_t:tcp_socket name_bind;
                    allow wazuh_t spamd_port_t:tcp_socket name_bind;
                    allow wazuh_t speech_port_t:tcp_socket name_bind;
                    allow wazuh_t squid_port_t:tcp_socket name_bind;
                    allow wazuh_t squid_port_t:udp_socket name_bind;
                    allow wazuh_t ssdp_port_t:tcp_socket name_bind;
                    allow wazuh_t ssdp_port_t:udp_socket name_bind;
                    allow wazuh_t ssh_port_t:tcp_socket name_bind;
                    allow wazuh_t svn_port_t:tcp_socket name_bind;
                    allow wazuh_t svn_port_t:udp_socket name_bind;
                    allow wazuh_t svrloc_port_t:tcp_socket name_bind;
                    allow wazuh_t svrloc_port_t:udp_socket name_bind;
                    allow wazuh_t swat_port_t:tcp_socket name_bind;
                    allow wazuh_t swift_port_t:tcp_socket name_bind;
                    allow wazuh_t syslogd_port_t:tcp_socket name_bind;
                    allow wazuh_t syslogd_port_t:udp_socket name_bind;
                    allow wazuh_t tangd_port_t:tcp_socket name_bind;
                    allow wazuh_t tcs_port_t:tcp_socket name_bind;
                    allow wazuh_t telnetd_port_t:tcp_socket name_bind;
                    allow wazuh_t tftp_port_t:udp_socket name_bind;
                    allow wazuh_t time_port_t:tcp_socket name_bind;
                    allow wazuh_t time_port_t:udp_socket name_bind;
                    allow wazuh_t tor_port_t:tcp_socket name_bind;
                    allow wazuh_t traceroute_port_t:udp_socket name_bind;
                    allow wazuh_t tram_port_t:tcp_socket name_bind;
                    allow wazuh_t transproxy_port_t:tcp_socket name_bind;
                    allow wazuh_t trisoap_port_t:tcp_socket name_bind;
                    allow wazuh_t trisoap_port_t:udp_socket name_bind;
                    allow wazuh_t ups_port_t:tcp_socket name_bind;
                    allow wazuh_t uucpd_port_t:tcp_socket name_bind;
                    allow wazuh_t varnishd_port_t:tcp_socket name_bind;
                    allow wazuh_t virt_port_t:tcp_socket name_bind;
                    allow wazuh_t virt_port_t:udp_socket name_bind;
                    allow wazuh_t vnc_port_t:tcp_socket name_bind;
                    allow wazuh_t wccp_port_t:udp_socket name_bind;
                    allow wazuh_t websm_port_t:tcp_socket name_bind;
                    allow wazuh_t websm_port_t:udp_socket name_bind;
                    allow wazuh_t whois_port_t:tcp_socket name_bind;
                    allow wazuh_t whois_port_t:udp_socket name_bind;
                    allow wazuh_t winshadow_port_t:tcp_socket name_bind;
                    allow wazuh_t winshadow_port_t:udp_socket name_bind;
                    allow wazuh_t wsdapi_port_t:tcp_socket name_bind;
                    allow wazuh_t wsdapi_port_t:udp_socket name_bind;
                    allow wazuh_t wsicopy_port_t:tcp_socket name_bind;
                    allow wazuh_t wsicopy_port_t:udp_socket name_bind;
                    allow wazuh_t xdmcp_port_t:tcp_socket name_bind;
                    allow wazuh_t xdmcp_port_t:udp_socket name_bind;
                    allow wazuh_t xen_port_t:tcp_socket name_bind;
                    allow wazuh_t xfs_port_t:tcp_socket name_bind;
                    allow wazuh_t xserver_port_t:tcp_socket name_bind;
                    allow wazuh_t zabbix_port_t:tcp_socket name_bind;
                    allow wazuh_t zarafa_port_t:tcp_socket name_bind;
                    allow wazuh_t zebra_port_t:tcp_socket name_bind;
                    allow wazuh_t zebra_port_t:udp_socket name_bind;
                    allow wazuh_t zented_port_t:tcp_socket name_bind;
                    allow wazuh_t zented_port_t:udp_socket name_bind;
                    allow wazuh_t zope_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_bos_port_t:udp_socket name_bind;
                    allow wazuh_t afs_fs_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_fs_port_t:udp_socket name_bind;
                    allow wazuh_t afs_ka_port_t:udp_socket name_bind;
                    allow wazuh_t afs_pt_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_pt_port_t:udp_socket name_bind;
                    allow wazuh_t afs_vl_port_t:udp_socket name_bind;
                    allow wazuh_t amavisd_recv_port_t:tcp_socket name_bind;
                    allow wazuh_t amavisd_send_port_t:tcp_socket name_bind;
                    allow wazuh_t apertus_ldp_port_t:tcp_socket name_bind;
                    allow wazuh_t apertus_ldp_port_t:udp_socket name_bind;
                    allow wazuh_t boinc_client_port_t:tcp_socket name_bind;
                    allow wazuh_t boinc_client_port_t:udp_socket name_bind;
                    allow wazuh_t commplex_link_port_t:tcp_socket name_bind;
                    allow wazuh_t commplex_link_port_t:udp_socket name_bind;
                    allow wazuh_t commplex_main_port_t:tcp_socket name_bind;
                    allow wazuh_t commplex_main_port_t:udp_socket name_bind;
                    allow wazuh_t cyrus_imapd_port_t:tcp_socket name_bind;
                    allow wazuh_t dey_keyneg_port_t:tcp_socket name_bind;
                    allow wazuh_t dey_keyneg_port_t:udp_socket name_bind;
                    allow wazuh_t dey_sapi_port_t:tcp_socket name_bind;
                    allow wazuh_t fac_restore_port_t:tcp_socket name_bind;
                    allow wazuh_t fac_restore_port_t:udp_socket name_bind;
                    allow wazuh_t fmpro_internal_port_t:tcp_socket name_bind;
                    allow wazuh_t fmpro_internal_port_t:udp_socket name_bind;
                    allow wazuh_t ftp_data_port_t:tcp_socket name_bind;
                    allow wazuh_t gds_db_port_t:tcp_socket name_bind;
                    allow wazuh_t gds_db_port_t:udp_socket name_bind;
                    allow wazuh_t glance_registry_port_t:tcp_socket name_bind;
                    allow wazuh_t glance_registry_port_t:udp_socket name_bind;
                    allow wazuh_t hadoop_namenode_port_t:tcp_socket name_bind;
                    allow wazuh_t hi_reserved_port_t:tcp_socket name_bind;
                    allow wazuh_t hi_reserved_port_t:udp_socket name_bind;
                    allow wazuh_t http_cache_port_t:tcp_socket name_bind;
                    allow wazuh_t http_cache_port_t:udp_socket name_bind;
                    allow wazuh_t inetd_child_port_t:tcp_socket name_bind;
                    allow wazuh_t inetd_child_port_t:udp_socket name_bind;
                    allow wazuh_t jabber_client_port_t:tcp_socket name_bind;
                    allow wazuh_t jabber_interserver_port_t:tcp_socket name_bind;
                    allow wazuh_t jabber_router_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_debug_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_debug_port_t:udp_socket name_bind;
                    allow wazuh_t jboss_management_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_management_port_t:udp_socket name_bind;
                    allow wazuh_t jboss_messaging_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_admin_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_password_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_password_port_t:udp_socket name_bind;
                    allow wazuh_t lsm_plugin_port_t:tcp_socket name_bind;
                    allow wazuh_t movaz_ssc_port_t:tcp_socket name_bind;
                    allow wazuh_t movaz_ssc_port_t:udp_socket name_bind;
                    allow wazuh_t ms_streaming_port_t:tcp_socket name_bind;
                    allow wazuh_t ms_streaming_port_t:udp_socket name_bind;
                    allow wazuh_t nodejs_debug_port_t:tcp_socket name_bind;
                    allow wazuh_t nodejs_debug_port_t:udp_socket name_bind;
                    allow wazuh_t nsd_control_port_t:tcp_socket name_bind;
                    allow wazuh_t oa_system_port_t:tcp_socket name_bind;
                    allow wazuh_t oa_system_port_t:udp_socket name_bind;
                    allow wazuh_t osapi_compute_port_t:tcp_socket name_bind;
                    allow wazuh_t pegasus_http_port_t:tcp_socket name_bind;
                    allow wazuh_t pegasus_https_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ca_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_kra_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ocsp_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ra_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_tks_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_tps_port_t:tcp_socket name_bind;
                    allow wazuh_t pktcable_cops_port_t:tcp_socket name_bind;
                    allow wazuh_t pktcable_cops_port_t:udp_socket name_bind;
                    allow wazuh_t postfix_policyd_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_modcluster_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_modcluster_port_t:udp_socket name_bind;
                    allow wazuh_t rtp_media_port_t:tcp_socket name_bind;
                    allow wazuh_t rtp_media_port_t:udp_socket name_bind;
                    allow wazuh_t sype_transport_port_t:tcp_socket name_bind;
                    allow wazuh_t sype_transport_port_t:udp_socket name_bind;
                    allow wazuh_t syslog_tls_port_t:tcp_socket name_bind;
                    allow wazuh_t syslog_tls_port_t:udp_socket name_bind;
                    allow wazuh_t us_cli_port_t:tcp_socket name_bind;
                    allow wazuh_t us_cli_port_t:udp_socket name_bind;
                    allow wazuh_t virtual_places_port_t:tcp_socket name_bind;
                    allow wazuh_t virtual_places_port_t:udp_socket name_bind;
                    allow wazuh_t wap_wsp_port_t:tcp_socket name_bind;
                    allow wazuh_t wap_wsp_port_t:udp_socket name_bind;
                    allow wazuh_t xodbc_connect_port_t:tcp_socket name_bind;
                    allow wazuh_t zabbix_agent_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_client_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_election_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_leader_port_t:tcp_socket name_bind;
                    allow wazuh_t embrace_dp_c_port_t:tcp_socket name_bind;
                    allow wazuh_t embrace_dp_c_port_t:udp_socket name_bind;

                    #============== Permissions for modulesd to run
                    allow wazuh_t self:netlink_route_socket {getattr open read create bind nlmsg_read};
                    allow wazuh_t self:netlink_tcpdiag_socket {create getattr setopt bind nlmsg_read};
                    allow wazuh_t sysfs_t:lnk_file read;
                    allow wazuh_t proc_net_t:file { getattr open read };

                    #============== Permissions for execd to run AR
                    allow wazuh_t self:capability { chown dac_override fowner fsetid kill net_bind_service net_raw setgid setuid sys_chroot sys_resource sys_ptrace};
                    allow wazuh_t etc_t:dir { getattr open read search write add_name remove_name};
                    allow sshd_t var_t:file { getattr create open append ioctl lock read setattr write};
                    allow wazuh_t firewalld_t:dbus send_msg;
                    allow firewalld_t wazuh_t:dbus send_msg;
                    allow wazuh_t firewalld_t:dir { getattr open read search };
                    allow wazuh_t firewalld_t:file { open read };
                    allow wazuh_t firewalld_t:process { getattr getpgid getsession signull };
                    allow wazuh_t sshd_net_t:dir { getattr open read search };
                    allow wazuh_t sshd_net_t:file { open read };
                    allow wazuh_t wazuh_tmp_t:dir { getattr open read search write create rmdir};
                    allow wazuh_t http_port_t:tcp_socket {name_bind name_connect write read};

                    #============== Permissions to assign new contexts
                    allow unconfined_t wazuh_var_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_var_t:file {getattr relabelto};
                    allow unconfined_t wazuh_var_t:sock_file {getattr open read relabelto};
                    allow unconfined_t wazuh_lib_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_lib_t:file {getattr relabelto};
                    allow unconfined_t wazuh_etc_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_etc_t:file {getattr relabelto};



        .. group-tab:: Wazuh Agent

            .. collapse:: wazuhT.fc

                .. code-block:: console

                    /var/ossec/active-response                  gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/active-response/bin(/.*)?        gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/agentless(/.*)?                  gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/backup(/.*)?                     gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/bin(/.*)?                        gen_context(system_u:object_r:wazuh_exec_t,s0)
                    /var/ossec/etc(/.*)?                        gen_context(system_u:object_r:wazuh_etc_t,s0)
                    /var/ossec/lib(/.*)?                        gen_context(system_u:object_r:wazuh_lib_t,s0)
                    /var/ossec/logs(/.*)?                       gen_context(system_u:object_r:wazuh_log_t,s0)
                    /var/ossec/queue(/.*)?                      gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/ruleset(/.*)?                    gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/tmp(/.*)?                        gen_context(system_u:object_r:wazuh_tmp_t,s0)
                    /var/ossec/var(/.*)?                        gen_context(system_u:object_r:wazuh_var_t,s0)
                    /var/ossec/wodles(/.*)?                     gen_context(system_u:object_r:wazuh_exec_t,s0)

            .. collapse:: wazuhT.te
                
                .. code-block:: console

                    policy_module(wazuhT,1.0)

                    require {
                    type bin_t;
                    type tmp_t;
                    type unconfined_t;
                    type initrc_t;
                    type unconfined_service_t;
                    type user_home_t;
                    type user_home_dir_t;
                    type user_tmp_t;
                    type insmod_t;
                    role unconfined_r;
                    type system_cronjob_t;
                    type shell_exec_t;
                    type proc_t;
                    type passwd_file_t;
                    type var_t;
                    type cert_t;
                    type node_t;
                    type init_t;
                    type kernel_t;
                    type syslogd_t;
                    type udev_t;
                    type auditd_t;
                    type systemd_logind_t;
                    type policykit_t;
                    type system_dbusd_t;
                    type unconfined_t;
                    type rpcbind_t;
                    type NetworkManager_t;
                    type tuned_t;
                    type dhcpc_t;
                    type chronyd_t;
                    type postfix_master_t;
                    type postfix_pickup_t;
                    type sshd_t;
                    type crond_t;
                    type getty_t;
                    type postfix_qmgr_t;
                    type gssproxy_t;
                    type fs_t;
                    type unreserved_port_t;
                    type gluster_port_t;
                    type vfio_device_t;
                    type setsebool_exec_t;
                    type netutils_exec_t;
                    type unlabeled_t;
                    type load_policy_exec_t;
                    type agentx_port_t;
                    type msnp_port_t;
                    type rabbitmq_port_t;
                    type syslog_tls_port_t;
                    type systemd_hwdb_exec_t;
                    type rndc_port_t;
                    type sound_device_t;
                    type ocsp_port_t;
                    type rsync_exec_t;
                    type nessus_port_t;
                    type openvpn_port_t;
                    type dhcpc_port_t;
                    type reserved_port_t;
                    type pdps_port_t;
                    type xserver_etc_t;
                    type pki_tps_port_t;
                    type netsupport_port_t;
                    type jacorb_port_t;
                    type getty_t;
                    type uucpd_port_t;
                    type pxe_port_t;
                    type wazuh_t;
                    type sip_port_t;
                    type i18n_input_port_t;
                    type virt_qemu_ga_exec_t;
                    type kprop_port_t;
                    type ipmi_port_t;
                    type gpsd_port_t;
                    type dhcpd_port_t;
                    type postgresql_port_t;
                    type fusermount_exec_t;
                    type speech_port_t;
                    type sysctl_net_t;
                    type brlp_port_t;
                    type kerberos_port_t;
                    type servistaitsm_port_t;
                    type dict_port_t;
                    type syslog_conf_t;
                    type systemd_unit_file_t;
                    type router_port_t;
                    type jabber_interserver_port_t;
                    type tcsd_exec_t;
                    type ipsecnat_port_t;
                    type sulogin_exec_t;
                    type pinentry_exec_t;
                    type systemd_notify_exec_t;
                    type condor_port_t;
                    type hwclock_exec_t;
                    type oa_system_port_t;
                    type svn_port_t;
                    type lmtp_port_t;
                    type xodbc_connect_port_t;
                    type commplex_main_port_t;
                    type auditd_exec_t;
                    type sieve_port_t;
                    type tram_port_t;
                    type crash_device_t;
                    type chronyd_port_t;
                    type virt_port_t;
                    type flash_port_t;
                    type cgroup_t;
                    type loadkeys_exec_t;
                    type asterisk_port_t;
                    type printer_port_t;
                    type initrc_exec_t;
                    type hugetlbfs_t;
                    type ms_streaming_port_t;
                    type intermapper_port_t;
                    type imaze_port_t;
                    type systemd_hostnamed_exec_t;
                    type jboss_messaging_port_t;
                    type nfsd_exec_t;
                    type rwho_port_t;
                    type winshadow_port_t;
                    type sixxsconfig_port_t;
                    type usbmon_device_t;
                    type ptal_port_t;
                    type debuginfo_exec_t;
                    type rpcd_exec_t;
                    type chkpwd_exec_t;
                    type updpwd_exec_t;
                    type gopher_port_t;
                    type wccp_port_t;
                    type systemd_timedated_exec_t;
                    type tangd_port_t;
                    type git_port_t;
                    type varnishd_port_t;
                    type lsm_plugin_port_t;
                    type mmcc_port_t;
                    type dmesg_exec_t;
                    type ntp_port_t;
                    type sysfs_t;
                    type hostname_exec_t;
                    type system_cron_spool_t;
                    type sshd_key_t;
                    type zope_port_t;
                    type pppd_exec_t;
                    type adjtime_t;
                    type chronyc_exec_t;
                    type fac_restore_port_t;
                    type transproxy_port_t;
                    type rsh_port_t;
                    type l2tp_port_t;
                    type systemd_logind_exec_t;
                    type su_exec_t;
                    type wsicopy_port_t;
                    type ibm_dt_2_port_t;
                    type apcupsd_port_t;
                    type zabbix_port_t;
                    type dhcpc_exec_t;
                    type framebuf_device_t;
                    type auditctl_exec_t;
                    type kerberos_admin_port_t;
                    type iptables_exec_t;
                    type setfiles_exec_t;
                    type audit_port_t;
                    type ftp_data_port_t;
                    type random_device_t;
                    type scsi_generic_device_t;
                    type hddtemp_port_t;
                    type mountd_port_t;
                    type jboss_debug_port_t;
                    type sge_port_t;
                    type ricci_port_t;
                    type ifconfig_exec_t;
                    type monopd_port_t;
                    type dey_keyneg_port_t;
                    type zebra_port_t;
                    type zented_port_t;
                    type namespace_init_exec_t;
                    type shellinaboxd_port_t;
                    type osapi_compute_port_t;
                    type lvm_exec_t;
                    type rlogind_port_t;
                    type mail_spool_t;
                    type pki_tks_port_t;
                    type mxi_port_t;
                    type vmtools_unconfined_exec_t;
                    type dhcp_etc_t;
                    type logrotate_exec_t;
                    type oddjob_mkhomedir_exec_t;
                    type firewalld_etc_rw_t;
                    type virtual_places_port_t;
                    type mongod_port_t;
                    type bgp_port_t;
                    type cyphesis_port_t;
                    type afs3_callback_port_t;
                    type hi_reserved_port_t;
                    type ssh_exec_t;
                    type afs_pt_port_t;
                    type selinux_config_t;
                    type dri_device_t;
                    type virt_qemu_ga_unconfined_exec_t;
                    type radius_port_t;
                    type pyzor_port_t;
                    type gpg_agent_exec_t;
                    type memory_device_t;
                    type firewalld_exec_t;
                    type bctp_port_t;
                    type pki_ocsp_port_t;
                    type fingerd_port_t;
                    type comsat_port_t;
                    type nvram_device_t;
                    type whois_port_t;
                    type prelude_port_t;
                    type rtsp_port_t;
                    type svrloc_port_t;
                    type squid_port_t;
                    type sshd_exec_t;
                    type mouse_device_t;
                    type zookeeper_election_port_t;
                    type device_t;
                    type fixed_disk_device_t;
                    type boinc_port_t;
                    type razor_port_t;
                    type ptmx_t;
                    type ssh_agent_exec_t;
                    type telnetd_port_t;
                    type isns_port_t;
                    type etc_aliases_t;
                    type NetworkManager_etc_t;
                    type fmpro_internal_port_t;
                    type rsync_etc_t;
                    type dey_sapi_port_t;
                    type jabber_router_port_t;
                    type distccd_port_t;
                    type postfix_policyd_port_t;
                    type useradd_exec_t;
                    type sudo_exec_t;
                    type iscsi_port_t;
                    type mysqlmanagerd_port_t;
                    type crond_exec_t;
                    type bootloader_etc_t;
                    type postfix_postqueue_exec_t;
                    type postfix_map_exec_t;
                    type admin_home_t;
                    type syslogd_port_t;
                    type gatekeeper_port_t;
                    type traceroute_exec_t;
                    type lltng_port_t;
                    type prosody_port_t;
                    type snmp_port_t;
                    type semanage_exec_t;
                    type howl_port_t;
                    type journalctl_exec_t;
                    type lvm_control_t;
                    type rsync_port_t;
                    type tuned_etc_t;
                    type dmidecode_exec_t;
                    type wsdapi_port_t;
                    type pegasus_http_port_t;
                    type ktalkd_port_t;
                    type pulseaudio_port_t;
                    type usernetctl_exec_t;
                    type pppd_etc_t;
                    type zarafa_port_t;
                    type syslogd_exec_t;
                    type showmount_exec_t;
                    type presence_port_t;
                    type ssh_port_t;
                    type nsd_control_port_t;
                    type checkpolicy_exec_t;
                    type proc_net_t;
                    type postfix_master_exec_t;
                    type sendmail_exec_t;
                    type afs_vl_port_t;
                    type salt_port_t;
                    type pstore_t;
                    type cluster_port_t;
                    type pptp_port_t;
                    type mount_exec_t;
                    type lirc_port_t;
                    type xinuexpansion3_port_t;
                    type var_lib_t;
                    type exports_t;
                    type ups_port_t;
                    type luci_port_t;
                    type user_tmp_t;
                    type movaz_ssc_port_t;
                    type games_exec_t;
                    type insmod_exec_t;
                    type dns_port_t;
                    type gssd_exec_t;
                    type udev_exec_t;
                    type console_device_t;
                    type trisoap_port_t;
                    type tun_tap_device_t;
                    type dbusd_etc_t;
                    type netport_port_t;
                    type mpd_port_t;
                    type pki_ca_port_t;
                    type xinuexpansion4_port_t;
                    type autofs_device_t;
                    type ionixnetmon_port_t;
                    type gssproxy_exec_t;
                    type epmd_port_t;
                    type samba_etc_t;
                    type fuse_device_t;
                    type udev_rules_t;
                    type sshd_keygen_exec_t;
                    type chronyd_exec_t;
                    type neutron_port_t;
                    type tcs_port_t;
                    type websm_port_t;
                    type zabbix_agent_port_t;
                    type redis_port_t;
                    type anacron_exec_t;
                    type mssql_port_t;
                    type auditd_log_t;
                    type conman_port_t;
                    type afs_fs_port_t;
                    type spamd_port_t;
                    type cvs_port_t;
                    type tor_port_t;
                    type userhelper_conf_t;
                    type systemd_systemctl_exec_t;
                    type us_cli_port_t;
                    type vnc_port_t;
                    type tftp_port_t;
                    type http_cache_port_t;
                    type tuned_exec_t;
                    type cma_port_t;
                    type systemd_initctl_exec_t;
                    type rpcbind_exec_t;
                    type passwd_exec_t;
                    type amqp_port_t;
                    type openhpid_port_t;
                    type kubernetes_port_t;
                    type mysqld_port_t;
                    type crack_exec_t;
                    type embrace_dp_c_port_t;
                    type systemd_passwd_agent_exec_t;
                    type modules_object_t;
                    type netcontrol_device_t;
                    type boinc_client_port_t;
                    type system_dbusd_var_run_t;
                    type crontab_exec_t;
                    type ricci_modcluster_port_t;
                    type loop_control_device_t;
                    type NetworkManager_exec_t;
                    type event_device_t;
                    type amanda_port_t;
                    type rpm_script_tmp_t;
                    type bootloader_exec_t;
                    type ntop_port_t;
                    type pktcable_cops_port_t;
                    type trivnet1_port_t;
                    type smbd_port_t;
                    type gds_db_port_t;
                    type amavisd_send_port_t;
                    type hadoop_namenode_port_t;
                    type xen_port_t;
                    type time_port_t;
                    type krb5_conf_t;
                    type login_exec_t;
                    type tcpd_exec_t;
                    type ldconfig_exec_t;
                    type echo_port_t;
                    type sype_transport_port_t;
                    type devlog_t;
                    type soundd_port_t;
                    type ssdp_port_t;
                    type oracle_port_t;
                    type dcc_port_t;
                    type epmap_port_t;
                    type postfix_etc_t;
                    type net_conf_t;
                    type afs_ka_port_t;
                    type llmnr_port_t;
                    type cobbler_port_t;
                    type hypervvssd_exec_t;
                    type inetd_child_port_t;
                    type dbusd_exec_t;
                    type swift_port_t;
                    type mailbox_port_t;
                    type pam_console_exec_t;
                    type xfs_port_t;
                    type ovsdb_port_t;
                    type zookeeper_client_port_t;
                    type glance_port_t;
                    type games_data_t;
                    type pki_kra_port_t;
                    type memcache_port_t;
                    type systemd_tmpfiles_exec_t;
                    type rtsclient_port_t;
                    type radacct_port_t;
                    type openvswitch_port_t;
                    type vmtools_exec_t;
                    type clock_device_t;
                    type ipp_port_t;
                    type mdadm_exec_t;
                    type nodejs_debug_port_t;
                    type clamd_port_t;
                    type mythtv_port_t;
                    type aol_port_t;
                    type swat_port_t;
                    type dogtag_port_t;
                    type uhid_device_t;
                    type pegasus_https_port_t;
                    type giftd_port_t;
                    type pop_port_t;
                    type cyrus_imapd_port_t;
                    type xdmcp_port_t;
                    type hplip_port_t;
                    type pki_ra_port_t;
                    type dnssec_port_t;
                    type wap_wsp_port_t;
                    type systemd_localed_exec_t;
                    type init_exec_t;
                    type systemd_sysctl_exec_t;
                    type mail_port_t;
                    type pgpkeyserver_port_t;
                    type modules_conf_t;
                    type chfn_exec_t;
                    type afs_bos_port_t;
                    type systemd_bootchart_exec_t;
                    type traceroute_port_t;
                    type geneve_port_t;
                    type ppp_device_t;
                    type efs_port_t;
                    type irqbalance_exec_t;
                    type ssh_keygen_exec_t;
                    type cupsd_rw_etc_t;
                    type dbskkd_port_t;
                    type xserver_misc_device_t;
                    type auth_port_t;
                    type chronyd_keys_t;
                    type rpm_exec_t;
                    type tty_device_t;
                    type policykit_exec_t;
                    type openflow_port_t;
                    type user_fonts_t;
                    type ping_exec_t;
                    type proc_t;
                    type readahead_exec_t;
                    type jboss_management_port_t;
                    type commplex_link_port_t;
                    type getty_exec_t;
                    type pingd_port_t;
                    type devpts_t;
                    type zookeeper_leader_port_t;
                    type interwise_port_t;
                    type vhost_device_t;
                    type hostname_etc_t;
                    type munin_port_t;
                    type ftp_port_t;
                    type quota_exec_t;
                    type repository_port_t;
                    type groupadd_exec_t;
                    type pam_timestamp_exec_t;
                    type sap_port_t;
                    type apertus_ldp_port_t;
                    type ctdb_port_t;
                    type rdisc_exec_t;
                    type freeipmi_port_t;
                    type ephemeral_port_t;
                    type innd_port_t;
                    type postfix_postdrop_exec_t;
                    type wtmp_t;
                    type clockspeed_port_t;
                    type smtp_port_t;
                    type dccm_port_t;
                    type ldap_port_t;
                    type kerberos_password_port_t;
                    type configfs_t;
                    type saphostctrl_port_t;
                    type admin_passwd_exec_t;
                    type apm_bios_t;
                    type isakmp_port_t;
                    type apc_port_t;
                    type audisp_exec_t;
                    type policykit_auth_exec_t;
                    type collectd_port_t;
                    type puppet_port_t;
                    type vlock_exec_t;
                    type auditd_etc_t;
                    type radsec_port_t;
                    type fsadm_exec_t;
                    type amavisd_recv_port_t;
                    type xserver_port_t;
                    type milter_port_t;
                    type gdomap_port_t;
                    type couchdb_port_t;
                    type var_log_t;
                    type rtp_media_port_t;
                    type kmsg_device_t;
                    type mysqld_etc_t;
                    type preupgrade_port_t;
                    type gpg_exec_t;
                    type connlcli_port_t;
                    type http_port_t;
                    type shadow_t;
                    type portmap_port_t;
                    type mandb_exec_t;
                    type systemd_machined_exec_t;
                    type cpu_device_t;
                    type jabber_client_port_t;
                    type ircd_port_t;
                    type hypervkvp_exec_t;
                    type nfs_port_t;
                    type daap_port_t;
                    type nmbd_port_t;
                    type blkmapd_exec_t;
                    type rlogin_port_t;
                    type systemd_hwdb_etc_t;
                    type bacula_port_t;
                    type tmpfs_t;
                    type slapd_cert_t;
                    type glance_registry_port_t;
                    type NetworkManager_var_lib_t;
                    type authconfig_var_lib_t;
                    type bootloader_var_lib_t;
                    type chronyd_var_lib_t;
                    type chronyd_var_log_t;
                    type cron_log_t;
                    type default_context_t;
                    type dhcpc_state_t;
                    type faillog_t;
                    type gssproxy_var_lib_t;
                    type hypervkvp_var_lib_t;
                    type init_var_lib_t;
                    type lastlog_t;
                    type logrotate_var_lib_t;
                    type policykit_var_lib_t;
                    type postfix_data_t;
                    type rhsmcertd_log_t;
                    type rpcbind_var_lib_t;
                    type rpm_log_t;
                    type samba_log_t;
                    type samba_var_t;
                    type selinux_login_config_t;
                    type semanage_store_t;
                    type syslogd_var_lib_t;
                    type NetworkManager_etc_rw_t;
                    type NetworkManager_initrc_exec_t;
                    type NetworkManager_unit_file_t;
                    type auditd_unit_file_t;
                    type bluetooth_unit_file_t;
                    type chronyd_unit_file_t;
                    type crond_unit_file_t;
                    type firewalld_unit_file_t;
                    type getty_unit_file_t;
                    type gssproxy_unit_file_t;
                    type hypervvssd_unit_file_t;
                    type nfsd_unit_file_t;
                    type power_unit_file_t;
                    type pppd_etc_rw_t;
                    type pppd_initrc_exec_t;
                    type rdisc_unit_file_t;
                    type rpcd_unit_file_t;
                    type sshd_keygen_unit_file_t;
                    type sshd_unit_file_t;
                    type system_dbusd_var_lib_t;
                    type systemd_bootchart_unit_file_t;
                    type systemd_hwdb_unit_file_t;
                    type systemd_machined_unit_file_t;
                    type systemd_machined_var_lib_t;
                    type systemd_timedated_unit_file_t;
                    type systemd_vconsole_unit_file_t;
                    type tcsd_var_lib_t;
                    type tuned_log_t;
                    type tuned_rw_etc_t;
                    type user_devpts_t;
                    type var_lib_nfs_t;
                    type virt_qemu_ga_log_t;
                    type vmtools_unit_file_t;
                    type file_context_t;
                    type init_var_run_t;
                    type mount_var_run_t;
                    type rpc_pipefs_t;
                    type rpm_var_lib_t;
                    type syslogd_var_run_t;
                    type usermodehelper_t;
                    type var_run_t;
                    type etc_t;
                    type system_map_t;
                    type security_t;
                    type user_cron_spool_t;
                    type rpm_var_cache_t;
                    type firewalld_var_log_t;
                    type firewalld_t;
                    type sshd_net_t;
                    type irqbalance_t;
                    type local_login_t;
                    type user_tty_device_t;
                    type plymouthd_var_log_t;
                    type home_cert_t;
                    role system_r;
                    class process { transition getattr getpgid getsession setrlimit setsched signull open read};
                    class fifo_file { getattr open read };
                    class rawip_socket {setopt open};
                    class netlink_route_socket {bind setopt create open};
                    class netlink_audit_socket {bind setopt create open};
                    class lnk_file {getattr open read};
                    class file { getattr open read execute getattr read};
                    class dir { getattr open read search };
                    class tcp_socket { bind connect create getopt listen name_bind name_connect node_bind setopt };
                    class capability { chown dac_override fowner fsetid kill net_bind_service net_raw setgid setuid sys_chroot sys_resource sys_ptrace};
                    class unix_dgram_socket { read write create ioctl sendto bind getopt connect};
                    class chr_file { getattr open read };
                    class netlink_tcpdiag_socket {create getattr setopt bind nlmsg_read};
                    class filesystem { getattr open read };
                    class sock_file { getattr open read };
                    class blk_file { getattr open read };
                    class udp_socket name_bind;
                    class unix_stream_socket {connectto ioctl getattr};
                    class dbus send_msg;
                    }

                    # Private type declarations
                    type wazuh_t;
                    type wazuh_exec_t;
                    type wazuh_etc_t;
                    type wazuh_lib_t;
                    type wazuh_log_t;
                    type wazuh_tmp_t;
                    type wazuh_var_t;

                    # ports label
                    type wazuh_port_t;
                    corenet_port(wazuh_port_t)

                    # domain_type macro specifies the type wazuh_t to be a domain.
                    domain_type(wazuh_t)

                    # domain_entry_file specifies an entry point to the wazuh_t domain for the executable file of type wazuh_exec_t.
                    domain_entry_file(wazuh_t, wazuh_exec_t)

                    # logging_log_file macro makes wazuh_log_t become the type of log file with the necessary groups and rules
                    logging_log_file(wazuh_log_t)

                    # allow domain wazuh_t to manipulate log files
                    allow wazuh_t wazuh_log_t:file append_file_perms;

                    # files_tmp_file takes the type of wazuh_tmp_t to the necessary groups so that it becomes the type of temp file
                    files_tmp_file(wazuh_tmp_t)

                    # allow the wazuh_t domain write privileges into the tmp_t labeled directory, but with an automatic file transition towards wazuh_tmp_t for every file written
                    files_tmp_filetrans(wazuh_t,wazuh_tmp_t,file)

                    # allow domain wazuh_t to manipulate tmp files
                    allow wazuh_t wazuh_tmp_t:file manage_file_perms;

                    #============== Allow transition
                    role unconfined_r types wazuh_t;
                    role system_r types wazuh_t;

                    allow wazuh_t bin_t : file { execute read getattr };
                    allow unconfined_t wazuh_t : process transition;
                    allow initrc_t wazuh_t : process transition;
                    allow unconfined_service_t wazuh_t : process transition;
                    allow unconfined_t wazuh_exec_t : file { execute read getattr };
                    allow initrc_t wazuh_exec_t : file { execute read getattr };
                    allow unconfined_service_t wazuh_exec_t : file { execute read getattr };
                    allow wazuh_t wazuh_exec_t : file entrypoint;

                    type_transition unconfined_t wazuh_exec_t : process wazuh_t;
                    type_transition initrc_t wazuh_exec_t : process wazuh_t;
                    type_transition unconfined_service_t wazuh_exec_t : process wazuh_t;

                    #============== Permissions for wazuh-control to run wazuh
                    allow wazuh_t shell_exec_t:file { execute execute_no_trans };
                    allow wazuh_t bin_t:file execute_no_trans;
                    allow wazuh_t proc_t:file { getattr open read ioctl};
                    allow wazuh_t passwd_file_t:file { getattr ioctl open read };

                    allow wazuh_t wazuh_var_t:dir { create rmdir open add_name read remove_name write getattr setattr search};
                    allow wazuh_t wazuh_var_t:file { create getattr open read append rename setattr unlink write ioctl lock};
                    allow wazuh_t wazuh_exec_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_exec_t:file { create getattr open read append rename setattr link unlink write ioctl lock execute execute_no_trans};
                    allow wazuh_t wazuh_log_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_log_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_etc_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_etc_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_tmp_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_tmp_t:file { create getattr open read append rename setattr link unlink write ioctl lock};
                    allow wazuh_t wazuh_lib_t:dir { create rmdir open getattr add_name read remove_name write setattr search};
                    allow wazuh_t wazuh_lib_t:file { getattr open read map execute};
                    allow wazuh_t wazuh_var_t:filesystem { associate};
                    allow wazuh_var_t fs_t:filesystem { associate};
                    allow wazuh_etc_t fs_t:filesystem { associate};

                    #============== Permissions to read /proc
                    allow wazuh_t proc_t:dir read;
                    allow wazuh_t init_t:dir { getattr open read search };
                    allow wazuh_t init_t:file { getattr open read };
                    allow wazuh_t init_t:lnk_file read;
                    allow wazuh_t init_t:process { getattr getpgid getsession };
                    allow wazuh_t init_t:unix_stream_socket {connectto ioctl getattr};
                    allow wazuh_t init_t:system { status };
                    allow wazuh_t init_t:service { status };
                    allow wazuh_t irqbalance_t:dir { getattr open read search };
                    allow wazuh_t irqbalance_t:file { open read };
                    allow wazuh_t local_login_t:dir { getattr open read search };
                    allow wazuh_t local_login_t:file { open read };
                    allow wazuh_t kernel_t:dir { getattr open read search };
                    allow wazuh_t kernel_t:file { open read };
                    allow wazuh_t kernel_t:process { getattr getpgid getsession signull };
                    allow wazuh_t kernel_t:unix_dgram_socket sendto;
                    allow wazuh_t kernel_t:system module_request;
                    allow wazuh_t syslogd_t:dir { getattr open read search };
                    allow wazuh_t syslogd_t:file { getattr open read };
                    allow wazuh_t syslogd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t udev_t:dir { getattr open read search };
                    allow wazuh_t udev_t:file { open read };
                    allow wazuh_t udev_t:process { getattr getpgid getsession signull };
                    allow wazuh_t auditd_t:dir { getattr open read search };
                    allow wazuh_t auditd_t:file { getattr open read };
                    allow wazuh_t auditd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t systemd_logind_t:dir { getattr open read search };
                    allow wazuh_t systemd_logind_t:file { open read };
                    allow wazuh_t systemd_logind_t:process { getattr getpgid getsession signull };
                    allow wazuh_t policykit_t:dir { getattr open read search };
                    allow wazuh_t policykit_t:file { open read };
                    allow wazuh_t policykit_t:process { getattr getpgid getsession signull };
                    allow wazuh_t system_dbusd_t:dir { getattr open read search };
                    allow wazuh_t system_dbusd_t:file { open read };
                    allow wazuh_t system_dbusd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t system_dbusd_t:dbus send_msg;
                    allow wazuh_t NetworkManager_t:dir { getattr open read search };
                    allow wazuh_t NetworkManager_t:file { open read };
                    allow wazuh_t NetworkManager_t:process { getattr getpgid getsession signull };
                    allow wazuh_t chronyd_t:dir { getattr open read search };
                    allow wazuh_t chronyd_t:file { open read };
                    allow wazuh_t chronyd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t crond_t:dir { getattr open read search };
                    allow wazuh_t crond_t:file { getattr open read };
                    allow wazuh_t crond_t:process { getattr getpgid getsession signull };
                    allow wazuh_t dhcpc_t:dir { getattr open read search };
                    allow wazuh_t dhcpc_t:file { open read };
                    allow wazuh_t dhcpc_t:process { getattr getpgid getsession signull };
                    allow wazuh_t getty_t:dir { getattr open read search };
                    allow wazuh_t getty_t:file { open read };
                    allow wazuh_t getty_t:process { getattr getpgid getsession signull };
                    allow wazuh_t gssproxy_t:dir { getattr open read search };
                    allow wazuh_t gssproxy_t:file { open read };
                    allow wazuh_t gssproxy_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_master_t:dir { getattr open read search };
                    allow wazuh_t postfix_master_t:file { open read };
                    allow wazuh_t postfix_master_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_pickup_t:dir { getattr open read search };
                    allow wazuh_t postfix_pickup_t:file { open read };
                    allow wazuh_t postfix_pickup_t:process { getattr getpgid getsession signull };
                    allow wazuh_t postfix_qmgr_t:dir { getattr open read search };
                    allow wazuh_t postfix_qmgr_t:file { open read };
                    allow wazuh_t postfix_qmgr_t:process { getattr getpgid getsession signull };
                    allow wazuh_t rpcbind_t:dir { getattr open read search };
                    allow wazuh_t rpcbind_t:file { open read };
                    allow wazuh_t rpcbind_t:process { getattr getpgid getsession signull };
                    allow wazuh_t sshd_t:dir { getattr open read search };
                    allow wazuh_t sshd_t:file { open read };
                    allow wazuh_t sshd_t:process { getattr getpgid getsession signull };
                    allow wazuh_t tuned_t:dir { getattr open read search };
                    allow wazuh_t tuned_t:file { open read };
                    allow wazuh_t tuned_t:process { getattr getpgid getsession signull };
                    allow wazuh_t unconfined_service_t:dir { getattr open read search };
                    allow wazuh_t unconfined_service_t:file { open read };
                    allow wazuh_t unconfined_service_t:process { getattr getpgid getsession signull };
                    allow wazuh_t unconfined_t:dir { getattr open read search };
                    allow wazuh_t unconfined_t:file { open read };
                    allow wazuh_t unconfined_t:lnk_file read;
                    allow wazuh_t unconfined_t:process { getattr getpgid getsession signull };

                    #============== Permissions for agentd to use sockets
                    allow wazuh_t wazuh_var_t:sock_file { read write getattr create setattr unlink} ;
                    allow wazuh_t wazuh_t:unix_stream_socket {connectto ioctl};
                    allow wazuh_t wazuh_port_t:tcp_socket {name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:tcp_socket {accept bind name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_port_t:udp_socket {name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:udp_socket {accept name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
                    allow wazuh_t wazuh_t:unix_dgram_socket { read write create ioctl sendto bind getopt connect};
                    allow wazuh_t self:tcp_socket { bind connect create getopt listen setopt };
                    allow wazuh_t self:udp_socket { bind connect create getattr ioctl setopt };
                    allow wazuh_t self:process { getattr getpgid getsession setrlimit setsched };

                    #============== Permissions for logcollector to read logs
                    allow wazuh_t auditd_log_t:dir { getattr open read search};
                    allow wazuh_t var_log_t:dir read;

                    #============== Permissions for syscheckd to monitor files and directories
                    allow wazuh_t var_t:dir { getattr open read search};
                    allow wazuh_t var_t:file { getattr open read };
                    allow wazuh_t system_map_t:file { getattr open read };
                    allow wazuh_t fs_t:filesystem { getattr open read };
                    allow wazuh_t NetworkManager_etc_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_exec_t:file { getattr open read };
                    allow wazuh_t adjtime_t:file { getattr open read };
                    allow wazuh_t admin_home_t:dir read;
                    allow wazuh_t admin_passwd_exec_t:file { getattr open read };
                    allow wazuh_t anacron_exec_t:file { getattr open read };
                    allow wazuh_t apm_bios_t:chr_file { getattr open read };
                    allow wazuh_t audisp_exec_t:file { getattr open read };
                    allow wazuh_t auditctl_exec_t:file { getattr open read };
                    allow wazuh_t auditd_etc_t:dir { getattr open read search};
                    allow wazuh_t auditd_exec_t:file { getattr open read };
                    allow wazuh_t autofs_device_t:chr_file { getattr open read };
                    allow wazuh_t blkmapd_exec_t:file { getattr open read };
                    allow wazuh_t bootloader_etc_t:file { getattr open read };
                    allow wazuh_t bootloader_exec_t:file { getattr open read };
                    allow wazuh_t cert_t:dir { getattr open read search write create add_name remove_name rmdir};
                    allow wazuh_t cert_t:file { getattr open read lock write};
                    allow wazuh_t cert_t:lnk_file { getattr open read };
                    allow wazuh_t cgroup_t:dir { getattr open search read};
                    allow wazuh_t cgroup_t:file { getattr open read};
                    allow wazuh_t checkpolicy_exec_t:file { getattr open read };
                    allow wazuh_t chfn_exec_t:file { getattr read open};
                    allow wazuh_t chkpwd_exec_t:file { getattr open read };
                    allow wazuh_t chronyc_exec_t:file { getattr open read };
                    allow wazuh_t chronyd_exec_t:file { getattr open read };
                    allow wazuh_t chronyd_keys_t:file { getattr open read };
                    allow wazuh_t clock_device_t:chr_file { getattr open read };
                    allow wazuh_t user_tty_device_t:chr_file { getattr open read };
                    allow wazuh_t irqbalance_t:process { signull getsession getpgid getattr};
                    allow wazuh_t local_login_t:process { signull getsession getpgid getattr};
                    allow wazuh_t configfs_t:dir { getattr open read search};
                    allow wazuh_t configfs_t:filesystem { getattr open read };
                    allow wazuh_t console_device_t:chr_file { getattr open read };
                    allow wazuh_t cpu_device_t:chr_file { getattr open read };
                    allow wazuh_t crack_exec_t:file { getattr open read };
                    allow wazuh_t crash_device_t:chr_file { getattr open read };
                    allow wazuh_t system_cronjob_t:process { getattr open read signull getsession getpgid};
                    allow wazuh_t system_cronjob_t:file { getattr open read };
                    allow wazuh_t system_cronjob_t:dir { getattr open read search};
                    allow wazuh_t crond_exec_t:file { getattr read open};
                    allow wazuh_t crontab_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t cupsd_rw_etc_t:file { getattr open read };
                    allow wazuh_t dbusd_etc_t:dir { getattr open read search};
                    allow wazuh_t dbusd_etc_t:file { getattr open read};
                    allow wazuh_t dbusd_exec_t:file { getattr open read };
                    allow wazuh_t debuginfo_exec_t:file { getattr open read };

                    #!!!! WARNING: 'device_t' is a base type.
                    allow wazuh_t device_t:filesystem { getattr open read };
                    allow wazuh_t devlog_t:sock_file { read write getattr create setattr unlink};
                    allow wazuh_t devpts_t:dir { getattr open read search};
                    allow wazuh_t dhcp_etc_t:dir { getattr open read search};
                    allow wazuh_t dhcp_etc_t:file { getattr open read };
                    allow wazuh_t dhcpc_exec_t:file { getattr open read };
                    allow wazuh_t dmesg_exec_t:file { getattr open read };
                    allow wazuh_t dmidecode_exec_t:file { getattr open read };
                    allow wazuh_t dri_device_t:chr_file { getattr open read };
                    allow wazuh_t etc_aliases_t:file { getattr open read };
                    allow wazuh_t event_device_t:chr_file { getattr open read };
                    allow wazuh_t exports_t:file { getattr open read };
                    allow wazuh_t firewalld_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t firewalld_exec_t:file { getattr open read };
                    allow wazuh_t fixed_disk_device_t:blk_file { getattr open read };
                    allow wazuh_t fixed_disk_device_t:chr_file { getattr open read };
                    allow wazuh_t framebuf_device_t:chr_file { getattr open read };
                    allow wazuh_t fsadm_exec_t:file { getattr open read };
                    allow wazuh_t fuse_device_t:chr_file { getattr open read };
                    allow wazuh_t fusermount_exec_t:file { getattr open read };
                    allow wazuh_t games_data_t:dir { getattr open read search};
                    allow wazuh_t games_exec_t:dir { getattr open read search};
                    allow wazuh_t getty_exec_t:file { getattr open read };
                    allow wazuh_t getty_t:lnk_file read;
                    allow wazuh_t gpg_agent_exec_t:file { getattr open read };
                    allow wazuh_t gpg_exec_t:file { getattr open read };
                    allow wazuh_t groupadd_exec_t:file { getattr open read };
                    allow wazuh_t gssd_exec_t:file { getattr open read };
                    allow wazuh_t gssproxy_exec_t:file { getattr open read };
                    allow wazuh_t hostname_etc_t:file { getattr open read };
                    allow wazuh_t hostname_exec_t:file { getattr open read };
                    allow wazuh_t home_cert_t:dir { getattr open read search};
                    allow wazuh_t home_cert_t:file { getattr open read };
                    allow wazuh_t hugetlbfs_t:dir { getattr open read search};
                    allow wazuh_t hugetlbfs_t:filesystem { getattr open read };
                    allow wazuh_t hwclock_exec_t:file { getattr open read };
                    allow wazuh_t hypervkvp_exec_t:file { getattr open read };
                    allow wazuh_t hypervvssd_exec_t:file { getattr open read };
                    allow wazuh_t ifconfig_exec_t:file { getattr open read };
                    allow wazuh_t init_exec_t:file { getattr open read };
                    allow wazuh_t initrc_exec_t:file { getattr open read };
                    allow wazuh_t insmod_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t iptables_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t irqbalance_exec_t:file { getattr open read };
                    allow wazuh_t journalctl_exec_t:file { execute execute_no_trans getattr open read execute};
                    allow wazuh_t kmsg_device_t:chr_file { getattr open read };
                    allow wazuh_t krb5_conf_t:file { getattr open read };
                    allow wazuh_t ldconfig_exec_t:file { getattr open read };
                    allow wazuh_t load_policy_exec_t:file { getattr open read };
                    allow wazuh_t loadkeys_exec_t:file { getattr open read };
                    allow wazuh_t login_exec_t:file { getattr open read };
                    allow wazuh_t logrotate_exec_t:file { getattr open read };
                    allow wazuh_t loop_control_device_t:chr_file { getattr open read };
                    allow wazuh_t lvm_control_t:chr_file { getattr open read };
                    allow wazuh_t lvm_exec_t:file { getattr open read };
                    allow wazuh_t mandb_exec_t:file { getattr open read };
                    allow wazuh_t mdadm_exec_t:file { getattr open read };
                    allow wazuh_t memory_device_t:chr_file { getattr open read };
                    allow wazuh_t modules_conf_t:dir { getattr open read search};
                    allow wazuh_t modules_conf_t:file { getattr open read };
                    allow wazuh_t modules_object_t:dir { getattr open read search};
                    allow wazuh_t modules_object_t:file { getattr open read };
                    allow wazuh_t mount_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t mouse_device_t:chr_file { getattr open read };
                    allow wazuh_t mysqld_etc_t:dir { getattr open read search};
                    allow wazuh_t mysqld_etc_t:file { getattr open read };
                    allow wazuh_t namespace_init_exec_t:file { getattr open read };
                    allow wazuh_t net_conf_t:dir { getattr open read search};
                    allow wazuh_t net_conf_t:file { getattr open read append unlink};
                    allow wazuh_t netcontrol_device_t:chr_file { getattr open read };
                    allow wazuh_t netutils_exec_t:file { getattr open read };
                    allow wazuh_t nfsd_exec_t:file { getattr open read };
                    allow wazuh_t nvram_device_t:chr_file { getattr open read };
                    allow wazuh_t oddjob_mkhomedir_exec_t:file { getattr open read };
                    allow wazuh_t pam_console_exec_t:file { getattr open read };
                    allow wazuh_t pam_timestamp_exec_t:file { getattr open read };
                    allow wazuh_t passwd_exec_t:file { getattr open read };
                    allow wazuh_t pinentry_exec_t:file { getattr open read };
                    allow wazuh_t ping_exec_t:file { getattr open read };
                    allow wazuh_t plymouthd_var_log_t:file { getattr open read };
                    allow wazuh_t policykit_auth_exec_t:file { getattr open read };
                    allow wazuh_t policykit_exec_t:file { getattr open read };
                    allow wazuh_t postfix_etc_t:dir { getattr open read search};
                    allow wazuh_t postfix_map_exec_t:file { getattr open read };
                    allow wazuh_t postfix_master_exec_t:file { getattr open read };
                    allow wazuh_t postfix_postdrop_exec_t:file { getattr open read };
                    allow wazuh_t postfix_postqueue_exec_t:file { getattr open read };
                    allow wazuh_t ppp_device_t:chr_file { getattr open read };
                    allow wazuh_t pppd_etc_t:dir { getattr open read search};
                    allow wazuh_t pppd_exec_t:file { getattr open read };
                    allow wazuh_t proc_t:filesystem { getattr open read };
                    allow wazuh_t pstore_t:dir { getattr open read search};
                    allow wazuh_t pstore_t:filesystem { getattr open read };
                    allow wazuh_t ptmx_t:chr_file { getattr open read write};
                    allow wazuh_t quota_exec_t:file { getattr open read };
                    allow wazuh_t random_device_t:chr_file { getattr open read };
                    allow wazuh_t rdisc_exec_t:file { getattr open read };
                    allow wazuh_t readahead_exec_t:file { getattr open read };
                    allow wazuh_t rpcbind_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t rpcd_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t rpm_exec_t:file { execute getattr open read execute_no_trans ioctl};
                    allow wazuh_t rpm_script_tmp_t:dir { read search};
                    allow wazuh_t rsync_etc_t:file { getattr open read };
                    allow wazuh_t rsync_exec_t:file { getattr open read execute_no_trans};
                    allow wazuh_t samba_etc_t:dir { getattr open read search};
                    allow wazuh_t scsi_generic_device_t:chr_file { getattr open read };
                    allow wazuh_t selinux_config_t:dir { read search};
                    allow wazuh_t selinux_config_t:file { getattr open read };
                    allow wazuh_t semanage_exec_t:file { getattr open read };
                    allow wazuh_t sendmail_exec_t:file { getattr open read };
                    allow wazuh_t setfiles_exec_t:file { getattr open read };
                    allow wazuh_t setsebool_exec_t:file { getattr open read };
                    allow wazuh_t shadow_t:file { getattr open read };
                    allow wazuh_t showmount_exec_t:file { getattr open read };
                    allow wazuh_t slapd_cert_t:dir { getattr open read search};
                    allow wazuh_t sound_device_t:chr_file { getattr open read };
                    allow wazuh_t ssh_agent_exec_t:file { getattr open read };
                    allow wazuh_t ssh_exec_t:file { getattr open read };
                    allow wazuh_t ssh_keygen_exec_t:file { getattr open read };
                    allow wazuh_t sshd_exec_t:file { execute execute_no_trans getattr open read };
                    allow wazuh_t sshd_key_t:file { getattr open read };
                    allow wazuh_t sshd_keygen_exec_t:file { getattr open read };
                    allow wazuh_t su_exec_t:file { getattr open read };
                    allow wazuh_t sudo_exec_t:file { getattr open read };
                    allow wazuh_t sulogin_exec_t:file { getattr open read };
                    allow wazuh_t sysctl_net_t:dir search;
                    allow wazuh_t sysfs_t:filesystem { getattr open read };
                    allow wazuh_t syslog_conf_t:dir { getattr open read search };
                    allow wazuh_t syslog_conf_t:file { getattr open read ioctl};
                    allow wazuh_t syslogd_exec_t:file { getattr open read };
                    allow wazuh_t system_cron_spool_t:dir { getattr open read search};
                    allow wazuh_t system_cron_spool_t:file { getattr open read ioctl};
                    allow wazuh_t system_dbusd_var_run_t:dir search;
                    allow wazuh_t systemd_bootchart_exec_t:file { getattr open read };
                    allow wazuh_t systemd_hostnamed_exec_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_etc_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_exec_t:file { getattr open read };
                    allow wazuh_t systemd_initctl_exec_t:file { getattr open read };
                    allow wazuh_t systemd_localed_exec_t:file { getattr open read };
                    allow wazuh_t systemd_logind_exec_t:file { getattr open read };
                    allow wazuh_t systemd_machined_exec_t:file { getattr open read };
                    allow wazuh_t systemd_notify_exec_t:file { getattr open read };
                    allow wazuh_t systemd_passwd_agent_exec_t:file { getattr open read };
                    allow wazuh_t systemd_sysctl_exec_t:file { getattr open read };
                    allow wazuh_t systemd_systemctl_exec_t:file { execute getattr execute_no_trans read};
                    allow wazuh_t systemd_timedated_exec_t:file { getattr open read };
                    allow wazuh_t systemd_tmpfiles_exec_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:dir { getattr open read search};
                    allow wazuh_t systemd_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:service { status start};
                    allow wazuh_t tcpd_exec_t:file { getattr read open};
                    allow wazuh_t tcsd_exec_t:file { getattr open read };
                    allow wazuh_t tmpfs_t:dir read;
                    allow wazuh_t tmpfs_t:filesystem { getattr open read };
                    allow wazuh_t traceroute_exec_t:file { getattr open read };
                    allow wazuh_t tty_device_t:chr_file { getattr open read };
                    allow wazuh_t tun_tap_device_t:chr_file { getattr open read };
                    allow wazuh_t tuned_etc_t:dir { getattr open read search};
                    allow wazuh_t tuned_exec_t:file { getattr open read };
                    allow wazuh_t udev_exec_t:file { getattr open read };
                    allow wazuh_t udev_rules_t:dir { getattr open read search};
                    allow wazuh_t udev_rules_t:file { getattr open read };
                    allow wazuh_t uhid_device_t:chr_file { getattr open read };

                    #!!!! WARNING: 'unlabeled_t' is a base type.
                    allow wazuh_t unlabeled_t:file { getattr open read };
                    allow wazuh_t updpwd_exec_t:file { getattr open read };
                    allow wazuh_t usbmon_device_t:chr_file { getattr open read };
                    allow wazuh_t user_fonts_t:dir { getattr open read search };
                    allow wazuh_t user_tmp_t:dir { getattr open read search };
                    allow wazuh_t useradd_exec_t:file { execute execute_no_trans getattr open read};
                    allow wazuh_t userhelper_conf_t:dir { getattr open read };
                    allow wazuh_t usernetctl_exec_t:file { getattr open read };

                    #!!!! WARNING: 'var_lib_t' is a base type.
                    allow wazuh_t var_lib_t:dir { getattr open read };
                    allow wazuh_t vfio_device_t:chr_file { getattr open read };
                    allow wazuh_t vhost_device_t:chr_file { getattr open read };
                    allow wazuh_t virt_qemu_ga_exec_t:file { getattr open read };
                    allow wazuh_t virt_qemu_ga_unconfined_exec_t:dir { getattr open read };
                    allow wazuh_t vlock_exec_t:file { getattr open read };
                    allow wazuh_t vmtools_exec_t:file { getattr open read };
                    allow wazuh_t vmtools_unconfined_exec_t:dir { getattr open read search};
                    allow wazuh_t wtmp_t:file read;
                    allow wazuh_t xserver_etc_t:dir { getattr open read };
                    allow wazuh_t xserver_misc_device_t:chr_file { getattr open read };
                    allow wazuh_t NetworkManager_var_lib_t:dir { getattr open read search};
                    allow wazuh_t admin_home_t:file { getattr open read };
                    allow wazuh_t auditd_etc_t:file { getattr open read };
                    allow wazuh_t authconfig_var_lib_t:dir { getattr open read search};
                    allow wazuh_t bootloader_var_lib_t:dir { getattr open read search};
                    allow wazuh_t cgroup_t:filesystem { getattr open read };
                    allow wazuh_t chronyd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t chronyd_var_log_t:dir { getattr open read search};
                    allow wazuh_t cron_log_t:file { getattr open read };
                    allow wazuh_t default_context_t:dir { getattr open read search};
                    allow wazuh_t dhcpc_state_t:dir { getattr open read search};
                    allow wazuh_t dhcpc_state_t:file { getattr open read };
                    allow wazuh_t faillog_t:file { getattr open read };
                    allow wazuh_t gssproxy_var_lib_t:dir { getattr open read search};
                    allow wazuh_t hypervkvp_var_lib_t:dir { getattr open read search};
                    allow wazuh_t init_var_lib_t:dir { getattr open read search};
                    allow wazuh_t lastlog_t:file { getattr open read };
                    allow wazuh_t logrotate_var_lib_t:dir { getattr open read search};
                    allow wazuh_t mail_spool_t:lnk_file { getattr open read };
                    allow wazuh_t policykit_var_lib_t:dir { getattr open read search};
                    allow wazuh_t postfix_data_t:dir { getattr open read search};
                    allow wazuh_t rhsmcertd_log_t:dir { getattr open read search};
                    allow wazuh_t rpcbind_var_lib_t:dir { getattr open read search};
                    allow wazuh_t rpm_log_t:file { getattr open read append};
                    allow wazuh_t samba_log_t:dir { getattr open read search};
                    allow wazuh_t samba_var_t:dir { getattr open read search};
                    allow wazuh_t selinux_login_config_t:dir { getattr open read search};
                    allow wazuh_t semanage_store_t:dir { getattr open read search};
                    allow wazuh_t sysctl_net_t:file { getattr open read };
                    allow wazuh_t sysfs_t:dir read;
                    allow wazuh_t sysfs_t:file {open read};
                    allow wazuh_t syslogd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_etc_rw_t:file { getattr open read };
                    allow wazuh_t NetworkManager_initrc_exec_t:dir { getattr open read search};
                    allow wazuh_t NetworkManager_unit_file_t:file { getattr open read };
                    allow wazuh_t auditd_log_t:file { getattr open read };
                    allow wazuh_t auditd_unit_file_t:file { getattr open read };
                    allow wazuh_t auditd_unit_file_t:service { status };
                    allow wazuh_t bluetooth_unit_file_t:file { getattr open read };
                    allow wazuh_t chronyd_unit_file_t:file { getattr open read };
                    allow wazuh_t crond_unit_file_t:file { getattr open read };
                    allow wazuh_t crond_unit_file_t:service { status };
                    allow wazuh_t firewalld_etc_rw_t:file { getattr open read };
                    allow wazuh_t firewalld_unit_file_t:file { getattr open read };
                    allow wazuh_t getty_unit_file_t:file { getattr open read };
                    allow wazuh_t gssproxy_unit_file_t:file { getattr open read };
                    allow wazuh_t hypervvssd_unit_file_t:file { getattr open read };
                    allow wazuh_t modules_object_t:lnk_file { getattr open read };
                    allow wazuh_t nfsd_unit_file_t:file { getattr open read };
                    allow wazuh_t postfix_etc_t:file { getattr open read };
                    allow wazuh_t power_unit_file_t:file { getattr open read };
                    allow wazuh_t pppd_etc_rw_t:dir { getattr open read search};
                    allow wazuh_t pppd_initrc_exec_t:file { getattr open read };
                    allow wazuh_t rdisc_unit_file_t:file { getattr open read };
                    allow wazuh_t rpcd_unit_file_t:file { getattr open read };
                    allow wazuh_t samba_etc_t:file { getattr open read };
                    allow wazuh_t slapd_cert_t:file { getattr open read };
                    allow wazuh_t sshd_keygen_unit_file_t:file { getattr open read };
                    allow wazuh_t sshd_unit_file_t:file { getattr open read };
                    allow wazuh_t system_dbusd_t:unix_stream_socket connectto;
                    allow wazuh_t system_dbusd_var_lib_t:dir { getattr open read search};
                    allow wazuh_t systemd_bootchart_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_hwdb_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_machined_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_machined_var_lib_t:dir { getattr open read search};
                    allow wazuh_t systemd_systemctl_exec_t:file { open read };
                    allow wazuh_t systemd_timedated_unit_file_t:file { getattr open read };
                    allow wazuh_t systemd_unit_file_t:lnk_file { getattr open read };
                    allow wazuh_t systemd_vconsole_unit_file_t:file { getattr open read };
                    allow wazuh_t tcsd_var_lib_t:dir { getattr open read search };
                    allow wazuh_t tuned_etc_t:file { getattr open read };
                    allow wazuh_t tuned_log_t:dir { getattr open read search};
                    allow wazuh_t tuned_rw_etc_t:file { getattr open read };
                    allow wazuh_t user_devpts_t:chr_file { getattr open read write};
                    allow wazuh_t var_lib_nfs_t:dir { getattr open read search};
                    allow wazuh_t var_lib_t:file { getattr open read };
                    allow wazuh_t var_log_t:file { getattr open read ioctl};
                    allow wazuh_t virt_qemu_ga_log_t:dir { getattr open read search};
                    allow wazuh_t vmtools_unit_file_t:file { getattr open read };
                    allow wazuh_t wtmp_t:file { getattr open };
                    allow wazuh_t NetworkManager_initrc_exec_t:file { getattr open read };
                    allow wazuh_t NetworkManager_var_lib_t:file { getattr open read };
                    allow wazuh_t authconfig_var_lib_t:file { getattr open read };
                    allow wazuh_t chronyd_var_lib_t:file { getattr open read };
                    allow wazuh_t default_context_t:file { getattr open read };
                    allow wazuh_t devpts_t:chr_file { getattr open read };
                    allow wazuh_t file_context_t:dir { getattr open read search};
                    allow wazuh_t gssproxy_var_lib_t:sock_file { getattr open read };
                    allow wazuh_t init_var_run_t:dir { getattr open read search };
                    allow wazuh_t logrotate_var_lib_t:file { getattr open read };
                    allow wazuh_t mount_var_run_t:dir { getattr open read write search write};
                    allow wazuh_t postfix_data_t:file { getattr open read };
                    allow wazuh_t rpc_pipefs_t:dir { getattr open read search };
                    allow wazuh_t rpm_var_lib_t:dir { getattr open read search};
                    allow wazuh_t rpm_var_lib_t:file { getattr open read};
                    allow wazuh_t rpm_var_cache_t:dir { getattr open read search};
                    allow wazuh_t rpm_var_cache_t:file { getattr open read};
                    allow wazuh_t self:rawip_socket {bind setopt getopt create open};
                    allow wazuh_t semanage_store_t:file { getattr open read };
                    allow wazuh_t syslogd_var_lib_t:file { getattr open read };
                    allow wazuh_t syslogd_var_run_t:dir { getattr open read search};
                    allow wazuh_t tuned_log_t:file { getattr open read };
                    allow wazuh_t usermodehelper_t:file { getattr open read };
                    allow wazuh_t var_lib_nfs_t:file { getattr open read };
                    allow wazuh_t file_context_t:file { getattr open read };
                    allow wazuh_t init_var_lib_t:file { getattr open read };
                    allow wazuh_t self:netlink_audit_socket {bind setopt getopt create open};
                    allow wazuh_t syslogd_var_run_t:file { getattr open read };
                    allow wazuh_t vmtools_unconfined_exec_t:file { getattr open read };
                    allow wazuh_t var_run_t:dir { getattr open read search write add_name};
                    allow wazuh_t var_run_t:file { getattr open read lock create};
                    allow wazuh_t firewalld_var_log_t:file { getattr open read };

                    #============== Permissions for rootcheck to monitor ports
                    allow wazuh_t afs3_callback_port_t:tcp_socket name_bind;
                    allow wazuh_t afs3_callback_port_t:udp_socket name_bind;
                    allow wazuh_t ibm_dt_2_port_t:tcp_socket name_bind;
                    allow wazuh_t ibm_dt_2_port_t:udp_socket name_bind;
                    allow wazuh_t l2tp_port_t:tcp_socket name_bind;
                    allow wazuh_t l2tp_port_t:udp_socket name_bind;
                    allow wazuh_t i18n_input_port_t:tcp_socket name_bind;
                    allow wazuh_t trivnet1_port_t:tcp_socket name_bind;
                    allow wazuh_t trivnet1_port_t:udp_socket name_bind;
                    allow wazuh_t xinuexpansion3_port_t:tcp_socket name_bind;
                    allow wazuh_t xinuexpansion3_port_t:udp_socket name_bind;
                    allow wazuh_t xinuexpansion4_port_t:tcp_socket name_bind;
                    allow wazuh_t xinuexpansion4_port_t:udp_socket name_bind;
                    allow wazuh_t unreserved_port_t:tcp_socket name_bind;
                    allow wazuh_t unreserved_port_t:udp_socket name_bind;
                    allow wazuh_t agentx_port_t:tcp_socket name_bind;
                    allow wazuh_t agentx_port_t:udp_socket name_bind;
                    allow wazuh_t amanda_port_t:tcp_socket name_bind;
                    allow wazuh_t amanda_port_t:udp_socket name_bind;
                    allow wazuh_t amqp_port_t:tcp_socket name_bind;
                    allow wazuh_t amqp_port_t:udp_socket name_bind;
                    allow wazuh_t aol_port_t:tcp_socket name_bind;
                    allow wazuh_t aol_port_t:udp_socket name_bind;
                    allow wazuh_t apc_port_t:tcp_socket name_bind;
                    allow wazuh_t apc_port_t:udp_socket name_bind;
                    allow wazuh_t apcupsd_port_t:tcp_socket name_bind;
                    allow wazuh_t apcupsd_port_t:udp_socket name_bind;
                    allow wazuh_t asterisk_port_t:tcp_socket name_bind;
                    allow wazuh_t asterisk_port_t:udp_socket name_bind;
                    allow wazuh_t audit_port_t:tcp_socket name_bind;
                    allow wazuh_t auth_port_t:tcp_socket name_bind;
                    allow wazuh_t bacula_port_t:tcp_socket name_bind;
                    allow wazuh_t bacula_port_t:udp_socket name_bind;
                    allow wazuh_t bctp_port_t:tcp_socket name_bind;
                    allow wazuh_t bctp_port_t:udp_socket name_bind;
                    allow wazuh_t bgp_port_t:tcp_socket name_bind;
                    allow wazuh_t bgp_port_t:udp_socket name_bind;
                    allow wazuh_t boinc_port_t:tcp_socket name_bind;
                    allow wazuh_t brlp_port_t:tcp_socket name_bind;
                    allow wazuh_t chronyd_port_t:udp_socket name_bind;
                    allow wazuh_t clamd_port_t:tcp_socket name_bind;
                    allow wazuh_t clockspeed_port_t:udp_socket name_bind;
                    allow wazuh_t cluster_port_t:tcp_socket name_bind;
                    allow wazuh_t cluster_port_t:udp_socket name_bind;
                    allow wazuh_t cma_port_t:tcp_socket name_bind;
                    allow wazuh_t cma_port_t:udp_socket name_bind;
                    allow wazuh_t cobbler_port_t:tcp_socket name_bind;
                    allow wazuh_t collectd_port_t:udp_socket name_bind;
                    allow wazuh_t comsat_port_t:udp_socket name_bind;
                    allow wazuh_t condor_port_t:tcp_socket name_bind;
                    allow wazuh_t condor_port_t:udp_socket name_bind;
                    allow wazuh_t conman_port_t:tcp_socket name_bind;
                    allow wazuh_t conman_port_t:udp_socket name_bind;
                    allow wazuh_t connlcli_port_t:tcp_socket name_bind;
                    allow wazuh_t connlcli_port_t:udp_socket name_bind;
                    allow wazuh_t couchdb_port_t:tcp_socket name_bind;
                    allow wazuh_t couchdb_port_t:udp_socket name_bind;
                    allow wazuh_t ctdb_port_t:tcp_socket name_bind;
                    allow wazuh_t ctdb_port_t:udp_socket name_bind;
                    allow wazuh_t cvs_port_t:tcp_socket name_bind;
                    allow wazuh_t cvs_port_t:udp_socket name_bind;
                    allow wazuh_t cyphesis_port_t:tcp_socket name_bind;
                    allow wazuh_t daap_port_t:tcp_socket name_bind;
                    allow wazuh_t daap_port_t:udp_socket name_bind;
                    allow wazuh_t dbskkd_port_t:tcp_socket name_bind;
                    allow wazuh_t dcc_port_t:udp_socket name_bind;
                    allow wazuh_t dccm_port_t:tcp_socket name_bind;
                    allow wazuh_t dccm_port_t:udp_socket name_bind;
                    allow wazuh_t dhcpc_port_t:tcp_socket name_bind;
                    allow wazuh_t dhcpc_port_t:udp_socket name_bind;
                    allow wazuh_t dhcpd_port_t:tcp_socket name_bind;
                    allow wazuh_t dhcpd_port_t:udp_socket name_bind;
                    allow wazuh_t dict_port_t:tcp_socket name_bind;
                    allow wazuh_t distccd_port_t:tcp_socket name_bind;
                    allow wazuh_t dns_port_t:tcp_socket name_bind;
                    allow wazuh_t dns_port_t:udp_socket name_bind;
                    allow wazuh_t dnssec_port_t:tcp_socket name_bind;
                    allow wazuh_t dogtag_port_t:tcp_socket name_bind;
                    allow wazuh_t echo_port_t:tcp_socket name_bind;
                    allow wazuh_t echo_port_t:udp_socket name_bind;
                    allow wazuh_t efs_port_t:tcp_socket name_bind;
                    allow wazuh_t ephemeral_port_t:tcp_socket name_bind;
                    allow wazuh_t ephemeral_port_t:udp_socket name_bind;
                    allow wazuh_t epmap_port_t:tcp_socket name_bind;
                    allow wazuh_t epmap_port_t:udp_socket name_bind;
                    allow wazuh_t epmd_port_t:tcp_socket name_bind;
                    allow wazuh_t epmd_port_t:udp_socket name_bind;
                    allow wazuh_t fingerd_port_t:tcp_socket name_bind;
                    allow wazuh_t flash_port_t:tcp_socket name_bind;
                    allow wazuh_t flash_port_t:udp_socket name_bind;
                    allow wazuh_t freeipmi_port_t:tcp_socket name_bind;
                    allow wazuh_t freeipmi_port_t:udp_socket name_bind;
                    allow wazuh_t ftp_port_t:tcp_socket name_bind;
                    allow wazuh_t ftp_port_t:udp_socket name_bind;
                    allow wazuh_t gatekeeper_port_t:tcp_socket name_bind;
                    allow wazuh_t gatekeeper_port_t:udp_socket name_bind;
                    allow wazuh_t gdomap_port_t:tcp_socket name_bind;
                    allow wazuh_t gdomap_port_t:udp_socket name_bind;
                    allow wazuh_t geneve_port_t:tcp_socket name_bind;
                    allow wazuh_t giftd_port_t:tcp_socket name_bind;
                    allow wazuh_t git_port_t:tcp_socket name_bind;
                    allow wazuh_t git_port_t:udp_socket name_bind;
                    allow wazuh_t glance_port_t:tcp_socket name_bind;
                    allow wazuh_t glance_port_t:udp_socket name_bind;
                    allow wazuh_t gluster_port_t:tcp_socket name_bind;
                    allow wazuh_t gluster_port_t:udp_socket name_bind;
                    allow wazuh_t gopher_port_t:tcp_socket name_bind;
                    allow wazuh_t gopher_port_t:udp_socket name_bind;
                    allow wazuh_t gpsd_port_t:tcp_socket name_bind;
                    allow wazuh_t hddtemp_port_t:tcp_socket name_bind;
                    allow wazuh_t howl_port_t:tcp_socket name_bind;
                    allow wazuh_t howl_port_t:udp_socket name_bind;
                    allow wazuh_t hplip_port_t:tcp_socket name_bind;
                    allow wazuh_t imaze_port_t:tcp_socket name_bind;
                    allow wazuh_t imaze_port_t:udp_socket name_bind;
                    allow wazuh_t innd_port_t:tcp_socket name_bind;
                    allow wazuh_t intermapper_port_t:tcp_socket name_bind;
                    allow wazuh_t interwise_port_t:tcp_socket name_bind;
                    allow wazuh_t interwise_port_t:udp_socket name_bind;
                    allow wazuh_t ionixnetmon_port_t:tcp_socket name_bind;
                    allow wazuh_t ionixnetmon_port_t:udp_socket name_bind;
                    allow wazuh_t ipmi_port_t:udp_socket name_bind;
                    allow wazuh_t ipp_port_t:tcp_socket name_bind;
                    allow wazuh_t ipp_port_t:udp_socket name_bind;
                    allow wazuh_t ipsecnat_port_t:tcp_socket name_bind;
                    allow wazuh_t ipsecnat_port_t:udp_socket name_bind;
                    allow wazuh_t ircd_port_t:tcp_socket name_bind;
                    allow wazuh_t isakmp_port_t:udp_socket name_bind;
                    allow wazuh_t iscsi_port_t:tcp_socket name_bind;
                    allow wazuh_t isns_port_t:tcp_socket name_bind;
                    allow wazuh_t isns_port_t:udp_socket name_bind;
                    allow wazuh_t jacorb_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_port_t:udp_socket name_bind;
                    allow wazuh_t kprop_port_t:tcp_socket name_bind;
                    allow wazuh_t ktalkd_port_t:udp_socket name_bind;
                    allow wazuh_t kubernetes_port_t:tcp_socket name_bind;
                    allow wazuh_t ldap_port_t:tcp_socket name_bind;
                    allow wazuh_t ldap_port_t:udp_socket name_bind;
                    allow wazuh_t lirc_port_t:tcp_socket name_bind;
                    allow wazuh_t llmnr_port_t:tcp_socket name_bind;
                    allow wazuh_t llmnr_port_t:udp_socket name_bind;
                    allow wazuh_t lltng_port_t:tcp_socket name_bind;
                    allow wazuh_t lmtp_port_t:tcp_socket name_bind;
                    allow wazuh_t lmtp_port_t:udp_socket name_bind;
                    allow wazuh_t luci_port_t:tcp_socket name_bind;
                    allow wazuh_t mail_port_t:tcp_socket name_bind;
                    allow wazuh_t mailbox_port_t:tcp_socket name_bind;
                    allow wazuh_t memcache_port_t:tcp_socket name_bind;
                    allow wazuh_t memcache_port_t:udp_socket name_bind;
                    allow wazuh_t milter_port_t:tcp_socket name_bind;
                    allow wazuh_t mmcc_port_t:tcp_socket name_bind;
                    allow wazuh_t mmcc_port_t:udp_socket name_bind;
                    allow wazuh_t mongod_port_t:tcp_socket name_bind;
                    allow wazuh_t monopd_port_t:tcp_socket name_bind;
                    allow wazuh_t mountd_port_t:tcp_socket name_bind;
                    allow wazuh_t mountd_port_t:udp_socket name_bind;
                    allow wazuh_t mpd_port_t:tcp_socket name_bind;
                    allow wazuh_t msnp_port_t:tcp_socket name_bind;
                    allow wazuh_t msnp_port_t:udp_socket name_bind;
                    allow wazuh_t mssql_port_t:tcp_socket name_bind;
                    allow wazuh_t mssql_port_t:udp_socket name_bind;
                    allow wazuh_t munin_port_t:tcp_socket name_bind;
                    allow wazuh_t munin_port_t:udp_socket name_bind;
                    allow wazuh_t mxi_port_t:tcp_socket name_bind;
                    allow wazuh_t mxi_port_t:udp_socket name_bind;
                    allow wazuh_t mysqld_port_t:tcp_socket name_bind;
                    allow wazuh_t mysqlmanagerd_port_t:tcp_socket name_bind;
                    allow wazuh_t mythtv_port_t:tcp_socket name_bind;
                    allow wazuh_t nessus_port_t:tcp_socket name_bind;
                    allow wazuh_t netport_port_t:tcp_socket name_bind;
                    allow wazuh_t netport_port_t:udp_socket name_bind;
                    allow wazuh_t netsupport_port_t:tcp_socket name_bind;
                    allow wazuh_t netsupport_port_t:udp_socket name_bind;
                    allow wazuh_t neutron_port_t:tcp_socket name_bind;
                    allow wazuh_t nfs_port_t:tcp_socket name_bind;
                    allow wazuh_t nfs_port_t:udp_socket name_bind;
                    allow wazuh_t nmbd_port_t:udp_socket name_bind;
                    allow wazuh_t node_t:tcp_socket node_bind;
                    allow wazuh_t node_t:udp_socket node_bind;
                    allow wazuh_t ntop_port_t:tcp_socket name_bind;
                    allow wazuh_t ntop_port_t:udp_socket name_bind;
                    allow wazuh_t ntp_port_t:udp_socket name_bind;
                    allow wazuh_t ocsp_port_t:tcp_socket name_bind;
                    allow wazuh_t openflow_port_t:tcp_socket name_bind;
                    allow wazuh_t openhpid_port_t:tcp_socket name_bind;
                    allow wazuh_t openhpid_port_t:udp_socket name_bind;
                    allow wazuh_t openvpn_port_t:tcp_socket name_bind;
                    allow wazuh_t openvpn_port_t:udp_socket name_bind;
                    allow wazuh_t openvswitch_port_t:tcp_socket name_bind;
                    allow wazuh_t oracle_port_t:tcp_socket name_bind;
                    allow wazuh_t oracle_port_t:udp_socket name_bind;
                    allow wazuh_t ovsdb_port_t:tcp_socket name_bind;
                    allow wazuh_t pdps_port_t:tcp_socket name_bind;
                    allow wazuh_t pdps_port_t:udp_socket name_bind;
                    allow wazuh_t pgpkeyserver_port_t:tcp_socket name_bind;
                    allow wazuh_t pgpkeyserver_port_t:udp_socket name_bind;
                    allow wazuh_t pingd_port_t:tcp_socket name_bind;
                    allow wazuh_t pop_port_t:tcp_socket name_bind;
                    allow wazuh_t portmap_port_t:tcp_socket name_bind;
                    allow wazuh_t portmap_port_t:udp_socket name_bind;
                    allow wazuh_t postgresql_port_t:tcp_socket name_bind;
                    allow wazuh_t pptp_port_t:tcp_socket name_bind;
                    allow wazuh_t pptp_port_t:udp_socket name_bind;
                    allow wazuh_t prelude_port_t:tcp_socket name_bind;
                    allow wazuh_t prelude_port_t:udp_socket name_bind;
                    allow wazuh_t presence_port_t:tcp_socket name_bind;
                    allow wazuh_t presence_port_t:udp_socket name_bind;
                    allow wazuh_t preupgrade_port_t:tcp_socket name_bind;
                    allow wazuh_t printer_port_t:tcp_socket name_bind;
                    allow wazuh_t prosody_port_t:tcp_socket name_bind;
                    allow wazuh_t ptal_port_t:tcp_socket name_bind;
                    allow wazuh_t pulseaudio_port_t:tcp_socket name_bind;
                    allow wazuh_t pulseaudio_port_t:udp_socket name_bind;
                    allow wazuh_t puppet_port_t:tcp_socket name_bind;
                    allow wazuh_t pxe_port_t:udp_socket name_bind;
                    allow wazuh_t pyzor_port_t:udp_socket name_bind;
                    allow wazuh_t rabbitmq_port_t:tcp_socket name_bind;
                    allow wazuh_t radacct_port_t:tcp_socket name_bind;
                    allow wazuh_t radacct_port_t:udp_socket name_bind;
                    allow wazuh_t radius_port_t:tcp_socket name_bind;
                    allow wazuh_t radius_port_t:udp_socket name_bind;
                    allow wazuh_t radsec_port_t:tcp_socket name_bind;
                    allow wazuh_t razor_port_t:tcp_socket name_bind;
                    allow wazuh_t redis_port_t:tcp_socket name_bind;
                    allow wazuh_t repository_port_t:tcp_socket name_bind;
                    allow wazuh_t reserved_port_t:tcp_socket name_bind;
                    allow wazuh_t reserved_port_t:udp_socket name_bind;
                    allow wazuh_t ricci_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_port_t:udp_socket name_bind;
                    allow wazuh_t rlogin_port_t:tcp_socket name_bind;
                    allow wazuh_t rlogind_port_t:tcp_socket name_bind;
                    allow wazuh_t rndc_port_t:tcp_socket name_bind;
                    allow wazuh_t rndc_port_t:udp_socket name_bind;
                    allow wazuh_t router_port_t:tcp_socket name_bind;
                    allow wazuh_t router_port_t:udp_socket name_bind;
                    allow wazuh_t rsh_port_t:tcp_socket name_bind;
                    allow wazuh_t rsync_port_t:tcp_socket name_bind;
                    allow wazuh_t rsync_port_t:udp_socket name_bind;
                    allow wazuh_t rtsclient_port_t:tcp_socket name_bind;
                    allow wazuh_t rtsp_port_t:tcp_socket name_bind;
                    allow wazuh_t rtsp_port_t:udp_socket name_bind;
                    allow wazuh_t rwho_port_t:udp_socket name_bind;
                    allow wazuh_t salt_port_t:tcp_socket name_bind;
                    allow wazuh_t sap_port_t:tcp_socket name_bind;
                    allow wazuh_t sap_port_t:udp_socket name_bind;
                    allow wazuh_t saphostctrl_port_t:tcp_socket name_bind;
                    allow wazuh_t servistaitsm_port_t:tcp_socket name_bind;
                    allow wazuh_t servistaitsm_port_t:udp_socket name_bind;
                    allow wazuh_t sge_port_t:tcp_socket name_bind;
                    allow wazuh_t shellinaboxd_port_t:tcp_socket name_bind;
                    allow wazuh_t sieve_port_t:tcp_socket name_bind;
                    allow wazuh_t sip_port_t:tcp_socket name_bind;
                    allow wazuh_t sip_port_t:udp_socket name_bind;
                    allow wazuh_t sixxsconfig_port_t:tcp_socket name_bind;
                    allow wazuh_t sixxsconfig_port_t:udp_socket name_bind;
                    allow wazuh_t smbd_port_t:tcp_socket name_bind;
                    allow wazuh_t smtp_port_t:tcp_socket name_bind;
                    allow wazuh_t snmp_port_t:tcp_socket name_bind;
                    allow wazuh_t snmp_port_t:udp_socket name_bind;
                    allow wazuh_t soundd_port_t:tcp_socket name_bind;
                    allow wazuh_t spamd_port_t:tcp_socket name_bind;
                    allow wazuh_t speech_port_t:tcp_socket name_bind;
                    allow wazuh_t squid_port_t:tcp_socket name_bind;
                    allow wazuh_t squid_port_t:udp_socket name_bind;
                    allow wazuh_t ssdp_port_t:tcp_socket name_bind;
                    allow wazuh_t ssdp_port_t:udp_socket name_bind;
                    allow wazuh_t ssh_port_t:tcp_socket name_bind;
                    allow wazuh_t svn_port_t:tcp_socket name_bind;
                    allow wazuh_t svn_port_t:udp_socket name_bind;
                    allow wazuh_t svrloc_port_t:tcp_socket name_bind;
                    allow wazuh_t svrloc_port_t:udp_socket name_bind;
                    allow wazuh_t swat_port_t:tcp_socket name_bind;
                    allow wazuh_t swift_port_t:tcp_socket name_bind;
                    allow wazuh_t syslogd_port_t:tcp_socket name_bind;
                    allow wazuh_t syslogd_port_t:udp_socket name_bind;
                    allow wazuh_t tangd_port_t:tcp_socket name_bind;
                    allow wazuh_t tcs_port_t:tcp_socket name_bind;
                    allow wazuh_t telnetd_port_t:tcp_socket name_bind;
                    allow wazuh_t tftp_port_t:udp_socket name_bind;
                    allow wazuh_t time_port_t:tcp_socket name_bind;
                    allow wazuh_t time_port_t:udp_socket name_bind;
                    allow wazuh_t tor_port_t:tcp_socket name_bind;
                    allow wazuh_t traceroute_port_t:udp_socket name_bind;
                    allow wazuh_t tram_port_t:tcp_socket name_bind;
                    allow wazuh_t transproxy_port_t:tcp_socket name_bind;
                    allow wazuh_t trisoap_port_t:tcp_socket name_bind;
                    allow wazuh_t trisoap_port_t:udp_socket name_bind;
                    allow wazuh_t ups_port_t:tcp_socket name_bind;
                    allow wazuh_t uucpd_port_t:tcp_socket name_bind;
                    allow wazuh_t varnishd_port_t:tcp_socket name_bind;
                    allow wazuh_t virt_port_t:tcp_socket name_bind;
                    allow wazuh_t virt_port_t:udp_socket name_bind;
                    allow wazuh_t vnc_port_t:tcp_socket name_bind;
                    allow wazuh_t wccp_port_t:udp_socket name_bind;
                    allow wazuh_t websm_port_t:tcp_socket name_bind;
                    allow wazuh_t websm_port_t:udp_socket name_bind;
                    allow wazuh_t whois_port_t:tcp_socket name_bind;
                    allow wazuh_t whois_port_t:udp_socket name_bind;
                    allow wazuh_t winshadow_port_t:tcp_socket name_bind;
                    allow wazuh_t winshadow_port_t:udp_socket name_bind;
                    allow wazuh_t wsdapi_port_t:tcp_socket name_bind;
                    allow wazuh_t wsdapi_port_t:udp_socket name_bind;
                    allow wazuh_t wsicopy_port_t:tcp_socket name_bind;
                    allow wazuh_t wsicopy_port_t:udp_socket name_bind;
                    allow wazuh_t xdmcp_port_t:tcp_socket name_bind;
                    allow wazuh_t xdmcp_port_t:udp_socket name_bind;
                    allow wazuh_t xen_port_t:tcp_socket name_bind;
                    allow wazuh_t xfs_port_t:tcp_socket name_bind;
                    allow wazuh_t xserver_port_t:tcp_socket name_bind;
                    allow wazuh_t zabbix_port_t:tcp_socket name_bind;
                    allow wazuh_t zarafa_port_t:tcp_socket name_bind;
                    allow wazuh_t zebra_port_t:tcp_socket name_bind;
                    allow wazuh_t zebra_port_t:udp_socket name_bind;
                    allow wazuh_t zented_port_t:tcp_socket name_bind;
                    allow wazuh_t zented_port_t:udp_socket name_bind;
                    allow wazuh_t zope_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_bos_port_t:udp_socket name_bind;
                    allow wazuh_t afs_fs_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_fs_port_t:udp_socket name_bind;
                    allow wazuh_t afs_ka_port_t:udp_socket name_bind;
                    allow wazuh_t afs_pt_port_t:tcp_socket name_bind;
                    allow wazuh_t afs_pt_port_t:udp_socket name_bind;
                    allow wazuh_t afs_vl_port_t:udp_socket name_bind;
                    allow wazuh_t amavisd_recv_port_t:tcp_socket name_bind;
                    allow wazuh_t amavisd_send_port_t:tcp_socket name_bind;
                    allow wazuh_t apertus_ldp_port_t:tcp_socket name_bind;
                    allow wazuh_t apertus_ldp_port_t:udp_socket name_bind;
                    allow wazuh_t boinc_client_port_t:tcp_socket name_bind;
                    allow wazuh_t boinc_client_port_t:udp_socket name_bind;
                    allow wazuh_t commplex_link_port_t:tcp_socket name_bind;
                    allow wazuh_t commplex_link_port_t:udp_socket name_bind;
                    allow wazuh_t commplex_main_port_t:tcp_socket name_bind;
                    allow wazuh_t commplex_main_port_t:udp_socket name_bind;
                    allow wazuh_t cyrus_imapd_port_t:tcp_socket name_bind;
                    allow wazuh_t dey_keyneg_port_t:tcp_socket name_bind;
                    allow wazuh_t dey_keyneg_port_t:udp_socket name_bind;
                    allow wazuh_t dey_sapi_port_t:tcp_socket name_bind;
                    allow wazuh_t fac_restore_port_t:tcp_socket name_bind;
                    allow wazuh_t fac_restore_port_t:udp_socket name_bind;
                    allow wazuh_t fmpro_internal_port_t:tcp_socket name_bind;
                    allow wazuh_t fmpro_internal_port_t:udp_socket name_bind;
                    allow wazuh_t ftp_data_port_t:tcp_socket name_bind;
                    allow wazuh_t gds_db_port_t:tcp_socket name_bind;
                    allow wazuh_t gds_db_port_t:udp_socket name_bind;
                    allow wazuh_t glance_registry_port_t:tcp_socket name_bind;
                    allow wazuh_t glance_registry_port_t:udp_socket name_bind;
                    allow wazuh_t hadoop_namenode_port_t:tcp_socket name_bind;
                    allow wazuh_t hi_reserved_port_t:tcp_socket name_bind;
                    allow wazuh_t hi_reserved_port_t:udp_socket name_bind;
                    allow wazuh_t http_cache_port_t:tcp_socket name_bind;
                    allow wazuh_t http_cache_port_t:udp_socket name_bind;
                    allow wazuh_t inetd_child_port_t:tcp_socket name_bind;
                    allow wazuh_t inetd_child_port_t:udp_socket name_bind;
                    allow wazuh_t jabber_client_port_t:tcp_socket name_bind;
                    allow wazuh_t jabber_interserver_port_t:tcp_socket name_bind;
                    allow wazuh_t jabber_router_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_debug_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_debug_port_t:udp_socket name_bind;
                    allow wazuh_t jboss_management_port_t:tcp_socket name_bind;
                    allow wazuh_t jboss_management_port_t:udp_socket name_bind;
                    allow wazuh_t jboss_messaging_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_admin_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_password_port_t:tcp_socket name_bind;
                    allow wazuh_t kerberos_password_port_t:udp_socket name_bind;
                    allow wazuh_t lsm_plugin_port_t:tcp_socket name_bind;
                    allow wazuh_t movaz_ssc_port_t:tcp_socket name_bind;
                    allow wazuh_t movaz_ssc_port_t:udp_socket name_bind;
                    allow wazuh_t ms_streaming_port_t:tcp_socket name_bind;
                    allow wazuh_t ms_streaming_port_t:udp_socket name_bind;
                    allow wazuh_t nodejs_debug_port_t:tcp_socket name_bind;
                    allow wazuh_t nodejs_debug_port_t:udp_socket name_bind;
                    allow wazuh_t nsd_control_port_t:tcp_socket name_bind;
                    allow wazuh_t oa_system_port_t:tcp_socket name_bind;
                    allow wazuh_t oa_system_port_t:udp_socket name_bind;
                    allow wazuh_t osapi_compute_port_t:tcp_socket name_bind;
                    allow wazuh_t pegasus_http_port_t:tcp_socket name_bind;
                    allow wazuh_t pegasus_https_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ca_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_kra_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ocsp_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_ra_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_tks_port_t:tcp_socket name_bind;
                    allow wazuh_t pki_tps_port_t:tcp_socket name_bind;
                    allow wazuh_t pktcable_cops_port_t:tcp_socket name_bind;
                    allow wazuh_t pktcable_cops_port_t:udp_socket name_bind;
                    allow wazuh_t postfix_policyd_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_modcluster_port_t:tcp_socket name_bind;
                    allow wazuh_t ricci_modcluster_port_t:udp_socket name_bind;
                    allow wazuh_t rtp_media_port_t:tcp_socket name_bind;
                    allow wazuh_t rtp_media_port_t:udp_socket name_bind;
                    allow wazuh_t sype_transport_port_t:tcp_socket name_bind;
                    allow wazuh_t sype_transport_port_t:udp_socket name_bind;
                    allow wazuh_t syslog_tls_port_t:tcp_socket name_bind;
                    allow wazuh_t syslog_tls_port_t:udp_socket name_bind;
                    allow wazuh_t us_cli_port_t:tcp_socket name_bind;
                    allow wazuh_t us_cli_port_t:udp_socket name_bind;
                    allow wazuh_t virtual_places_port_t:tcp_socket name_bind;
                    allow wazuh_t virtual_places_port_t:udp_socket name_bind;
                    allow wazuh_t wap_wsp_port_t:tcp_socket name_bind;
                    allow wazuh_t wap_wsp_port_t:udp_socket name_bind;
                    allow wazuh_t xodbc_connect_port_t:tcp_socket name_bind;
                    allow wazuh_t zabbix_agent_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_client_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_election_port_t:tcp_socket name_bind;
                    allow wazuh_t zookeeper_leader_port_t:tcp_socket name_bind;
                    allow wazuh_t embrace_dp_c_port_t:tcp_socket name_bind;
                    allow wazuh_t embrace_dp_c_port_t:udp_socket name_bind;

                    #============== Permissions for modulesd to run
                    allow wazuh_t self:netlink_route_socket {getattr open read create bind nlmsg_read};
                    allow wazuh_t self:netlink_tcpdiag_socket {create getattr setopt bind nlmsg_read};
                    allow wazuh_t sysfs_t:lnk_file read;
                    allow wazuh_t proc_net_t:file { getattr open read };

                    #============== Permissions for execd to run AR
                    allow wazuh_t self:capability { chown dac_override fowner fsetid kill net_bind_service net_raw setgid setuid sys_chroot sys_resource sys_ptrace};
                    allow wazuh_t etc_t:dir { getattr open read search write add_name remove_name};
                    allow sshd_t var_t:file { getattr create open append ioctl lock read setattr write};
                    allow wazuh_t firewalld_t:dbus send_msg;
                    allow firewalld_t wazuh_t:dbus send_msg;
                    allow wazuh_t firewalld_t:dir { getattr open read search };
                    allow wazuh_t firewalld_t:file { open read };
                    allow wazuh_t firewalld_t:process { getattr getpgid getsession signull };
                    allow wazuh_t sshd_net_t:dir { getattr open read search };
                    allow wazuh_t sshd_net_t:file { open read };
                    allow wazuh_t wazuh_tmp_t:dir { getattr open read search write create rmdir};
                    allow wazuh_t http_port_t:tcp_socket {name_bind name_connect write read};

                    #============== Permissions to assign new contexts
                    allow unconfined_t wazuh_var_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_var_t:file {getattr relabelto};
                    allow unconfined_t wazuh_var_t:sock_file {getattr open read relabelto};
                    allow unconfined_t wazuh_lib_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_lib_t:file {getattr relabelto};
                    allow unconfined_t wazuh_etc_t:dir {getattr open read search relabelto};
                    allow unconfined_t wazuh_etc_t:file {getattr relabelto};


The ``wazuhT.fc`` file defines the contexts for each folder and file within the Wazuh folder.

.. note::

    Note that in the definition of the contexts for each Wazuh folder the default installation folder (/var/ossec/) was used.

The ``wazuhT.te`` file is the main file of the module, where it is defined:

- The context ``wazuh_t`` to which the transition will be made and what ``source tag`` the executable file should have:

    .. code-block:: console

        domain_type(wazuh_t)
        domain_entry_file(wazuh_t, wazuh_exec_t)

- Definition of the ``wazuh_port_t`` type to which the ports used by Wazuh will be associated:

    .. code-block:: console

        type wazuh_port_t;
        corenet_port(wazuh_port_t)

- Creation of the necessary rules to allow the transition from an ``unconfined`` context to the ``wazuh_t`` context:

    .. code-block:: console

        allow unconfined_t wazuh_t : process transition;
        allow initrc_t wazuh_t : process transition;
        allow unconfined_service_t wazuh_t : process transition;
        allow unconfined_t wazuh_exec_t : file { execute read getattr };
        allow initrc_t wazuh_exec_t : file { execute read getattr };
        allow unconfined_service_t wazuh_exec_t : file { execute read getattr };
        allow wazuh_t bin_t : file { execute read getattr };
        allow wazuh_t wazuh_exec_t : file entrypoint;

        type_transition unconfined_t wazuh_exec_t : process wazuh_t;
        type_transition initrc_t wazuh_exec_t : process wazuh_t;
        type_transition unconfined_service_t wazuh_exec_t : process wazuh_t;

- Creation of the necessary rules for each Wazuh module to work correctly, for example:

    - wazuh-logcollector: these rules, for example, allow ``wazuh-logcollector`` to read log files tagged with the ``auditd_log_t`` label.

    .. code-block:: console

        allow wazuh_t auditd_log_t:dir { getattr open read search};
        allow wazuh_t auditd_log_t:file { getattr open read };
        allow wazuh_t faillog_t:file { getattr open read };
        allow wazuh_t samba_log_t:dir { getattr open read search};
        allow wazuh_t samba_log_t:file { getattr open read };
        ...

    - wazuh-remoted: these rules allow ``wazuh-remoted`` to use ``tcp/udp`` sockets to communicate with agents.

    .. code-block:: console

        allow wazuh_t wazuh_port_t:tcp_socket {name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
        allow wazuh_t wazuh_t:tcp_socket {accept bind name_connect name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
        allow wazuh_t wazuh_port_t:udp_socket {name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};
        allow wazuh_t wazuh_t:udp_socket {accept name_bind create read write connect recvfrom sendto send_msg setopt ioctl setattr getattr};

    - wazuh-syscheckd: as syscheckd monitors by default folders such as ``/etc`` ``/usr`` it is necessary to give it the necessary access permissions for each type of file present in the directory and subdirectory, some of these permissions are as follows:

    .. code-block:: console

        allow wazuh_t var_t:dir { getattr open read search};
        allow wazuh_t var_t:file { getattr open read };
        allow wazuh_t system_map_t:file { getattr open read };
        allow wazuh_t fs_t:filesystem { getattr open read };
        allow wazuh_t NetworkManager_etc_t:dir { getattr open read search};
        allow wazuh_t NetworkManager_exec_t:file { getattr open read };
        allow wazuh_t adjtime_t:file { getattr open read };
        allow wazuh_t admin_home_t:dir read;
        allow wazuh_t admin_passwd_exec_t:file { getattr open read };
        allow wazuh_t anacron_exec_t:file { getattr open read };
        ...

    In the case of rootcheck, as one of its functions monitors the open ports, we must allow to check each port:

    .. code-block:: console

        allow wazuh_t afs3_callback_port_t:tcp_socket name_bind;
        allow wazuh_t afs3_callback_port_t:udp_socket name_bind;
        allow wazuh_t ibm_dt_2_port_t:tcp_socket name_bind;
        allow wazuh_t ibm_dt_2_port_t:udp_socket name_bind;
        allow wazuh_t l2tp_port_t:tcp_socket name_bind;
        allow wazuh_t l2tp_port_t:udp_socket name_bind;
        ...

    Other rules were added to allow the execution of AR such as:
    
    To allow host-deny execution:

    .. code-block:: console

        allow wazuh_t etc_t:dir { getattr open read search write add_name remove_name};

    To allow firewalld-drop execution:

    .. code-block:: console

        allow wazuh_t firewalld_t:dbus send_msg;
        allow firewalld_t wazuh_t:dbus send_msg;
        allow wazuh_t firewalld_t:dir { getattr open read search };
        allow wazuh_t firewalld_t:file { open read };
        allow wazuh_t firewalld_t:process { getattr getpgid getsession signull };
        allow wazuh_t sshd_net_t:dir { getattr open read search };
        allow wazuh_t sshd_net_t:file { open read };

    To allow wazuh-slack execution:

    .. code-block:: console

        allow wazuh_t wazuh_tmp_t:dir { getattr open read search write create rmdir};
        allow wazuh_t http_port_t:tcp_socket {name_bind name_connect write read};

    .. note::

        These are some of the many rules necessary for Wazuh to run. The above categorization by module is for illustrative purposes only, as many of the rules are shared by different Wazuh modules.


Steps to build and load the new SELinux policy module
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#. Install required dependencies:

    .. code-block:: bash

        # yum install -y selinux-policy-devel gcc make

#. Stop Wazuh:

    .. code-block:: bash

        # systemctl stop wazuh-manager

#. Verify current ``SELinux`` state:

    .. code-block:: bash

        # getenforce
        Permissive

    In case the ``SELinux`` status is ``Enforcing`` we must change it to ``Permissive`` momentarily:

        .. code-block:: bash

            # setenforce 0

#. Create the directory for the files ``wazuhT.te`` ``wazuhT.fc`` and ``wazuhT.if``:

    .. code-block:: bash

        # mkdir selinux-wazuh && cd selinux-wazuh

#. Create the files ``wazuhT.te`` ``wazuhT.fc`` and ``wazuhT.if`` and compile the module:

    .. code-block:: bash

        # make -f /usr/share/selinux/devel/Makefile

#. Install the new policy module:

    .. code-block:: bash

        # semodule -i wazuhT.pp

#. Check that it has been loaded correctly:

    .. code-block:: bash

        # semodule -l | grep wazuhT
        wazuhT 1.0

#. Run ``restorecon`` to assign the new tags defined in the ``wazuhT.fc`` file to existing files in the Wazuh directory:

    .. code-block:: bash

        # restorecon -RFvv /var/ossec/

#. Verify that the files have the appropriate contexts:

    .. code-block:: bash

        # ls -lZ /var/ossec/bin/

#. Assign the port numbers used by wazuh to the context wazuh_port_t:

    .. code-block:: bash

        # semanage port -a -t wazuh_port_t -p tcp 1514
        # semanage port -a -t wazuh_port_t -p udp 1514

    .. note::

        In case of manager you must add port 1515 used by **authd** and 1516 which is used by **wazuh-clusterd**.
    

#. Change SELinux to Enforcing:

    .. code-block:: bash

        # setenforce 1

#. Start Wazuh:

    .. code-block:: bash

        # systemctl start wazuh-manager

By running the command ``ps auxZ | grep wazuh`` we can see that Wazuh is running with the new context ``wazuh_t``:

    .. code-block:: bash

        ps auxZ | grep wazuh
        system_u:system_r:wazuh_t:s0   wazuh    18239  8.2 16.5 435332 82744 ?        Sl   18:50   0:09 /var/ossec/framework/python/bin/python3 /var/ossec/api/scripts/wazuh-apid.py
        system_u:system_r:wazuh_t:s0   root     18281  0.0  0.3 191524  1540 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-authd
        system_u:system_r:wazuh_t:s0   wazuh    18298  0.6  1.3 641364  6588 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-db
        system_u:system_r:wazuh_t:s0   root     18322  0.0  0.2  35888  1236 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-execd
        system_u:system_r:wazuh_t:s0   wazuh    18337  3.0 16.2 755924 80936 ?        Sl   18:50   0:03 /var/ossec/bin/wazuh-analysisd
        system_u:system_r:wazuh_t:s0   root     18350 21.5  0.9 349040  4528 ?        SNl  18:50   0:24 /var/ossec/bin/wazuh-syscheckd
        system_u:system_r:wazuh_t:s0   wazuh    18367  0.3  0.3 520512  1840 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-remoted
        system_u:system_r:wazuh_t:s0   root     18409  0.4  0.8 478308  4172 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-logcollector
        system_u:system_r:wazuh_t:s0   wazuh    18429  0.0  0.2  35860  1192 ?        Sl   18:50   0:00 /var/ossec/bin/wazuh-monitord
        system_u:system_r:wazuh_t:s0   root     18442  5.1  1.3 714180  6840 ?        Sl   18:50   0:05 /var/ossec/bin/wazuh-modulesd


Troubleshooting
---------------

Create missing rules
^^^^^^^^^^^^^^^^^^^^
It is possible that more rules may need to be added, as it depends on what applications are installed in the environment as well as what is being monitored.

#. Check which action is being blocked:

    .. code-block:: bash

        # grep denied /var/log/audit/audit.log | ausearch -i
        ...
        type=AVC msg=audit(11/19/2021 13:45:23.239:486) : avc:  denied  { search } for  pid=1944 comm=wazuh-modulesd name=960 dev="proc" ino=17328 scontext=system_u:system_r:wazuh_t:s0 tcontext=system_u:system_r:sshd_net_t:s0-s0:c0.c1023 tclass=dir permissive=0
        ...

#. Create the rule to allow the blocked action:
    
    **Manually:**
        - It is possible to create a new rule and add it to the wazuhT.te file:

            .. code-block:: console

                allow wazuh_t sshd_net_t:dir search;

        - Re-compile and install the policy module:

            .. code-block:: bash

                # make -f /usr/share/selinux/devel/Makefile
                # semodule -i wazuhT.pp

    **Using audit2allow tool:**
        It is also possible to create the rules with the ``audit2allow tool``, this tool takes the logged AVCs in the ``/var/log/audit/audit.log`` file and creates the necessary rules. It is possible to filter the logs, for example by date and time:

            .. code-block:: bash

                # ausearch -m AVC --start 11/08/2021 19:58:19 --end 11/08/2021 23:58:19 | audit2allow -a -M test_audit

        Install the new module:

            .. code-block:: bash

                # semodule -i test_audit.pp

Delete module and restore context
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In case you need to restore the file context to the state prior to the installation of the wazuhT module

#. Delete assigned ports:

    .. code-block:: bash

        # semanage port -d -p tcp 1514
        # semanage port -d -p udp 1514

#. Delete the loaded module:

    .. code-block:: bash

        # semodule -d wazuhT

#. Execute restorecon:

    .. code-block:: bash

        # restorecon -RFvv /var/ossec/
