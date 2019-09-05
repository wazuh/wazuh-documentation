const redirects = [];

/* Insert a Wazuh API entry automatically */
redirects.push({
  '3.9': '/installation-guide/installing-elastic-stack/automatic_api.html',
  '3.8': '/installation-guide/installing-wazuh-server/automatic_api.html',
  '3.7': '/installation-guide/optional-configurations/automatic-api.html',
});

/* Elasticsearch tuning */
redirects.push({
  '3.9': '/installation-guide/installing-elastic-stack/elastic_tuning.html',
  '3.7': '/installation-guide/optional-configurations/elastic-tuning.html',
});

/* Setting up SSL for Filebeat and Logstash */
redirects.push({
  '3.8': '/installation-guide/installing-elastic-stack/elastic_ssl.html',
  '3.7': '/installation-guide/optional-configurations/elastic_ssl.html',
});

/* NGINX SSL and authentication for Kibana */
redirects.push({
  '3.9': '/installation-guide/installing-elastic-stack/protect-installation/kibana_ssl.html',
  '3.8': '/installation-guide/installing-elastic-stack/kibana_ssl.html',
  '3.7': '/installation-guide/optional-configurations/kibana_ssl.html',
});

/* Securing the Wazuh API */
redirects.push({
  '3.9': '/installation-guide/securing_api.html',
  '3.8': '/installation-guide/installing-wazuh-server/securing_api.html',
  '3.7': '/installation-guide/optional-configurations/securing-api.html',
});

/* Considerations for configuration */
redirects.push({
  '3.9': '/amazon/configuration/considerations.html',
  '3.7': '/amazon/installation.html#considerations-for-configuration',
});

/* Installing dependencies */
redirects.push({
  '3.9': '/amazon/configuration/dependencies.html',
  '3.7': '/amazon/installation.html#installing-dependencies',
});

/* Configuring AWS credentials */
redirects.push({
  '3.9': '/amazon/configuration/credentials.html',
  '3.7': '/amazon/installation.html#authenticating-options',
});

/* Windows */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/windows/',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_windows.html',
});

/* Linux */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/linux/',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_linux.html',
});

/* AIX */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/aix/',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_aix.html',
});

/* HPUX */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/hpux/',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_hpux.html',
});

/* Solaris */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/solaris/',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_solaris.html',
});

/* Install Wazuh Manager */
redirects.push({
  '3.9': '/deploying-with-ansible/guide/install-wazuh-manager.html',
  '3.8': '/deploying-with-ansible/guide/install-wazuh-server.html',
});

/* Installing Wazuh server */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-manager/',
  '3.8': '/installation-guide/installing-wazuh-server/',
});

/* Install Wazuh server Components */
redirects.push({
  '3.9': '/learning-wazuh/build-lab/install-wazuh-manager.html',
  '3.8': '/learning-wazuh/build-lab/install-wazuh-server.html',
});

/* Installing Splunk */
redirects.push({
  '3.9': '/installation-guide/installing-splunk',
  '3.8': '/installing-splunk',
  '3.5': '/installation-guide/installing-splunk',
});

/* Installing Splunk */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/',
  '3.8': '/installing-splunk/',
  '3.5': '/installation-guide/installing-splunk/',
});

/* Install Wazuh app for Splunk */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-app.html',
  '3.8': '/installing-splunk/splunk-app.html',
  '3.6': '/installing-splunk/splunk_wazuh.html',
  '3.5': '/installation-guide/installing-splunk/splunk_wazuh.html',
});

/* Install Splunk in single-instance mode */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-basic.html',
  '3.7': '/installing-splunk/splunk-basic.html',
});

/* Installing & Configuring Splunk Cluster */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-distributed.html',
  '3.8': '/installing-splunk/splunk-distributed.html',
});

/* Install and configure Splunk Forwarder */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-forwarder.html',
  '3.8': '/installing-splunk/splunk-forwarder.html',
});

/* Customize agents status indexation */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-polling.html',
  '3.8': '/installing-splunk/splunk-polling.html',
});

/* Setting up reverse proxy configuration for Splunk */
redirects.push({
  '3.9': '/installation-guide/installing-splunk/splunk-reverse-proxy.html',
  '3.8': '/installing-splunk/splunk-reverse-proxy.html',
  '3.6': '/installing-splunk/splunk_reverse_proxy.html',
});

/* Upgrading Wazuh */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/',
  '3.8': '/installation-guide/upgrading/',
});

/* Search Guard */
redirects.push({
  '3.9': '/installation-guide/installing-elastic-stack/protect-installation/searchguard.html',
  '3.8': '/installation-guide/installing-elastic-stack/searchguard.html',
});

/* AIX from package */
redirects.push({
  '3.9': '/installation-guide/installing-wazuh-agent/aix/wazuh_agent_package_aix.html',
  '3.8': '/installation-guide/installing-wazuh-agent/wazuh_agent_aix.html',
});

/* Upgrade from different major version */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/different_major.html',
  '3.8': '/installation-guide/upgrading/different_major.html',
});

/* Upgrade from the same major version (3.x) */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/latest_wazuh3_minor.html',
  '3.8': '/installation-guide/upgrading/latest_wazuh3_minor.html',
});

/* Restore Wazuh alerts from Wazuh 2.x */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/restore_alerts.html',
  '3.8': '/installation-guide/upgrading/restore_alerts.html',
});

/* Upgrading from a legacy version */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/legacy/',
  '3.8': '/installation-guide/upgrading/legacy/',
});

/* Upgrading Elastic Stack server */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/legacy/upgrading-elastic-stack.html',
  '3.8': '/installation-guide/upgrading/legacy/upgrading-elastic-stack.html',
});

/* Upgrading Wazuh agents */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/legacy/upgrading-wazuh-agent.html',
  '3.8': '/installation-guide/upgrading/legacy/upgrading-wazuh-agent.html',
});

/* Upgrading Wazuh server */
redirects.push({
  '3.9': '/upgrade-guide/upgrading/legacy/upgrading-wazuh-manager.html',
  '3.8': '/installation-guide/upgrading/legacy/upgrading-wazuh-server.html',
});
