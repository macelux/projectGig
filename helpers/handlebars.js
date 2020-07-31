// register method to increment values in array loop
let register = function(Handlebars) {
    let helpers = {
        inc: function(value, options) {
            return parseInt(value) + 1;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);