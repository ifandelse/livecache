(function($) {
    var subject = {},
        monitoringDom = false,
        config = {
            monitorDom: false,
            invalidateOnly: true
        },
        // Caveat Emptor: live updates of the cache from DOM mutation could get **expensive**
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
})(jQuery);