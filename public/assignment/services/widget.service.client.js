(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets =
            [
                { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
                { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                    url: "http://lorempixel.com/400/200/"},
                { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
                { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
                { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                    url: "https://youtu.be/AM2Ivdi9c4E" },
                { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
            ];
        var service = {
            "createWidget" : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById" : findWidgetById,
            "updateWidget" : updateWidget,
            "deleteWidget" : deleteWidget
        };
        return service;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return widgets.reduce(getMaxId, 0).toString();
        }

        function createWidget(pageId, widget) {
            var newWidgetId = getNextId();
            var newWidget = {
                _id: newWidgetId,
                widgetType: widget.widgetType,
                pageId: pageId,
                size: widget.size,
                text: widget.text,
                width: widget.width,
                url: widget.url
            }
            widgets.push(newWidget);
        }

        function findWidgetsByPageId(pageId) {
            result = [];
            for (w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget.pageId) === parseInt(pageId)) {
                    result.push(widget);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for (w in widgets) {
                var widget = widgets[w];
                if (parseInt(widget._id) === parseInt(widgetId)) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            var oldWidget = findWidgetById(widgetId);
            var index = widgets.indexOf(oldWidget);
            widgets[index].widgetType = widget.widgetType;
            widgets[index].size = widget.size;
            widgets[index].text = widget.text;
        }

        function deleteWidget(widgetId) {
            var oldPage = findWidgetById(widgetId);
            var index = widgets.indexOf(oldPage);
            widgets.splice(index, 1);
        }
    }
})();