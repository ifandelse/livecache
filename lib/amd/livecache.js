define(['jquery'], function($) {
/*
    livecache
    Author: Jim Cowart
    License: Dual licensed MIT (http://www.opensource.org/licenses/mit-license) & GPL (http://www.opensource.org/licenses/gpl-license)
    Version 0.1.0
*/

var subject = {},
    monitoringDom = false,
    config = {
        monitorDom: false,
        invalidateOnly: true
    },
    // Caveat Emptor: live updates of the cache from DOM mutation WILL get **expensive**
    // Seriously - this callback is named bruteForce for a reason, so only use this feature
    // if your DOM updates are small and infrequent, and you don't have critical operations
    // to apply after and during each update.  Some might even go as far as to say that I'm
    // Doing It Wrong™ by including this feature.  Maybe I'm including it to poke them in the eye. :-)
    bruteForce = function(obj) {
        var elems = [$(obj.target)].concat($("*", obj.target));
        $.each(elems, function(idx, elem){
            $.each(subject, function(key) {
                if($(elem).is($(key))) {
                    if(config.invalidateOnly)
                        delete subject[key];
                    else
                        subject[key] = $(key);
                }
            });
        });
    };

function applyConfig(cfg) {
    config = $.extend(config, cfg);
    if(config.monitorDom && ! monitoringDom) {
        $(document).on("DOMNodeInserted DOMNodeRemoved", bruteForce);
        monitoringDom = true;
    }
    else if(!config.monitorDom && monitoringDom) {
        $(document).off("DOMNodeInserted DOMNodeRemoved", bruteForce);
        monitoringDom = false;
    }
}

$.extend({
    "livecache" : function( selector, forceRefresh ) {
        if(typeof selector === "string") {
            if(forceRefresh || !subject[selector] || subject[selector].length === 0) {
                subject[selector] = $( selector );
            }
            return subject[selector];
        }
        else if (typeof selector === "object") {
            applyConfig(selector);
        }
    }
});
});