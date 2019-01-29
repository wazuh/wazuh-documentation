/*
 * Wazuh documentation - Version selector script
 * Copyright (C) 2018 Wazuh, Inc.
 */

var versions = [
    {name: "3.8 (current)", url: "/3.8"},
    {name: "3.7", url: "/3.7"},
    {name: "3.6", url: "/3.6"},
    {name: "3.5", url: "/3.5"},
    {name: "3.4", url: "/3.4"},
    {name: "3.3", url: "/3.3"},
    {name: "3.2", url: "/3.2"},
    {name: "3.1", url: "/3.1"},
    {name: "3.0", url: "/3.0"},
    {name: "2.1", url: "/2.1"},
];

var current_version = "3.8";

$( document ).ready(function() {
    addVersions();
});

function addVersions() {
    var version = $(".version");
    var select_version = $("#select-version");
    var path = document.location.pathname.split('/')[1];
    }

    if (version == null) {
        console.error("No such element of class 'version'");
        return;
    }

    if (select_version == null) {
        console.error("No such element 'select-version'");
        return;
    }

    if (path == "current" || path == "3.x") {
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
