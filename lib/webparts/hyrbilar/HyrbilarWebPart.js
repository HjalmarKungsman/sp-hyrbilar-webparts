"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_http_1 = require("@microsoft/sp-http");
//import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, ISPHttpClientBatchOptions, ISPHttpClientBatchCreationOptions, SPHttpClientBatch } from '@microsoft/sp-http';
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
//import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';
var Hyrbilar_module_scss_1 = require("./Hyrbilar.module.scss");
var strings = require("hyrbilarStrings");
var HyrbilarWebPart = (function (_super) {
    __extends(HyrbilarWebPart, _super);
    function HyrbilarWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listItemEntityTypeName = undefined;
        _this.listGuid = '';
        _this.viewGuid = '';
        _this.createField2 = function (listGuid, fieldTitle, fieldTypeKind, fieldRequired, fieldStaticName) {
            var _this = this;
            this.updateStatus('Creating field...');
            return new Promise(function (resolve, reject) {
                var sp1pts = {
                    body: "{  'Title': '" + fieldTitle + "', \n                  'FieldTypeKind': " + fieldTypeKind + ",\n                  'Required': '" + fieldRequired + "', \n                  'EnforceUniqueValues': 'False',\n                  'StaticName': '" + fieldStaticName + "' \n                }"
                };
                _this.context.spHttpClient.post(_this.context.pageContext.web.absoluteUrl + "/_api/web/lists(guid'" + listGuid + "')/Fields", sp_http_1.SPHttpClient.configurations.v1, sp1pts)
                    .then(function (response) {
                    console.log("Status code & text: " + response.status + ", " + response.statusText);
                    response.json().then(function (responseJSON) {
                        _this.updateStatus('Field "' + responseJSON['Title'] + '" created...');
                        resolve(responseJSON['Title']);
                    });
                }, function (error) {
                    _this.updateStatus('Error while creating the field: ' + error);
                    reject(error);
                });
            });
        };
        return _this;
    }
    HyrbilarWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n      <div class=\"" + Hyrbilar_module_scss_1.default.helloWorld + "\">\n        <div class=\"" + Hyrbilar_module_scss_1.default.container + "\">\n          <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + Hyrbilar_module_scss_1.default.row + "\">\n            <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl10 ms-u-xlPush1 ms-u-lgPush1\">\n              <p class=\"ms-font-l ms-fontColor-white\">" + sp_lodash_subset_1.escape(this.properties.description) + "</p>\n              <div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createList-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create list</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createField2-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create field (Title2)</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createField3-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create field (pris)</span>\n                  </button>\n                </div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createView-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create view</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createViewField2-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Add field to view (Title2)</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createViewField3-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Add field to view (Pris)</span>\n                  </button>\n                </div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " getViews-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Get views</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " getView-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Get view</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " getViewField-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Get view field</span>\n                  </button>\n                </div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createItem-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create item</span>\n                  </button>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " getListItems-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Get items</span>\n                  </button>\n                </div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " createListAndFields-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Create list and fields</span>\n                  </button>\n                <div>\n                <div>\n                  <button class=\"" + Hyrbilar_module_scss_1.default.button + " clearUL-Button\">\n                    <span class=\"" + Hyrbilar_module_scss_1.default.label + "\">Clear</span>\n                  </button>\n                </div>\n              </div>\n              <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + Hyrbilar_module_scss_1.default.row + "\">\n                <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n                  <div class=\"status\"></div>\n                  <ul class=\"items\"><ul>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>";
        this.listItemEntityTypeName = undefined;
        this.setButtonsEventHandlers();
    };
    HyrbilarWebPart.prototype.setButtonsEventHandlers = function () {
        var webPart = this;
        this.domElement.querySelector('button.clearUL-Button').addEventListener('click', function () { webPart.clearUL(); });
        this.domElement.querySelector('button.createList-Button').addEventListener('click', function () { webPart.createList(); });
        this.domElement.querySelector('button.createField2-Button').addEventListener('click', function () { webPart.createField('Title2', 2, true, 'Title2'); });
        this.domElement.querySelector('button.createField3-Button').addEventListener('click', function () { webPart.createField('Pris', 9, true, 'Pris'); });
        this.domElement.querySelector('button.createView-Button').addEventListener('click', function () { webPart.createView('Hyrbil View 2'); });
        this.domElement.querySelector('button.createViewField2-Button').addEventListener('click', function () { webPart.createViewField('Title2'); });
        this.domElement.querySelector('button.createViewField3-Button').addEventListener('click', function () { webPart.createViewField('Pris'); });
        this.domElement.querySelector('button.getViews-Button').addEventListener('click', function () { webPart.getViews(); });
        this.domElement.querySelector('button.getView-Button').addEventListener('click', function () { webPart.getView(); });
        this.domElement.querySelector('button.getViewField-Button').addEventListener('click', function () { webPart.getViewField(); });
        this.domElement.querySelector('button.createItem-Button').addEventListener('click', function () { webPart.createItem(); });
        this.domElement.querySelector('button.getListItems-Button').addEventListener('click', function () { webPart.getListItems(); });
        this.domElement.querySelector('button.createListAndFields-Button').addEventListener('click', function () { webPart.createListAndFields(); });
    };
    HyrbilarWebPart.prototype.currentTime = function () {
        var currentdate = new Date();
        var currentTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        return currentTime;
    };
    HyrbilarWebPart.prototype.createList = function () {
        var _this = this;
        this.updateStatus('Creating list...');
        var spOpts = {
            body: "{ Title: 'Hyrbilar Lista " + this.currentTime() + "', BaseTemplate: 100 }"
        };
        this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl + "/_api/web/lists", sp_http_1.SPHttpClient.configurations.v1, spOpts)
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            response.json().then(function (responseJSON) {
                _this.updateStatus('List "' + responseJSON['Title'] + '" created...');
                _this.listGuid = responseJSON['Id'];
            });
        });
    };
    HyrbilarWebPart.prototype.createField = function (fieldTitle, fieldTypeKind, fieldRequired, fieldStaticName) {
        var _this = this;
        var sp1pts = {
            body: "{  'Title': '" + fieldTitle + "', \n                'FieldTypeKind': " + fieldTypeKind + ",\n                'Required': '" + fieldRequired + "', \n                'EnforceUniqueValues': 'False',\n                'StaticName': '" + fieldStaticName + "' \n              }"
        };
        this.updateStatus('Creating field...');
        this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl + "/_api/web/lists(guid'" + this.listGuid + "')/Fields", sp_http_1.SPHttpClient.configurations.v1, sp1pts)
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            response.json().then(function (responseJSON) {
                _this.updateStatus('Field "' + responseJSON['Title'] + '" created...');
            });
        });
    };
    HyrbilarWebPart.prototype.createView = function (viewTitle) {
        var _this = this;
        this.updateStatus('Creating view...');
        //const query = '<Query></Query><RowLimit>34</RowLimit>';
        var body = JSON.stringify({
            '__metadata': {
                'type': "SP.View"
            },
            'Title': viewTitle + " " + this.currentTime(),
            // 'PersonalView': false,
            // 'ViewQuery': `${query}`,
            'DefaultView': false
        });
        this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/views", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            },
            body: body
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            response.json().then(function (responseJSON) {
                _this.updateStatus('View "' + responseJSON['Title'] + '" created...');
                _this.viewGuid = responseJSON['Id'];
            });
        });
    };
    HyrbilarWebPart.prototype.createViewField = function (fieldTitle) {
        var _this = this;
        this.updateStatus('Adding field to view...');
        var body = JSON.stringify({
            'strField': "" + fieldTitle
        });
        this.context.spHttpClient.post(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/views('" + this.viewGuid + "')/ViewFields/AddViewField", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            },
            body: body
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            response.json().then(function (responseJSON) {
                _this.updateStatus('Field "' + responseJSON['Title'] + '" added to view...');
            });
        });
    };
    HyrbilarWebPart.prototype.createItem = function () {
        var _this = this;
        this.updateStatus('Creating item...');
        this.getListItemEntityTypeName()
            .then(function (listItemEntityTypeName) {
            var time = _this.currentTime;
            var body = JSON.stringify({
                '__metadata': {
                    'type': listItemEntityTypeName
                },
                'Title': "Volvo " + _this.currentTime(),
                'Title2': "V60",
                'Pris': "12345"
            });
            return _this.context.spHttpClient.post(_this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + _this.listGuid + "')/items", sp_http_1.SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'odata-version': ''
                },
                body: body
            });
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
        })
            .then(function (item) {
            _this.updateStatus("Item created...");
        }, function (error) {
            _this.updateStatus('Error while creating the item: ' + error);
        });
    };
    HyrbilarWebPart.prototype.getListItems = function () {
        var _this = this;
        this.updateStatus('Getting list items...');
        this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/items", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            _this.updateStatus('List items recived: ');
            response.json().then(function (responseJSON) {
                var items = responseJSON['value'];
                var itemsHtml = [];
                for (var i = 0; i < items.length; i++) {
                    itemsHtml.push("<li>" + items[i].Title + ", " + items[i].Title2 + ", " + items[i].Pris + "</li>");
                }
                _this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
            });
        });
    };
    HyrbilarWebPart.prototype.getViews = function () {
        var _this = this;
        this.updateStatus('Getting list views...');
        this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/views", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            _this.updateStatus('List views recived: ');
            response.json().then(function (responseJSON) {
                var items = responseJSON['value'];
                var itemsHtml = [];
                for (var i = 0; i < items.length; i++) {
                    itemsHtml.push("<li>" + items[i].Title + "</li>");
                }
                _this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
            });
        });
    };
    HyrbilarWebPart.prototype.getView = function () {
        var _this = this;
        this.updateStatus('Getting list views...');
        this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/views('" + this.viewGuid + "')", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            console.log("response: ", response);
            _this.updateStatus('List views recived: ');
            response.json().then(function (responseJSON) {
                console.log("responseJSON: ", responseJSON);
                // var items = responseJSON['value'];
                // const itemsHtml: string[] = [];
                // for (let i: number = 0; i < items.length; i++) {
                //   itemsHtml.push(`<li>${items[i].Title}</li>`);
                // }
                // this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
            });
        });
    };
    HyrbilarWebPart.prototype.getViewField = function () {
        var _this = this;
        this.updateStatus('Getting list views...');
        this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + this.listGuid + "')/views('" + this.viewGuid + "')/ViewFields", sp_http_1.SPHttpClient.configurations.v1, {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            }
        })
            .then(function (response) {
            console.log("Status code & text: " + response.status + ", " + response.statusText);
            console.log("response: ", response);
            _this.updateStatus('List views recived: ');
            response.json().then(function (responseJSON) {
                console.log("responseJSON: ", responseJSON);
                console.log("responseJSON['Items']: ", responseJSON['Items']);
                var items = responseJSON['Items'];
                var itemsHtml = [];
                for (var i = 0; i < items.length; i++) {
                    itemsHtml.push("<li>" + items[i] + "</li>");
                }
                _this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
            });
        });
    };
    HyrbilarWebPart.prototype.getListItemEntityTypeName = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.listItemEntityTypeName) {
                resolve(_this.listItemEntityTypeName);
                return;
            }
            _this.context.spHttpClient.get(_this.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + _this.listGuid + "')?$select=ListItemEntityTypeFullName", sp_http_1.SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'odata-version': ''
                }
            })
                .then(function (response) {
                return response.json();
            }, function (error) {
                reject(error);
            })
                .then(function (response) {
                _this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
                resolve(_this.listItemEntityTypeName);
            });
        });
    };
    HyrbilarWebPart.prototype.createListAndFields = function () {
        var _this = this;
        var listName = 'Hyrbilar Lista ' + this.currentTime();
        var listGuid = '';
        this.createList2(listName)
            .then(function (response) {
            listGuid = response;
            _this.createField2(listGuid, 'Title2', 2, true, 'Title2')
                .then(function (response) {
                _this.createField2(listGuid, 'Pris', 9, true, 'Pris');
            });
        });
    };
    HyrbilarWebPart.prototype.createList2 = function (listName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var spOpts = {
                body: "{ Title: '" + listName + "', BaseTemplate: 100 }"
            };
            _this.context.spHttpClient.post(_this.context.pageContext.web.absoluteUrl + "/_api/web/lists", sp_http_1.SPHttpClient.configurations.v1, spOpts)
                .then(function (response) {
                console.log("Status code & text: " + response.status + ", " + response.statusText);
                response.json().then(function (responseJSON) {
                    _this.updateStatus('List "' + responseJSON['Title'] + '" created...');
                    resolve(responseJSON['Id']);
                });
            }, function (error) {
                _this.updateStatus('Error while creating the list: ' + error);
                reject(error);
            });
        });
    };
    HyrbilarWebPart.prototype.clearUL = function () {
        this.updateStatus('Clearing...');
        this.domElement.querySelector('.items').innerHTML = '';
    };
    HyrbilarWebPart.prototype.updateStatus = function (status) {
        this.domElement.querySelector('.status').innerHTML = status;
    };
    Object.defineProperty(HyrbilarWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    HyrbilarWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return HyrbilarWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HyrbilarWebPart;

//# sourceMappingURL=HyrbilarWebPart.js.map
