###############################################################################
#
# Generate redirects map
#
# This code generate a map with the redirections processed according to the
# content of the file source/_static/js/redirects.js.
# 
# This code should only run when the is_latest_release == True an the 
# resulting file should be excluded from the repository
#

import read_redirects_js as rd
import re
from urllib.parse import quote, unquote
from urllib.request import urlretrieve
import os
import json

dirname = os.path.dirname(__file__)
redirects_file = os.path.join(dirname, '../../_static/js/redirects.js')
json_file_name = 'redirects-map-updates.json'
redirects_json_file = os.path.join(dirname, '../../' + json_file_name)

[rd_betaVersions,rd_versions,rd_newUrls,rd_removedUrls,rd_redirections] = rd.read_redirects_js(redirects_file)

normalizeOptions = {"strip_query":True}

def processURLs():
  # Expand URLs: {"4.14": "/path/to/file.html"} -> ["4.14/path/to/file.html"]
  newUrls = []
  for release in rd_newUrls:
    for path in rd_newUrls[release]:
      newUrls.append([release.strip(), normalizeUrl(path,normalizeOptions)])
      
  removedUrls = []
  for release in rd_removedUrls:
    for path in rd_removedUrls[release]:
      removedUrls.append([release.strip(), normalizeUrl(path,normalizeOptions)])

  backward_redirections = []
  forward_redirections = []

  for redirect in rd_redirections:
    for target in redirect["target"]:
      r_from, r_to = target.split('=>')
      r_from = r_from.strip()
      r_to = r_to.strip()
      redirect_parts = [r_from, normalizeUrl(redirect[r_from], {}), r_to.strip(), normalizeUrl(redirect[r_to], {})]
      if compareVersions(r_from,r_to) == 1 and redirect_parts not in forward_redirections:
        forward_redirections.append(redirect_parts)
      if compareVersions(r_from,r_to) == -1 and redirect_parts not in backward_redirections:
        if redirect_parts not in backward_redirections:
          backward_redirections.append(redirect_parts)
  
  if "strip_query" in normalizeOptions and normalizeOptions["strip_query"] == True:
    # Discard possible ambiguous redirects due to query string removal
    forward_redirections = discard_repeated_starting_base_urls(forward_redirections, removedUrls)
    for redir in forward_redirections:
      redir[1] = normalizeUrl(redir[1],normalizeOptions)

  return [newUrls, removedUrls, forward_redirections, backward_redirections]

def discard_repeated_starting_base_urls(redirections, removed):
  # List of all starting URLs
  removed_urls = []
  final_redirections = []
  for rem_redir in removed:
    removed_urls.append(rem_redir[1])

  start_urls = []
  for redir in redirections:
    start_urls.append(redir[1])
  
  # Get list of discardable URLs: the ones tha has a base URL existing
  discarded_paths = []
  no_base = []
  for redir in redirections:
    split_path = redir[1].split('#')
    if len(split_path) == 2:
      if  split_path[0] in start_urls:
        discarded_paths.append(redir[1])
      else:
        no_base.append(redir)

  for redir in redirections:
    if redir[1] not in discarded_paths:
      final_redirections.append(redir)

  return final_redirections

def compareVersions(first,second):
  """ 
  Compare 2 versions with the format x.y 
  Results:
  -1 -> first > second, i.e.: 4.10 > 3.10
  0  -> first = seconde (same release) i.e.: 4.14 = 4.14
  1  -> first < second, i.e.: 3.13 < 4.14
  """
  first = first.split('.')
  second = second.split('.')

  if not first[0].isnumeric() or not first[1].isnumeric() or not second[0].isnumeric() or not second[1].isnumeric():
    return False
  else:
    first[0] = int(first[0])
    first[1] = int(first[1])
    second[0] = int(second[0])
    second[1] = int(second[1])

  if first[0] > second[0]:
    return -1
  if first[0] < second[0]:
    return 1
  if first[0] == second[0]:
    # the mayor is the same
    if first[1] > second[1]:
      return -1
    if first[1] < second[1]:
      return 1
    if first[1] == second[1]:
      return 0

def normalizeUrl(originalUrl, options = {}):
  """
  Normalize a given URL so it comply with a standard format
  Defined options:
  - strip_query bool If true, remove query string from the path
  """
  normalizedURL = ""
  if isinstance(originalUrl, str):
    normalizedURL = originalUrl.strip()
    normalizedURL = re.sub(r'/$', '/index.html',normalizedURL)
    normalizedURL = re.sub(r'/{2,}', '/',normalizedURL)

    if normalizedURL.endswith('#'):
      normalizedURL = normalizedURL[:-1]

    if not normalizedURL.endswith('/') and not re.search(r'(\.html|#.*)$', normalizedURL):
        normalizedURL += '/'

    if not normalizedURL.startswith('/'):
      normalizedURL = '/'+normalizedURL

    if not check_encode_uri(normalizedURL):
      # safe parameter preserves standard URL characters, matching JS encodeURI()
      normalizedURL = quote(normalizedURL, safe="~@#$&()*!+=:;,?/'")
    
    if "strip_query" in options:
      normalizedURL = normalizedURL.split('#')[0]

    return normalizedURL
  else:
    return originalUrl

def check_encode_uri(url: str) -> bool:
  """
  Custom check function equivalent to JS checkEncodeURI
  """
  # If unquoting changes the string, it means it was already encoded
  return unquote(url) != url

def clean_ambiguous_redirects(redirections):
  """
  Clean redirections from possible ambiguity, specially when the query string is removed
  """
  unique_paths = {}
  by_old_path = dict()

  for redir in redirections:
    redir_tup = (redir[0],redir[1])
    if redir_tup not in by_old_path:
      by_old_path[redir_tup] = []
    by_old_path[redir_tup].append([redir[2],redir[3]])

  # First pass
  for old_path in by_old_path:
    alternatives = len(by_old_path[old_path])
    if alternatives == 1:
      unique_paths[old_path] = by_old_path[old_path]
    else:
      # Choose first by the newest version alternatives
      newest_version = "2.1"
      for target in by_old_path[old_path]:
        if compareVersions(newest_version, target[0]) == 1:
          newest_version = target[0]
      # Discard oldest targets
      new_alternatives = []
      for alternative in by_old_path[old_path]:
        if alternative[0] == newest_version:
          new_alternatives.append(alternative)
        if len(new_alternatives) == 1:
          unique_paths[old_path] = new_alternatives[0]
          
      by_old_path[old_path] = new_alternatives[:]

  # Second pass
  for old_path in by_old_path:
    alternatives = len(by_old_path[old_path])
    if alternatives == 1:
      unique_paths[old_path] = by_old_path[old_path]
    else:
      # If all the alternatives are the same except for the query string
      alts_without_query = []
      new_alternatives = []
      partial_paths = []
      part_path = []
      for target in by_old_path[old_path]:
        alt = target[1].split('#')[0]
        if alt not in alts_without_query:
          alts_without_query.append(alt)
          target[1] = alt
          new_alternatives.append(target)
      if len(alts_without_query) == 1:
        unique_paths[old_path] = alts_without_query[0]
      else:
        # If the path is the same except for the file, choose the the index.html
        part_path = target[1].split('/')[:-1]
        part_path = ('/').join(part_path)
        if part_path not in partial_paths:
          partial_paths.append(part_path)
        if len(partial_paths) == 1:
          unique_paths[old_path] = partial_paths[0] + "/index.html"
          new_alternatives[0][1] = unique_paths[old_path]
          new_alternatives = [new_alternatives[0]]
          
      by_old_path[old_path] = new_alternatives[:]

  return by_old_path

def generate_redirects_map():
  newUrls, removedUrls, forward_redirections, backward_redirections = processURLs()
  # Forward redirections are the redirections from older release to newer release
  # Backward redirections are the redirections from newer release to older release

  redirections = list(reversed(forward_redirections))

  # Clean redirections from possible ambiguity
  unique_redirects_by_old_path = clean_ambiguous_redirects(redirections)

  temp_redirect = redirections[:]
  redirect_map = {}
  chains = []
  for f_redir in redirections:
    single_chain = []
    starting_path_checked = {}
    # Example of f_redir: ['2.1', '/user-manual/reference/tools/update-ruleset.py.html', '3.0', '/user-manual/reference/tools/update_ruleset.html']
    if f_redir[1] != f_redir[3]:
      temp_redirect = temp_redirect[:]
      current_starting_path = (f_redir[0],f_redir[1])
      if current_starting_path in starting_path_checked:
        starting_path_checked[current_starting_path] = starting_path_checked[current_starting_path]+1
      else:
        starting_path_checked[current_starting_path] = 1
      single_chain.append([ [ f_redir[0], f_redir[1] ], [ f_redir[2], f_redir[3] ] ])
      # follow the redirects
      newPath = f_redir[3]
      if "strip_query" in normalizeOptions and normalizeOptions["strip_query"] == True:
        newPath = newPath.split('#')[0]
      get_redirect_chain(f_redir[2],newPath,temp_redirect, single_chain,starting_path_checked)

      # Remove forks
      # Example of fork in a chain: 
      # [[['4.4', '/user-manual/elasticsearch/elastic-tuning.html'], ['4.5', '/user-manual/wazuh-indexer/wazuh-indexer-tuning.html']],
      # [['4.9', '/user-manual/wazuh-indexer/wazuh-indexer-tuning.html'], ['4.10', '/user-manual/wazuh-indexer-cluster/wazuh-indexer-cluster-tuning.html#set-node-attributes-for-each-node-in-a-cluster']],
      # [['4.9', '/user-manual/wazuh-indexer/wazuh-indexer-tuning.html'], ['4.10', '/user-manual/wazuh-indexer-cluster/wazuh-indexer-cluster-tuning.html#configure-shard-allocation-awareness-or-forced-awareness']]]

      temp_single_chain = []
      for transition in single_chain:
        start = transition[0]
        start_tuple = tuple(start)
        if start_tuple in starting_path_checked: 
          if starting_path_checked[start_tuple] == 1:
            # If the starting path is not repeated just add the redirect
            temp_single_chain.append(transition)
          else:
            # If the starting path including the version is repeated get the unique redirect
            new_transition = [start,unique_redirects_by_old_path[start_tuple][0]]
            if new_transition not in temp_single_chain:
              temp_single_chain.append(new_transition)
      single_chain = temp_single_chain[:]

      chains.append(single_chain)
    # A possible chain can be i.e.: 3.5/installation-guide/installing-splunk/splunk_installation.html -> 3.6/installing-splunk/splunk_installation.html ; 3.6/installing-splunk/splunk_installation.html -> 3.7/installing-splunk/splunk-basic.html ; 3.8/installing-splunk/splunk-basic.html -> 3.9/installation-guide/installing-splunk/splunk-basic.html ; 

  # Create redirect map from chains
  for chain in chains:
    transition_final_destiny = chain[-1][1] # target of the last element in the chain
    newPath = transition_final_destiny[1]
    if "strip_query" in normalizeOptions and normalizeOptions["strip_query"] == True:
      newPath = newPath.split('#')[0]
    if [transition_final_destiny[0],newPath] in removedUrls:
      redirect = has_redirect([transition_final_destiny[0],newPath], redirections)
      if redirect == False:
        transition_final_destiny = transition_final_destiny[0] + transition_final_destiny[1]
      else:
        transition_final_destiny = 'current' + transition_final_destiny[1]
    else: 
      transition_final_destiny = 'current' + transition_final_destiny[1]
    for element in chain:
      transition_origin = element[0]
      old = 'current' + transition_origin[1]
      new = transition_final_destiny
      if old not in redirect_map and old != new:
        redirect_map[old] = new

  return redirect_map

def get_redirect_chain(release, path, redirections, chain, starting_path_checked):
  for redir in redirections:
    if redir[1] == path and compareVersions(release,redir[0]) > -1 and redir[1] != redir[3]:
      current_starting_path = (redir[0], redir[1])
      if current_starting_path in starting_path_checked:
        starting_path_checked[current_starting_path]  = starting_path_checked[current_starting_path]+1
      else:
        starting_path_checked[current_starting_path] = 1    
      chain.append([ [ redir[0], redir[1] ], [ redir[2], redir[3] ] ])
      newPath = redir[3]
      if "strip_query" in normalizeOptions and normalizeOptions["strip_query"] == True:
        newPath = newPath.split('#')[0]
      get_redirect_chain(redir[2],newPath, redirections, chain, starting_path_checked)
  return []

def has_redirect(path, redirections):
  for redir in redirections:
    if path[0] == redir[0] and path[1] == redir[1]:
      return [redir[2],redir[3]]
  return False

def redirects_map_to_json_format(redirects_map):
  """
  JSON file format for key-value pairs:
  {
    "puts":[
      { "key":"key1", "value":"value" },
      { "key":"key2", "value":"value" }
    ],
    "deletes": ["oldkey"]
  }
  """
  formated = {}
  data = []
  for old in redirects_map["puts"]:
    new = redirects_map["puts"][old]
    data_item = {}
    data_item["key"] = '/' + old
    data_item["value"] = '/' + new
    data.append(data_item)
  formated["puts"] = data 

  data = []
  for old in redirects_map["deletes"]:
      data.append(old)
  formated["deletes"] = data 

  return formated

def diff_redirects(old_redirects_map, new_redirects_map):
  redir_remove = old_redirects_map.copy()
  redir_update = {}
  for redir in new_redirects_map:
    if redir in redir_remove:
      if new_redirects_map[redir] != redir_remove[redir]:
        redir_update[redir] = new_redirects_map[redir]
      redir_remove.pop(redir)
    else:
      redir_update[redir] = new_redirects_map[redir]
  return {"puts": redir_update, "deletes": redir_remove}

##############

# 1. Generate redirects map after processing redirects.js
redirects_map = generate_redirects_map()

# 2. Read old redirects version
old_redirects_list_file_url = 'https://documentation-dev.wazuh.com/redirects_map.json'
old_redirects_list_file = os.path.join(dirname, '../../redirects_map_old.json')
redir_path = ''
url_retrieve_headers = ''
try:
  redir_path, url_retrieve_headers = urlretrieve(old_redirects_list_file_url, old_redirects_list_file)
except Exception as e:
  print(old_redirects_list_file_url + " not found.", e)

if redir_path != '':
  with open(old_redirects_list_file) as json_file:
    old_redirects_list = json.load(json_file)
else: 
  old_redirects_list = {}
  print ("There was a problem reading the old redirects list. Empty list loaded instead")

# 3. Separate Add/Modify from Delete according to the differences between the old and the new redirects_map
redirects_put_delete = diff_redirects(old_redirects_list, redirects_map)

# 4. Create the updates JSON file
redirects_map_json = redirects_map_to_json_format(redirects_put_delete)

# Output the results to a JSON file
with open(redirects_json_file, "w", encoding="utf-8") as json_file:
  json.dump(redirects_map_json, json_file, indent=4)

# Output the new redirects list (this one must be uploaded to the bucket)
with open(os.path.join(dirname, '../../redirects_map.json'), "w", encoding="utf-8") as json_file:
  json.dump(redirects_map, json_file, indent=4)

print("Success! '" + json_file_name + "' has been created.")

# generate_redirects_map(): redir_map 
#   processURLs(): 
#     compareVersions(r_from,r_to) [AUX]
#     normalizeUrl(path,normalizeOptions) [AUX]
#   clean_ambiguous_redirects(redirections):
#     compareVersions(newest_version, target[0]) [AUX]
#   get_redirect_chain(f_redir[2],f_redir[3],temp_redirect, single_chain,starting_path_checked):
#     [Recursive]
#   has_redirect(transition_final_destiny, redirections) [AUX]
#   compareVersions(transition_origin[0],unique[0]) [AUX]