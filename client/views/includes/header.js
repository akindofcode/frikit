Template.header.helpers({
    activeRouteClass: function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        var active = _.any(args, function(name) {
            return location.pathname === Router.path(name);
        });

        return active && 'active';
    },
    activeRecientes: function() {
        if (Session.equals("orden","recientes")) return 'active';
        else return '';
    },
    activePopulares: function() {
        if (Session.equals("orden","populares")) return 'active';
        else return '';
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
    },
    'click .home': function() {
        Session.set("opcion","Todo");
    },
    'click .recientes': function() {
        Session.set("orden","recientes");
    },
    'click .populares': function() {
        Session.set("orden","populares");
    }
})
