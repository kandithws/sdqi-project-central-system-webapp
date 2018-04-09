var AccessControl = require('accesscontrol');
var ac = new AccessControl();

ac.grant('user')                    // define new or modify existing role. also takes an array.
    .createOwn('Car')             // equivalent to .createOwn('video', ['*'])
    .readOwn('Car')
    .updateOwn('Car')
    .deleteOwn('Car')
  .grant('admin')                   // switch to another role without breaking the chain
    .extend('user')
    .createAny('Car')
    .readAny('Car')                 // inherit role capabilities. also takes an array
    .updateAny('Car')  // explicitly defined attributes
    .deleteAny('Car');



/* function isResourceOwner(req){ 
} => check if user is the owner of that resource
*/

function mapAdminToRole(admin){
  if(admin){
    return 'admin';
  }
  else{
    return 'user';
  }
}

function isResourceOwner(req, resrc){
    var owner = resrc.getUser()
    return req.user.id === owner.id
}


module.exports.isAuthorizedOwn = function(req, action, resource_name){
    var actmp = ac.can( mapAdminToRole(req.user.admin) );
    
    var permission = false;
    switch(action){
        case 'create':
          permission = actmp.createOwn(resource_name).granted
          break;
        case 'read':
          permission = actmp.readOwn(resource_name).granted;
          break;
        case 'update':
          permission = actmp.updateOwn(resource_name).granted;
          break;
        case 'delete':
          permission = actmp.deleteOwn(resource_name).granted;
          break; 
        default:
          throw Error('No specified Type'); 
  
    }

    // console.log("Permission own :" + permission.toString())
  
    return permission 
}

module.exports.isAuthorizedOwnObject = function(req, action, resource_obj){
  var actmp = ac.can( mapAdminToRole(req.user.admin) );
  var permission = false;
  switch(action){
      case 'create':
        permission = actmp.createOwn(resource_obj.name).granted
        break;
      case 'read':
        permission = actmp.readOwn(resource_obj.name).granted && isResourceOwner(req, resource_obj);
        break;
      case 'update':
        permission = actmp.updateOwn(resource_obj.name).granted && isResourceOwner(req, resource_obj);
        break;
      case 'delete':
        permission = actmp.deleteOwn(resource_obj.name).granted && isResourceOwner(req, resource_obj);
        break; 
      default:
        throw Error('No specified Type');

  }

  return permission 
}

module.exports.isAuthorizedAny = function(req, action, resource_name){
    var actmp = ac.can( mapAdminToRole(req.user.admin) );
    var permission = false;
    switch(action){
        case 'create':
          permission = actmp.createAny(resource_name).granted
          break;
        case 'read':
          permission = actmp.readAny(resource_name).granted
          break;
        case 'update':
          permission = actmp.updateAny(resource_name).granted
          break;
        case 'delete':
          permission = actmp.deleteAny(resource_name).granted
          break; 
        default:
          throw Error('No specified Type');
    }
    return permission;
}

module.exports.ac = ac;