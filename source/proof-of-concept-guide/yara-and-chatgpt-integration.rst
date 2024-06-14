.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to integrate YARA with ChatGPT to detect when a malicious file is downloaded to a monitored endpoint in this proof of concept.

YARA and ChatGPT integration for alert enrichment
=================================================

YARA is a tool that detects and classifies malware artifacts. While YARA can identify known patterns and signatures of malicious activity, human intervention is often required to interpret and contextualize the output of YARA scans. ChatGPT is a generative AI chatbot developed by OpenAI. It can analyze and enrich YARA alerts with additional context, providing security teams with deeper insights into the nature and severity of detected threats.

In this use case, we integrate YARA with ChatGPT to detect when a malicious file is downloaded to a monitored endpoint. The integration enriches YARA alerts with insights from ChatGPT about the potential incident. It also automatically responds by deleting the malicious file.

Infrastructure
--------------

============== ====================================================================================================================================
Endpoint       Description                                                                                                                         
============== ====================================================================================================================================
Ubuntu 22.04   Monitored endpoint configured with Wazuh File Integrity Monitoring (FIM) module and YARA integration with ChatGPT log enrichment.
Windows 11     Monitored endpoint configured with Wazuh File Integrity Monitoring (FIM) module and YARA integration with ChatGPT log enrichment.
============== ====================================================================================================================================

Configuration
-------------

Perform the following steps to set up the YARA and ChatGPT integration. Choose either Ubuntu or Windows configuration depending on the operating system of the monitored endpoint.

Ubuntu 22.04 endpoint
^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to install YARA and configure the active response and FIM modules.

#. Download, compile, and install YARA:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install -y make gcc autoconf libtool libssl-dev pkg-config jq
      $ sudo curl -LO https://github.com/VirusTotal/yara/archive/v4.5.1.tar.gz
      $ sudo tar -xvzf v4.5.1.tar.gz -C /usr/local/bin/ && rm -f v4.5.1.tar.gz
      $ cd /usr/local/bin/yara-4.5.1/
      $ sudo ./bootstrap.sh && sudo ./configure && sudo make && sudo make install && sudo make check
      $ sudo ldconfig

#. Test that YARA is running properly:

   .. code-block:: console

      $ yara

   .. code-block:: none
      :class: output

      yara: wrong number of arguments
      Usage: yara [OPTION]... [NAMESPACE:]RULES_FILE... FILE | DIR | PID

      Try `--help` for more options

#. Download YARA detection rules using valhallaAPI. Valhalla is a YARA and Sigma rule `repository <https://valhalla.nextron-systems.com/>`__ provided by Nextron Systems:

   .. code-block:: console

      $ sudo mkdir -p /var/ossec/active-response/yara/rules
      $ sudo curl 'https://valhalla.nextron-systems.com/api/v1/get' \
      -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
      -H 'Accept-Language: en-US,en;q=0.5' \
      --compressed \
      -H 'Referer: https://valhalla.nextron-systems.com/' \
      -H 'Content-Type: application/x-www-form-urlencoded' \
      -H 'DNT: 1' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' \
      --data 'demo=demo&apikey=1111111111111111111111111111111111111111111111111111111111111111&format=text' \
      -o /var/ossec/active-response/yara/rules/yara_rules.yar

#. Change the owner of the ``yara_rules.yar`` file to ``root:wazuh``, and the file permissions to ``750``:

   .. code-block:: console

      $ sudo chown root:wazuh /var/ossec/active-response/yara/rules/yara_rules.yar
      $ sudo chmod 750 /var/ossec/active-response/yara/rules/yara_rules.yar

   .. note::
      
      If you use a custom YARA rule, ensure that the description field in the YARA rule metadata is present as this field is required to enrich the alert with ChatGPT.

#. Create a script ``yara.sh`` in the ``/var/ossec/active-response/bin/`` directory. This script runs YARA scans on files added or modified in the monitored directories. It also queries ChatGPT to enrich the logs and attempts to remove malware files detected by YARA. 

   Replace ``<API_KEY>`` with your `OpenAI API key <https://platform.openai.com/docs/quickstart>`__ and ``<OPENAI_MODEL>`` with your preferred `OpenAI model <https://platform.openai.com/docs/models>`__. The model used in this POC guide is *gpt-4-turbo*:

   .. code-block:: bash
      :emphasize-lines: 14,15

      #!/bin/bash
      # Wazuh - YARA active response
      # Copyright (C) 2015-2024, Wazuh Inc.
      #
      # This program is free software; you can redistribute it
      # and/or modify it under the terms of the GNU General Public
      # License (version 2) as published by the FSF - Free Software
      # Foundation.


      #------------------------- Configuration -------------------------#

      # ChatGPT API key
      API_KEY="<API_KEY>"
      OPENAI_MODEL="<OPENAI_MODEL>" #for example gpt-4-turbo


      # Set LOG_FILE path
      LOG_FILE="logs/active-responses.log"

      #------------------------- Gather parameters -------------------------#

      # Extra arguments
      read INPUT_JSON
      YARA_PATH=$(echo $INPUT_JSON | jq -r .parameters.extra_args[1])
      YARA_RULES=$(echo $INPUT_JSON | jq -r .parameters.extra_args[3])
      FILENAME=$(echo $INPUT_JSON | jq -r .parameters.alert.syscheck.path)

      size=0
      actual_size=$(stat -c %s ${FILENAME})
      while [ ${size} -ne ${actual_size} ]; do
          sleep 1
          size=${actual_size}
          actual_size=$(stat -c %s ${FILENAME})
      done

      #----------------------- Analyze parameters -----------------------#

      if [[ ! $YARA_PATH ]] || [[ ! $YARA_RULES ]]
      then
          echo "wazuh-YARA: ERROR - YARA active response error. YARA path and rules parameters are mandatory." >> ${LOG_FILE}
          exit 1
      fi

      #------------------------- Main workflow --------------------------#

      # Execute YARA scan on the specified filename
      YARA_output="$("${YARA_PATH}"/yara -w -r -m "$YARA_RULES" "$FILENAME")"

      if [[ $YARA_output != "" ]]
      then
          # Attempt to delete the file if any YARA rule matches
          if rm -rf "$FILENAME"; then
              echo "wazuh-YARA: INFO - Successfully deleted $FILENAME" >> ${LOG_FILE}
          else
              echo "wazuh-YARA: INFO - Unable to delete $FILENAME" >> ${LOG_FILE}
          fi

          # Flag to check if API key is invalid
          api_key_invalid=false

          # Iterate every detected rule
          while read -r line; do
              # Extract the description from the line using regex
              description=$(echo "$line" | grep -oP '(?<=description=").*?(?=")')
              if [[ $description != "" ]]; then
                  # Prepare the message payload for ChatGPT
                  payload=$(jq -n \
                      --arg desc "$description" \
                      --arg model "$OPENAI_MODEL" \
                      '{
                          model: $model,
                          messages: [
                              {
                                  role: "system",
                                  content: "In one paragraph, tell me about the impact and how to mitigate \($desc)"
                              }
                          ],
                          temperature: 1,
                          max_tokens: 256,
                          top_p: 1,
                          frequency_penalty: 0,
                          presence_penalty: 0
                      }')

                  # Query ChatGPT for more information
                  chatgpt_response=$(curl -s -X POST "https://api.openai.com/v1/chat/completions" \
                      -H "Content-Type: application/json" \
                      -H "Authorization: Bearer $API_KEY" \
                      -d "$payload")

                  # Check for invalid API key error
                  if echo "$chatgpt_response" | grep -q "invalid_request_error"; then
                      api_key_invalid=true
                      echo "wazuh-YARA: ERROR - Invalid ChatGPT API key" >> ${LOG_FILE}
                      # Log Yara scan result without ChatGPT response
                      echo "wazuh-YARA: INFO - Scan result: $line | chatgpt_response: none" >> ${LOG_FILE}
                  else
                      # Extract the response text from ChatGPT API response
                      response_text=$(echo "$chatgpt_response" | jq -r '.choices[0].message.content')

                      # Check if the response text is null and handle the error
                      if [[ $response_text == "null" ]]; then
                          echo "wazuh-YARA: ERROR - ChatGPT API returned null response: $chatgpt_response" >> ${LOG_FILE}
                      else
                          # Combine the YARA scan output and ChatGPT response
                          combined_output="wazuh-YARA: INFO - Scan result: $line | chatgpt_response: $response_text"

                          # Append the combined output to the log file
                          echo "$combined_output" >> ${LOG_FILE}
                      fi
                  fi
              else
                  echo "wazuh-YARA: INFO - Scan result: $line" >> ${LOG_FILE}
              fi
          done <<< "$YARA_output"

          # If API key was invalid, log a specific message
          if $api_key_invalid; then
              echo "wazuh-YARA: INFO - API key is invalid. ChatGPT response omitted." >> ${LOG_FILE}
          fi
      else
          echo "wazuh-YARA: INFO - No YARA rule matched." >> ${LOG_FILE}
      fi

      exit 0;

   .. note::
   
      If the supplied ``<API_KEY>`` is invalid, Wazuh triggers an alert with the value of the ``chatgpt_response`` field set to None. Logs about the invalid API key are in the ``/var/ossec/logs/active-responses.log`` file.

#. Change the owner of the ``yara.sh`` script to ``root:wazuh``, and the file permissions to ``750``:

   .. code-block:: console

      $ sudo chown root:wazuh /var/ossec/active-response/bin/yara.sh
      $ sudo chmod 750 /var/ossec/active-response/bin/yara.sh

#. Add the following within the ``<syscheck>`` block of the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file to monitor the ``/tmp/yara/malware`` directory:

   .. code-block:: xml

      <directories realtime="yes">/tmp</directories>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Windows 11 endpoint
-------------------

Perform the following steps to install Python, YARA, and download YARA rules.

#. Download the Python executable installer from the `official Python website <https://www.python.org/downloads/windows/>`__.
#. Run the Python installer once downloaded, and make sure to check the following boxes:

   -  ``Install launcher for all users``
   -  ``Add python.exe to PATH``. This places the Python interpreter in the execution path.

#. Download and install the latest `Visual C++ Redistributable package <https://aka.ms/vs/17/release/vc_redist.x64.exe>`__.
#. Open PowerShell with administrator privileges to download and extract YARA:

   .. code-block::powershell

      > Invoke-WebRequest -Uri https://github.com/VirusTotal/yara/releases/download/v4.5.1/yara-master-2298-win64.zip -OutFile yara-master-2298-win64.zip
      > Expand-Archive yara-master-2298-win64.zip; Remove-Item yara-master-2298-win64.zip

#. Create a directory called ``C:\Program Files (x86)\ossec-agent\active-response\bin\yara\`` and copy the YARA executable into it:

   .. code-block::powershell

      > mkdir 'C:\Program Files (x86)\ossec-agent\active-response\bin\yara\'
      > cp .\yara-master-2298-win64\yara64.exe 'C:\Program Files (x86)\ossec-agent\active-response\bin\yara\'

#. Download YARA rules using valhallaAPI. Valhalla is a YARA and Sigma rule `repository <https://valhalla.nextron-systems.com/>`__ provided by Nextron Systems:

   .. code-block::powershell

      > python -m pip install valhallaAPI
      > python -c "from valhallaAPI.valhalla import ValhallaAPI; v = ValhallaAPI(api_key='1111111111111111111111111111111111111111111111111111111111111111'); response = v.get_rules_text(); open('yara_rules.yar', 'w').write(response)"
      > mkdir 'C:\Program Files (x86)\ossec-agent\active-response\bin\yara\rules\'
      > cp yara_rules.yar 'C:\Program Files (x86)\ossec-agent\active-response\bin\yara\rules\'

   .. note::
      
      If you use a custom YARA rule, ensure that the description field in the YARA rule metadata is present, as this field is required to enrich the alert with ChatGPT.

#. Create a script ``yara.py`` in the ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory. This script runs a YARA scan against any file modified or added to the monitored directory. It also queries ChatGPT to enrich the logs and attempts to remove malware files detected by YARA. Replace ``<API_KEY>`` with your `OpenAI API key <https://platform.openai.com/docs/quickstart>`__ and ``<OPENAI_MODEL>`` with your preferred `OpenAI model <https://platform.openai.com/docs/models>`__. The model used in this POC guide is *gpt-4-turbo*:

   .. code-block:: python
      :emphasize-lines: 7,8

      import os
      import subprocess
      import json
      import re
      import requests

      API_KEY = '<API_KEY>'
      OPENAI_MODEL='<OPENAI_MODEL>' #for example gpt-4-turbo

      # Determine OS architecture and set log file path
      if os.environ['PROCESSOR_ARCHITECTURE'].endswith('86'):
          log_file_path = os.path.join(os.environ['ProgramFiles'], 'ossec-agent', 'active-response', 'active-responses.log')
      else:
          log_file_path = os.path.join(os.environ['ProgramFiles(x86)'], 'ossec-agent', 'active-response', 'active-responses.log')

      def log_message(message):
          with open(log_file_path, 'a') as log_file:
              log_file.write(message + '\n')

      def read_input():
          return input()

      def get_syscheck_file_path(json_file_path):
          with open(json_file_path, 'r') as json_file:
              data = json.load(json_file)
              return data['parameters']['alert']['syscheck']['path']

      def run_yara_scan(yara_exe_path, yara_rules_path, syscheck_file_path):
          try:
              result = subprocess.run([yara_exe_path, '-m', yara_rules_path, syscheck_file_path], capture_output=True, text=True)
              return result.stdout.strip()
          except Exception as e:
              log_message(f"Error running Yara scan: {str(e)}")
              return None

      def extract_description(yara_output):
          match = re.search(r'description="([^"]+)"', yara_output)
          if match:
              return match.group(1)
          else:
              return None

      def query_chatgpt(description):
          headers = {
              'Authorization': f'Bearer {API_KEY}',
              'Content-Type': 'application/json'
          }
          data = {
              'model': OPENAI_MODEL,
              'messages': [{'role': 'system', 'content': f'In one paragraph, tell me about the impact and how to mitigate {description}'}],
              'temperature': 1,
              'max_tokens': 256,
              'top_p': 1,
              'frequency_penalty': 0,
              'presence_penalty': 0
          }
          response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
          if response.status_code == 200:
              return response.json()['choices'][0]['message']['content']
          elif response.status_code == 401:  # Unauthorized (invalid API key)
              log_message("wazuh-yara: ERROR - Invalid ChatGPT API key")
              return None
          else:
              log_message(f"Error querying ChatGPT: {response.status_code} {response.text}")
              return None

      def main():
          json_file_path = r"C:\Program Files (x86)\ossec-agent\active-response\stdin.txt"
          yara_exe_path = r"C:\Program Files (x86)\ossec-agent\active-response\bin\yara\yara64.exe"
          yara_rules_path = r"C:\Program Files (x86)\ossec-agent\active-response\bin\yara\rules\yara_rules.yar"

          input_data = read_input()

          with open(json_file_path, 'w') as json_file:
              json_file.write(input_data)

          syscheck_file_path = get_syscheck_file_path(json_file_path)

          yara_output = run_yara_scan(yara_exe_path, yara_rules_path, syscheck_file_path)
          if yara_output is not None:
              description = extract_description(yara_output)

              if description:
                  chatgpt_response = query_chatgpt(description)
                  if chatgpt_response:
                      combined_output = f"wazuh-yara: INFO - Scan result: {yara_output} | chatgpt_response: {chatgpt_response}"
                      log_message(combined_output)
                  else:
                      # Log the Yara scan result without the ChatGPT response
                      log_message(f"wazuh-yara: INFO - Scan result: {yara_output} | chatgpt_response: None")

                  # Delete the scanned file if a description is found
                  try:
                      os.remove(syscheck_file_path)
                      if not os.path.exists(syscheck_file_path):
                          log_message(f"wazuh-yara: INFO - Successfully deleted {syscheck_file_path}")
                      else:
                          log_message(f"wazuh-yara: INFO - Unable to delete {syscheck_file_path}")
                  except Exception as e:
                      log_message(f"Error deleting file: {str(e)}")
              else:
                  log_message("Failed to extract description from Yara output.")
          else:
              log_message("Yara scan returned no output.")

      if __name__ == "__main__":
          main()


   .. note::
      
      If the supplied ``<API_KEY>`` is invalid, Wazuh triggers an alert with the value of the ``chatgpt_response`` field set to ``None``. You can find logs about the invalid API key in the ``C:\Program Files (x86)\ossec-agent\active-response\active-response.log`` file.

#. Run the following command using PowerShell to convert the ``yara.py`` script to an executable file:

   .. code-block:: powershell

      > pip install pyinstaller
      > pyinstaller -F "C:\Program Files (x86)\ossec-agent\active-response\bin\yara.py"

   This creates a ``yara.exe`` executable in the ``C:\Users\<USER>\dist\`` directory.

   .. note::

      If you run the above commands as Administrator, the executable file will be in the ``C:\Windows\System32\dist`` directory.

#. Copy the ``yara.exe`` executable file to ``C:\Program Files (x86)\ossec-agent\active-response\bin\`` directory on the monitored endpoint.
#. Add the following within the ``<syscheck>`` block of the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file to monitor the Users directory:

   .. code-block:: xml

      <directories realtime="yes">C:\users</directories>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: powershell

      > Restart-Service -Name wazuh

Wazuh server
------------
