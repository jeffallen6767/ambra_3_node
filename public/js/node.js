Ambra_3_node.define("node", function(ctx) {
  var
    utils = ctx.require("utils"),
    names = ctx.require("names"),
    inst = {
      "create": function(gender, name, parents, children) {
        var
          gender = gender || utils.choose(names.genders),
          name = name || names.create(gender),
          parents = parents || [],
          children = children || [],
          node = {
            "name": name,
            "parents": parents,
            "children": children,
            "addParent": function(parent) {
              parents.push(parent);
            },
            "addChild": function(child) {
              children.push(child);
            }
          };
        return node;
      }
    };
  return inst;
});
