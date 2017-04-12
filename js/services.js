var app = angular.module('ssisapp.services', [])

app.service('MenuList', function() {
  var menu = [
    {
      id: 1, 
      title: 'Login', 
      icon: 'ion-social-facebook',
      submenu: [{
        id: 10,
        title: 'Dashboard',
        icon: 'ion-ios-gear-outline',
        state: 'app.dashboard'
      },{
        id: 11,
        title: 'Facebook',
        icon: 'ion-social-facebook',
        state: 'app.fblogin'
      },{
        id: 12,
        title: 'Google Plus ',
        icon: 'ion-social-googleplus',
        state: 'app.gplogin'
      }]
    },{
      id: 2, 
      title: 'Setting', 
      icon: 'ion-ios-gear-outline',
      submenu: [{
        id: 20,
        title: 'Feedback',
        icon: 'ion-ios-email-outline',
        state: 'app.feedback'
      }]
    }
  ];

  var getMenuById = function(id){
    for(var i in menu){
      if(menu[i].id == id)
        return menu[i];
    }
  }

  var getAllMenu  = function(){
    return menu;
  }

  return {
    getMenuById: getMenuById,
    getAllMenu : getAllMenu 
  };
})

;