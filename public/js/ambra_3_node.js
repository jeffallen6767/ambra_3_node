
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
          var 
            data = inst.createNodeData({
              "levels": 3,
              "min": 4,
              "max": 8
            });
          
          inst.displayTree(data);
        },
        "createNodeData": function(params) {
          var 
            RANDOM_NAME = NO_CHILDREN = null,
            utils = modules["utils"],
            node = modules["node"],
            levels = params.levels,
            min = params.min,
            max = params.max,
            data = [],
            level, todo, half, gender, pair,
            
            grandparents, 
            parents = [], 
            kids = [],
            
            grandDads, grandMas, grandPairs,
            dads = [], 
            moms = [],
            sons, daughters,
            offspring,
            
            x,y,z,
            
            getPeople = function getPeople(parents) {
              var
                people = {},
                boys = people.boys = [],
                girls = people.girls = [],
                todo, half,
                j;
              
              todo = utils.rand(min, max);
              half = Math.floor(todo / 2);
              
              for (j=0; j<todo; j++) {
                if (j < half) {
                  boys.push(
                    node.create("male", RANDOM_NAME, parents, NO_CHILDREN)
                  );
                } else {
                  girls.push(
                    node.create("female", RANDOM_NAME, parents, NO_CHILDREN)
                  );
                }
              }
              
              parents.forEach(function(parent) {
                boys.forEach(function(boy) {
                  parent.addChild(boy);
                });
                girls.forEach(function(girl) {
                  parent.addChild(girl);
                });
              });

              return people;
            };
          
          grandparents = getPeople([]);
          console.log("grandparents", grandparents);
          
          grandDads = grandparents.boys;
          console.log("grandDads", grandDads);
          // save data:
          grandDads.forEach(function(male) {
            data.push(male);
          });
          
          grandMas = grandparents.girls;
          console.log("grandMas", grandMas);
          // save data:
          grandMas.forEach(function(female) {
            data.push(female);
          });
          
          grandPairs = Math.min(grandDads.length, grandMas.length);
          
          for (x=0; x<grandPairs; x++) {
            pair = [
              utils.pick(grandDads),
              utils.pick(grandMas)
            ];
            //console.log(x, grandDads.length, grandMas.length, pair);
            parents.push(
              getPeople(pair)
            );
          }
          
          console.log("parents", parents);
          
          // don't allow inbreeding:
          for (x=0; x<grandPairs; x++) {
            pair = parents[x];
            // save data:
            pair.boys.forEach(function(male) {
              data.push(male);
            });
            pair.girls.forEach(function(female) {
              data.push(female);
            });
            dads = pair.boys;
            moms = [];
            for (y=0; y<grandPairs; y++) {
              // if male and female not from same parents...
              if (x != y) {
                parents[y].girls.forEach(function(female) {
                  // add the female to the list of possible mates...
                  moms.push(female);
                });
              }
            }
            // mate males with random females from available pool of non-siblings:
            dads.forEach(function(dad) {
              pair = [
                dad,
                utils.pick(moms)
              ];
              offspring = getPeople(pair);
              // save data:
              offspring.boys.forEach(function(male) {
                data.push(male);
              });
              offspring.girls.forEach(function(female) {
                data.push(female);
              });
              kids.push(offspring);
            });
          }
          
          console.log("kids", kids);
          
          return data;
        },
        "displayTree": function(data) {
          console.log('displayTree');
          console.log(data);
        },
        "test": function() {
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
/*
              boys.forEach(function(boy) {
                children.push(boy);
              });
              girls.forEach(function(girl) {
                children.push(girl);
              });
              */
              /*
              next = depth + 1;
              if (next < levels) {
                boys.forEach(function(man) {
                  addChildren([
                    man, utils.choose(women)
                  ]);
                });
              }
              */
              
              /*
          for (x=0; x<levels; x++) {
            
          }
          data.push(
            addChildren([], 0)
          );
          */
          /*
          for (x=0; x<levels; x++) {
            
              gender = y < half ? "male" : "female";
              level.push(
                node.create(gender)
              );
            }
          }
          */
                    /*
          grandDads.forEach(function(grandDad) {
            parents = getPeople([
              grandDad, 
              utils.choose(grandMas)
            ]);
            dads = parents.boys;
            moms = parents.girls;
          });
          
          */