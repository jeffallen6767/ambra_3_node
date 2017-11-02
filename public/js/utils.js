Ambra_3_node.define("utils", function(ctx) {
  var
    inst = {
      "choose": function(vals) {
        var
          len = vals.length,
          idx = Math.floor(
            Math.random() * len
          ),
          choice = vals[idx];
        return choice;
      }
    };
  return inst;
});
