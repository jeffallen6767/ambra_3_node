Ambra_3_node.define("node", function(ctx) {
  var
    inst = {
      "create": function(name, parents, children) {
        var
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
