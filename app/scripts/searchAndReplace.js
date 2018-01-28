"use strict";
/**
 * Prototype for searching and replacing more than 1 placeholders with Array Elements in a string at once
 * using RegExp to find placeholders (case insensitive [i]), perform global match (find all "g")
 * and replace Array Elements
 */
String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};