var versions = [
    {name: "3.x (current)", url: "/3.x"},
    {name: "2.1", url: "/2.1"},
];

var current_version = "3.x";

$( document ).ready(function() {
    addVersions();
});

function addVersions() {
    var select_version = $("#select-version");
    var path = document.location.pathname.split('/')[1];

    if (select_version == null) {
        console.error("No such element 'select-version'");
        return;
    }

    if (path == "current") {
        path = current_version;
    }

    for (var i = 0; i < versions.length; i++) {
        option = document.createElement("option");
        option.text = versions[i].name;
        option.value = versions[i].url;
        select_version.append(option);
    }

    select_version.val('/' + path);

    select_version.change(function(event) {
        window.location.href = event.target.value;
    });
}
