var versions = [
    {name: "3.0.0-alpha1", url: "http://documentation.wazuh.com/3.0.0"},
    {name: "2.0 (current)", url: "http://documentation.wazuh.com/current"}
];

$( document ).ready(function() {
    addVersions();
});

function addVersions() {
    var select_version = $("#select-version");

    if (select_version == null) {
        console.error("No such element 'select-version'");
        return;
    }

    for (var i = 0; i < versions.length; i++) {
        option = document.createElement("option");
        option.text = versions[i].name;
        option.value = versions[i].url;
        select_version.append(option);
    }

    select_version.value = window.location.href.split('/', 4).join('/');

    select_version.change(function(event) {
        window.location.href = event.target.value;
    });
}
