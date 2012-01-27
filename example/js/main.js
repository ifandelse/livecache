$(function(){
    $.livecache( { monitorDom: true } );
    $(document.body).append("<span>Elements Matching Selector: " + $.livecache( "div" ).length + "</span><hr/>");
    $(document.body).append("<div>HOLA!</div>");
    $(document.body).append("<div>HI!</div>");
    $(document.body).append("<div>HOWDY</div>");
    $(document.body).append("<div>OH, HAI!</div>");
    $(document.body).append("<hr/><span>Elements Matching Selector: " + $.livecache( "div" ).length + "</span>");
    $(document.body).append("<div>MOAR DIVS!</div>");
    $(document.body).append("<hr/><span>Elements Matching Selector: " + $.livecache( "div" ).length + "</span>");
    $(document.body).append("<hr/><span>Forcing cache update</span>");
    $.livecache('div', true);
    $(document.body).append("<hr/><span>Elements Matching Selector: " + $.livecache( "div" ).length + "</span><hr/>");
});