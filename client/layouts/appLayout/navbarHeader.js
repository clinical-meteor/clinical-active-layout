Session.setDefault("show_background", false);
Session.setDefault('showSearchCorner', false);



Template.appLayout.events({
  'keyup #globalSearchBar' : function (){
    Session.set('collaborationSearchFilter', $('#globalSearchBar').val());
  },
  'change #globalSearchBar' : function (){
    Session.set('collaborationSearchFilter', $('#globalSearchBar').val());
  },
  'click #navbarTitle': function () {
    Router.go('/');
  },
  'click #logoutLink': function () {
    Meteor.logout();
    Router.go('/entrySignIn');
  }
});


Template.registerHelper("getPageTitle", function (argument){
  return Session.get('pageTitle');
});


Template.appLayout.helpers({
  getSearchBarWidth: function(){
    ActiveLayout.getNavWidth();
  },
  hasEntryControls: function (){
    var headerConfig = Session.get('HeaderConfig');
    if (headerConfig && (typeof headerConfig.hasEntryControls === "boolean")) {
      return headerConfig.hasEntryControls;
    } else {
      return true;
    }
  },
  breadcrumbsExist: function (){
    if (Session.get('pageTitle')) {
      return true;
    } else {
      return false;
    }
  },
  getSearchStyle: function (){
    style = "";
    if (Session.get('showNavbars')) {
      style = "top: 50px;";
    } else {
      style = "top: 0px;";
    }
    if (Session.get('showSearchCorner')) {
      style = style + "visibility: visible; background: linear-gradient(315deg, transparent 24px, rgba(255,255,255," + Session.get('glassOpacity') + ") 0) bottom right;";
    } else {
      style = style + "visibility: visible;";
    }

    if (Session.get('showSearchbar')) {
      style = style + " height: 50px;";
    } else {
      style = style + " height: 0px;";
    }
    return style;
  },
  showSearchBar: function (){
    return Session.get('showSearchbar');
  },
  isVisible: function (){
    if (Session.get('showNavbars')) {
      return "height: 50px; top: 0px; ";
    } else {
      return "height: 0px; top: -50px; ";
    }
  },
  getTitleText: function () {
    // var headerConfig = Session.get('HeaderConfig');
    // if (headerConfig && headerConfig.text) {
    //   return headerConfig.text.title;
    // } else {
    //   return "---";
    // }
    return Theme.getAppTitle();
  },
  getUserName: function () {
    if (Meteor.userId()) {
      return User.getName();
    } else {
      return "LogIn";
    }
  },
  getUsernameLink: function () {
    if (Meteor.userId()) {
      return "";
    } else {
      return "/entrySignIn";
    }
  },
  status: function () {
    return Meteor.status().status;
    return JSON.stringify(Meteor.status());
  }
});
