
var
	Ambra_3_node = (function() {
		var 
      modules = {},
      inst = {
        "define": function(name, ctor) {
          modules[name] = ctor(inst);
        },
        "require": function(name) {
          return modules[name];
        },
        "init": function() {
          console.log("Ambra_3_node.init...");
          console.log("modules");
          Object.keys(modules).forEach(function(key, idx) {
            console.log(key, modules[key]);
          });
          var 
            names = modules["names"],
            node = modules["node"],
            dad = node.create(
              names.create("male")
            ),
            mom = node.create(
              names.create("female")
            ),
            firstborn = node.create(
              names.create(),
              [dad, mom]
            ),
            secondborn = node.create(
              names.create(),
              [dad, mom]
            );
          dad.addChild(firstborn);
          mom.addChild(firstborn);
          dad.addChild(secondborn);
          mom.addChild(secondborn);
          
          console.log("dad");
          console.log(dad);
          
          console.log("mom");
          console.log(mom);
          
        }
      };
		return inst;
	})();
