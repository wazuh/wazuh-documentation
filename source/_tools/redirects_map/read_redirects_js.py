import pythonmonkey as pm

def read_redirects_js(redirects_file):
    betaVersions = []
    versions = []
    newUrls = []
    removedUrls = []
    redirections = []

    # 1. Read the original JavaScript file
    with open(redirects_file, "r", encoding="utf-8") as file:
        js_code = file.read()

    # 2. Append the Wrapper Bundle at the absolute bottom
    bundle_wrapper = "\n; ({ versions: versions, betaVersions: betaVersions, redirections: redirections, newUrls: newUrls, removedUrls: removedUrls });"

    # Combine everything together into a flawless executable JS package
    full_js_code = js_code + bundle_wrapper

    # 3. Evaluate using PythonMonkey
    raw_data = pm.eval(full_js_code)

    # 4. Extract and normalize the data structures into native Python types
    # Arrays of arrays become lists of lists
    betaVersions = [list(item) for item in raw_data["betaVersions"]]

    # Arrays of objects become lists of dicts
    redirections = [dict(item) for item in raw_data["redirections"]]

    # Object dictionaries remain standard dictionaries
    versions = list(raw_data["versions"])

    # Extract newUrls and removedUrls
    raw_new_urls = raw_data["newUrls"]
    raw_rem_urls = raw_data["removedUrls"]
    python_new_urls_keys = pm.eval("Object.keys")(raw_new_urls)
    python_rem_urls_keys = pm.eval("Object.keys")(raw_rem_urls)
    newUrls = {}
    removedUrls = {}
    for key in python_new_urls_keys:
        # Convert key to a Python string, then look up the value
        py_key = str(key)
        # JavaScript arrays inside pythonmonkey must be cast explicitly to list
        newUrls[py_key] = list(pm.eval(f"(obj, k) => obj[k]")(raw_new_urls, py_key))
    for key in python_rem_urls_keys:
        # Convert key to a Python string, then look up the value
        py_key = str(key)
        # JavaScript arrays inside pythonmonkey must be cast explicitly to list
        removedUrls[py_key] = list(pm.eval(f"(obj, k) => obj[k]")(raw_rem_urls, py_key))
    
    return [betaVersions,versions,newUrls,removedUrls,redirections]

# print("betaVersions",betaVersions)
# print("versions",versions)
# print("newUrls",newUrls)
# print("removedUrls",removedUrls)
# print("redirections",redirections)