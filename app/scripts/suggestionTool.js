/**
 * Suggestion Tool jQuery Plugin
 */
"use strict";
;(function($, window) {

    var suggestMethods = {
        init: function(options) {
            /**
             * Default Settings
             * @type {{url: string, maxElements: number, elementId: string}}
             */
            var defaults = {
                apiUri: "",
                maxElements: 5,
                elementId: "#suggestionInput"
            };
            var settings = $.extend( {}, defaults, options );

            var navigationFocus = 0;

            $(window).keydown(function (event) {
                if(event.key === "ArrowDown" || event.key === "Down") {
                    if($('.suggestionTool')[0]) {
                        if(navigationFocus === 0) {
                            $('.suggestionTool li').first().addClass('selected');
                            navigationFocus++;
                            return;
                        } else {
                            var elementCount = $('.suggestionTool li').length;
                            if(navigationFocus < elementCount) {
                                $('.suggestionTool li:nth-child(' + navigationFocus + ')').removeClass('selected');
                                navigationFocus++;
                                $('.suggestionTool li:nth-child(' + (navigationFocus) + ')').addClass('selected');
                                return;
                            }
                            if(navigationFocus === elementCount) { return; }
                        }
                    }
                }
                if(event.key === "ArrowUp" || event.key === "Up") {
                    event.preventDefault();
                    if($('.suggestionTool')[0]) {
                        if (navigationFocus === 1) {
                            $('.suggestionTool li:nth-child(' + navigationFocus + ')').removeClass('selected');
                            navigationFocus--;
                            return;
                        }
                        if (navigationFocus > 1) {
                            $('.suggestionTool li:nth-child(' + navigationFocus + ')').removeClass('selected');
                            navigationFocus--;
                            $('.suggestionTool li:nth-child(' + (navigationFocus) + ')').addClass('selected');
                            return;
                        }
                    }
                }
                if(event.key === "Enter") {
                    if($('.suggestionTool')[0] && navigationFocus > 0) {
                        $(settings.elementId).val($('.suggestionTool li:nth-child(' + (navigationFocus) + ')').text());
                        $('.suggestionTool').remove();
                        navigationFocus = 0;
                        return;
                    }
                }
            });
            /**
             * bind onchangeListener to input field
             */
            $(settings.elementId).bind("paste keyup keydown", function(event) {
                if(event.key !== "ArrowDown" && event.key !== "Down" && event.key !== "ArrowUp" && event.key !== "Up") {
                    /**
                     * check if input field is not empty
                     * else
                     * - check if suggestionBox could be found
                     * - remove the suggestionBox
                     */
                    if ($(this).val()) {
                        /**
                         * get data from the API
                         */
                        suggestMethods.getData(settings, function (callback) {
                            var data = [];
                            var i;
                            for (i = 0; i < callback.length; i++) {
                                var airportString = callback[i].name + " (" + callback[i].iata + ")";
                                data.push(airportString);
                            }
                            /**
                             * Build HTML Box with value List
                             */
                            if (data.length > 0) {
                                var suggestionBoxWidth = $(settings.elementId).outerWidth(); // get width of input Element
                                var suggestionBox = suggestMethods.suggestionBox(); // build suggestion box
                                var dataList = suggestMethods.list(data, settings); // build data list
                                suggestionBox.append(dataList); // insert data list to suggestion box
                                suggestionBox.css({"display": "block", "width": suggestionBoxWidth}); // make suggestion box visible
                                /**
                                 * return:
                                 */
                                return $(this).each(function () {
                                    if ($('.suggestionTool')[0]) {
                                        suggestMethods.removeSuggestionTool();
                                    }
                                    $(settings.elementId).after(suggestionBox);
                                });
                            } else {
                                suggestMethods.removeSuggestionTool();
                            }
                        });
                    } else {
                        suggestMethods.removeSuggestionTool();
                    }
                }
            });
        },
        getData: function(settings, callback) {
            /**
             * initialize local variables and create URI
             */
            //TODO: Make URI Method for more flexible values
            var uri = encodeURI(settings.apiUri + $(settings.elementId).val() + "/" + settings.maxElements);
            /**
             * get data from API
             */
            $.getJSON(uri).done(function(data) {
                    callback(data);
                }).fail(function() {
                    //TODO: Error Handling!
                    return;
                });
        },
        suggestionBox: function () {
            var sBox = $(document.createElement('div'));
            sBox.addClass('suggestionTool');
            return sBox;
        },
        list: function (arrListData, settings) {
            var sListUl = $(document.createElement('ul'));
            var sListLi;
            var i;
            for (i = 0; i < arrListData.length; i++) {
                sListLi = $(document.createElement('li'));
                sListLi.append($(document.createTextNode(arrListData[i])));
                sListLi.bind("mouseenter mouseleave click", suggestMethods.eventListener(arrListData[i], $(settings.elementId)));
                sListUl.append(sListLi);
            }
            return sListUl;
        },
        eventListener: function (data, element) {
            return function(event) {
                switch(event.type) {
                    case "mouseenter":
                        element.blur();
                        $('.suggestionTool').focus();
                        break;
                    case "mouseleave":
                        $('.suggestionTool').blur();
                        element.focus();
                        break;
                    case "click":
                        element.val(data);
                        $('.suggestionTool').remove();
                        break;
                }
            };
        },
        removeSuggestionTool: function() {
            if($('.suggestionTool')[0]) {
                $('.suggestionTool').remove();
            }
            return;
        }
    };
    $.fn.suggestionTool = function( options ) {
        if ( suggestMethods[options] ) {
            return suggestMethods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof options === 'object' || ! options ) {
            return suggestMethods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  options + ' does not exist on jQuery.suggestionTool' );
        }
    };

})(jQuery, window);
