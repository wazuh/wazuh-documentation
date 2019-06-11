jQuery(function($){

    /*
    * Wazuh documentation - Version selector script
    * Copyright (C) 2019 Wazuh, Inc.
    */

    var versions = [
        {name: "3.9 (current)", url: "/new-docu-01"},
        {name: "3.8", url: "/3.8"},
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

    var current_version = "new-docu-01";

    addVersions();

    function addVersions() {
        var version = $(".version");
        var select_version = $("#select-version");
        var select_version_current = $("#select-version .current");
        var select_version_ul = $("#select-version .dropdown-menu");
        var path = document.location.pathname.split('/')[1];

        if (version == null) {
            console.error("No such element of class 'version'");
            return;
        }

        if (select_version == null) {
            console.error("No such element 'select-version'");
            return;
        }

        if (path == "current" || path == "3.x" || path == "new-docu-01") {
            path = current_version;
        }

        for (var i = 0; i < versions.length; i++) {
            var ele = "<li><a href='"+versions[i].url+"'>"+versions[i].name+"</a></li>";
            select_version_ul.append(ele);
        }

        select_version_current.html(versions[0].name);

    }

});
