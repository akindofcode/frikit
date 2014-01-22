/* Template.header.helpers({
  activeRouteClass: function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();
    
    var active = _.any(args, function(name) {
      return Router.current().route.name === name
    });
    
    return active && 'active';
  }
}); */

// No funciona bien del todo, hay que refrescar para que se active el boton

Template.header.helpers({
    activeRouteClass: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function(name) {
            return location.pathname === Router.path(name);
        });

        return active && 'active';
    }
});


Template.header.events({
    'click .Cine': function() {
        Session.set("opcion","Cine");
    },
    'click .Comics': function() {
        Session.set("opcion","Comics");
    },
    'click .Informatica': function() {
        Session.set("opcion","Informática");
    },
    'click .Libros': function() {
        Session.set("opcion","Libros");
    },
    'click .Videojuegos': function() {
        Session.set("opcion","Videojuegos");
    },
    'click .Musica': function() {
        Session.set("opcion","Música");
    },
    'click .Otros': function() {
        Session.set("opcion","Otros");
    },
    'click .Television': function() {
        Session.set("opcion","Televisión");
    },
    'click .Todos': function() {
        Session.set("opcion","Todo");
    }


})
