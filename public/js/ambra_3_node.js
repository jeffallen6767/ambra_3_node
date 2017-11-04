
var
  Ambra_3_node = (function() {
    var 
      loadingEl,
      contentEl,
      modules = {},
      inst = {
        "define": function(name, ctor) {
          modules[name] = ctor(inst);
        },
        "require": function(name) {
          return modules[name];
        },
        "init": function() {
          loadingEl = $('#loading');
          contentEl = $('#content');
          inst.start();
        },
        "start": function() {
          inst.displayTree(
            inst.createNodeData({
              "levels": 3,
              "min": 4,
              "max": 8
            })
          );
        },
        "getPeople": function(parents, params) {
          var
            RANDOM_NAME = NO_CHILDREN = null,
            utils = modules["utils"],
            node = modules["node"],
            people = {},
            boys = people.boys = [],
            girls = people.girls = [],
            todo = utils.rand(params.min, params.max), 
            half = Math.floor(todo / 2),
            j;
          
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
        },
        "createNodeData": function(params) {
          var 
            utils = modules["utils"],
            pairs = [], 
            data = [],
            group, males, females, 
            pair, maxPairs, parentPairs,
            x,y;

          group = inst.getPeople([], params);
          males = group.boys;
          females = group.girls;
          
          // save data:
          males.forEach(function(male) {
            data.push(male);
          });
          females.forEach(function(female) {
            data.push(female);
          });
          
          // breed initial pairs
          maxPairs = Math.min(males.length, females.length);
          for (x=0; x<maxPairs; x++) {
            pair = [
              utils.pick(males),
              utils.pick(females)
            ];
            pairs.push(
              inst.getPeople(pair, params)
            );
          }

          // don't allow inbreeding of siblings:
          for (x=0; x<maxPairs; x++) {
            pair = pairs[x];
            
            // save data:
            pair.boys.forEach(function(male) {
              data.push(male);
            });
            pair.girls.forEach(function(female) {
              data.push(female);
            });
            
            males = pair.boys;
            females = [];
            
            for (y=0; y<maxPairs; y++) {
              // if male and female not from same parents...
              if (x != y) {
                pairs[y].girls.forEach(function(female) {
                  // add the female to the list of possible mates...
                  females.push(female);
                });
              }
            }
            
            // mate random males with random females from available pool of non-siblings:
            parentPairs = Math.min(males.length, females.length);
            for (y=0; y<parentPairs; y++) {
              pair = [
                utils.pick(males),
                utils.pick(females)
              ];
              group = inst.getPeople(pair, params);
              // save data:
              group.boys.forEach(function(male) {
                data.push(male);
              });
              group.girls.forEach(function(female) {
                data.push(female);
              });
            }
          }

          return data;
        },
        "displayTree": function(data) {
          loadingEl.fadeOut("slow", function() {
            contentEl.fadeIn("slow");
          });
          contentEl.empty().append(
            inst.getTreeHtml(data)
          );
          inst.animateTreeHtml();
        },
        "animateTreeHtml": function() {
          modules["MultiNestedList"].create();
        },
        "getTreeHtml": function(data) {
          return inst.getChildrenHtml({
            "children": data.filter(function(person) {
              return person.parents.length === 0;
            })
          });
        },
        "getChildrenHtml": function(person) {
          var 
            children = ['<ul>'];
          
          person.children.forEach(function(child) {
            var 
              gender = inst.getGender(child),
              title = inst.getTitle(child),
              name = inst.getName(child);
            
            children.push(
              '<li><a href="#" class="node_person gender_' + gender + '"' + title + '>' + name + '</a>'
            );
            
            if (child.children.length) {
              children.push(
                inst.getChildrenHtml(child)
              );
            }
            
            children.push('</li>');
          });
          
          children.push('</ul>');
          
          return children.join("");
        },
        "getTitle": function(child) {
          var
            p = child.parents;
          return (
            p.length
              ? 'title="Parents:\n' + p.map(inst.getName).join("\n") + '"'
              : ''
          );
        },
        "getName": function(person) {
          return person.name.getName();
        },
        "getGender": function(person) {
          return person.name.gender;
        }
      };
    return inst;
  })();
