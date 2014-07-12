/* Compiled by kdc on Sat Jul 12 2014 00:42:42 GMT+0000 (UTC) */
(function() {
/* KDAPP STARTS */
/* BLOCK STARTS: /home/bvallelunga/Applications/Koders.kdapp/index.coffee */
var KodersController, KodersMainView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

KodersMainView = (function(_super) {
  __extends(KodersMainView, _super);

  function KodersMainView(options, data) {
    if (options == null) {
      options = {};
    }
    options.cssClass = 'koders main-view';
    KodersMainView.__super__.constructor.call(this, options, data);
  }

  KodersMainView.prototype.viewAppended = function() {
    var _this = this;
    this.addSubView(this.searchField = new KDInputView({
      placeholder: "Search for fellow koders by name and press enter...",
      cssClass: "search",
      type: "text"
    }));
    this.searchField.on("keyup", function(event) {
      if (event.which === 13) {
        _this.results.updatePartial("");
        _this.name = _this.searchField.getValue().split(" ");
        return KD.remote.api.JAccount.some({
          "profile.firstName": _this.name[0],
          "profile.lastName": _this.name[1]
        }, {
          limit: 20
        }).then(function() {
          var account, results, _i, _len, _ref;
          results = [];
          _ref = arguments[0];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            account = _ref[_i];
            results.push("<a href=\"/" + account.profile.nickname + "\" class=\"result\">\n  <div class=\"avatar\">\n    <img src=\"" + (account.profile.avatar || 'https://www.gravatar.com/avatar/' + account.profile.hash + '?s=200&d=identicon') + "\"/>\n  </div>\n  <div class=\"information\">\n    <div class=\"name\">\n      " + account.profile.firstName + "\n      " + account.profile.lastName + "\n    </div>\n    <div class=\"nickname\">\n      " + account.profile.nickname + "\n    </div>\n    <div class=\"about\">\n      " + (account.profile.about || "") + "\n    </div>\n  </div>\n  <div class=\"clear\"></div>\n</a>");
          }
          return _this.results.updatePartial(results.join(""));
        });
      }
    });
    return this.addSubView(this.results = new KDView({
      cssClass: "results"
    }));
  };

  return KodersMainView;

})(KDView);

KodersController = (function(_super) {
  __extends(KodersController, _super);

  function KodersController(options, data) {
    if (options == null) {
      options = {};
    }
    options.view = new KodersMainView;
    options.appInfo = {
      name: "Koders",
      type: "application"
    };
    KodersController.__super__.constructor.call(this, options, data);
  }

  return KodersController;

})(AppController);

(function() {
  var view;
  if (typeof appView !== "undefined" && appView !== null) {
    view = new KodersMainView;
    return appView.addSubView(view);
  } else {
    return KD.registerAppClass(KodersController, {
      name: "Koders",
      routes: {
        "/:name?/Koders": null,
        "/:name?/bvallelunga/Apps/Koders": null
      },
      dockPath: "/bvallelunga/Apps/Koders",
      behavior: "application"
    });
  }
})();

/* KDAPP ENDS */
}).call();