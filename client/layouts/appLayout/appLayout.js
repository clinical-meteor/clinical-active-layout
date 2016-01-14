Meteor.startup(function () {
  Session.set("resize", null);
  Session.setDefault('appHeight', $(window).height());
  Session.setDefault('appWidth', $(window).width());
  Session.setDefault("glassOpacity", .95);
  Session.setDefault("backgroundColorA", '#456ad7');

  Session.setDefault("eastRule", 200);
  Session.setDefault("westRule", 200);
  Session.setDefault("northRule", 100);
  Session.setDefault("southRule", 100);

  Session.setDefault('activeRecord', null);

  Session.setDefault('navIsFullscreen', true);
  Session.setDefault('pageIsWide', false);
  Session.setDefault('pageLeftToWestRule', false);

  Session.setDefault('useCardLayout', true);
  Session.setDefault('rightCardVisible', false);

  Session.set("eastRule", 200);
  Session.set("westRule", 200);
  Session.set('appWidth', $(window).width());
  Session.set('pageLeftToWestRule', false);

  window.addEventListener('resize', function () {
    Session.set("resize", new Date());
    Session.set("appHeight", $(window).height());
    Session.set("appWidth", $(window).width());
  });


  //====================================================

  Session.setDefault("avatarImgSrc", 'https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xfa1/v/t1.0-9/10959424_1048857758463899_5840518008623403253_n.jpg?oh=9e5f381178590a5a67ff82f5e5dc37aa&oe=56D11A43');

  //====================================================

  Session.setDefault('accountCardVisible', false);
  // Session.setDefault('profileCardOpen', false);
  //
  // Session.setDefault('showAccountCard', false);
  // Session.setDefault('showThemeCard', false);
  // Session.setDefault('showProfileCard', false);

});


Session.setDefault('transparencyDivHeight', 100);
Session.setDefault('mainPanelLeft', 0);


Meteor.startup(function () {
  Template.appLayout.layout();
});



//==================================================================================================



Template.appLayout.onRendered(function () {
  Template.appLayout.layout();
  $('body').addClass('grayBackground');
});

Template.appLayout.events({
  'click #accountDock .cardHandle': function () {
    Session.toggle('accountCardVisible');
  },
  'click #rightDock .cardHandle': function () {
    Session.toggle('rightCardVisible');
  }
});


/**
 * @summary This is a Test
 * @locus Anywhere
 * @instancename collection
 * @class
 * @param {String} name The name of the collection.  If null, creates an unmanaged (unsynchronized) local collection.
 * @param {Object} [options]
 * @param {Object} options.connection The server connection that will manage this collection. Uses the default connection if not specified.  Pass the return value of calling [`DDP.connect`](#ddp_connect) to specify a different server. Pass `null` to specify no connection. Unmanaged (`name` is null) collections cannot specify a connection.
 * @param {String} options.idGeneration The method of generating the `_id` fields of new documents in this collection.  Possible values:
 * @param {Function} options.transform An optional transformation function. Documents will be passed through this function before being returned from `fetch` or `findOne`, and before being passed to callbacks of `observe`, `map`, `forEach`, `allow`, and `deny`. Transforms are *not* applied for the callbacks of `observeChanges` or to cursors returned from publish functions.
 */


Template.appLayout.helpers({
  showAccountCard: function () {
    return Session.get('showAccountCard');
  },
  showRightCard: function () {
    return Session.get('showRightCard');
  },
  rightCardStyle: function () {
    return "background: linear-gradient(45deg, transparent 16px, rgba(255,255,255," + Session
      .get("glassOpacity") + ") 0) bottom right;";
  },
  accountCardVisibility: function (){
    if (Session.get('accountCardVisible')) {
      return "right: 0px;";
    } else {
      return "right: -310px;";
    }
  },
  rightCardVisibility: function () {
    if (Session.get('rightCardVisible')) {
      return "right: 0px;";
    } else {
      return "right: -310px;";
    }
  },
  getContextTitle: function (){
    return Session.get('pageTitle');
  },
  resized: function () {
    Template.appLayout.layout();
  },
  getLeftPanelStyle: function () {
    return Style.parse(generateStylesheet());
  },
  getRightPanelStyle: function () {
    if (Session.get('pageIsWide')) {
      return "visibility: hidden; left: " + (Session.get('appWidth') + 1024) + "px;";
    } else {
      return Style.parse(generateStylesheet(true));
    }
  },
});



generateStylesheet = function (rightPanel) {
  var stylesheet = {};

    // RIGHT PANEL
  if (rightPanel) {
    if (Session.get('appWidth') > 2076) {
      var halfDiff = (Session.get('appWidth') - 1856) * 0.5;
      if (Session.get('westPanelVisible')) {
        halfDiff = halfDiff + 300;
      }
      stylesheet.left = (halfDiff + 938) + "px;";
    } else {
      var leftPosition = Session.get('mainPanelLeft');
      if (Session.get('westPanelVisible')) {
        leftPosition = leftPosition + 300;
      }
      stylesheet.left = leftPosition + "px;";
      stylesheet.visibility = "hidden;";
    }
  } else {
    // LEFT PANEL
    var leftPosition = Session.get('mainPanelLeft');
    if (Session.get('westPanelVisible')) {
      //leftPosition = leftPosition + 300;
      leftPosition = 440;
    };
    stylesheet.left = leftPosition + "px;";
  };



  if (Session.get('pageIsWide')) {
    stylesheet.width = (Session.get('appWidth') - 400) + "px;";
    stylesheet["max-width"] = (Session.get('appWidth') - 400) + "px;";
  } else {
    stylesheet.width = "100%;";
    stylesheet["max-width"] = "768px;";
  }


  var marginBottom = 0;

  if (Session.get('mainPanelIsCard')) {
    marginBottom = marginBottom + 50;
  } else {
    marginBottom = marginBottom;
  }

  if (Session.get('showNavbars')) {
    marginBottom = marginBottom + 50;
  } else {
    marginBottom = marginBottom;
  }

  stylesheet["margin-bottom"] = marginBottom + "px;";

  return stylesheet;
};


Template.appLayout.layout = function () {
  Session.set('transparencyDivHeight', $('#innerPanel').height() + 80);


  // two-page with sidebar
  // 2076 = 2 (768px panels) + 100px spacer + 2 margins at least 220px wide
  if (Session.get('appWidth') > 2096) {
    Session.set('sidebarLeft', (100 + (Session.get('appWidth') - 1876) * 0.5) - 240);
    Session.set('mainPanelLeft', (100 + (Session.get('appWidth') - 1856) * 0.5));
    Session.set("sidebarVisible", true);

    // one-page with sidebar
    // 1208 =  single 768px panel + 2 margins at least 220px wide + 20px sidebar spacer
  } else if (Session.get('appWidth') > 1228) {
    Session.set('sidebarLeft', (Session.get('appWidth') - 1228) * 0.5);
    Session.set("sidebarVisible", true);
    Session.set('mainPanelLeft', (Session.get('appWidth') - 768) * 0.5);

    if (Session.get('pageLeftToWestRule')) {
      Session.set('mainPanelLeft', 200);
    } else {
      Session.set('mainPanelLeft', (Session.get('appWidth') - 768) * 0.5);
    }

    // one-page
    // 768 =  single 768px panel
  } else if (Session.get('appWidth') > 768) {
    Session.set('mainPanelLeft', (Session.get('appWidth') - 768) * 0.5);
    Session.set("sidebarLeft", -200);
    Session.set("sidebarVisible", false);

    // mobile
  } else {
    Session.set('mainPanelLeft', 0);
    Session.set("sidebarLeft", -200);
    Session.set("sidebarVisible", false);
  }
};

Template.appLayout.delayedLayout = function (timeout) {
  Meteor.setTimeout(function () {
    Template.appLayout.layout();
  }, timeout);
};
