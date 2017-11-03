Ambra_3_node.define("names", function(ctx) {
  var
    choose = ctx.require("utils").choose,
    genders = ["male", "female"],
    names = {
      "male": [
        "Alex", "Bob", "Cecil", "Dan", "Eric", "Fred", "Greg",
        "Henry", "Ian", "Jeff", "Kevin", "Larry", "Mike", "Nick", 
        "Oscar", "Paul", "Quagmire", "Randy", "Sam", "Tyson",
        "Ulisses", "Victor", "Walter", "Xavior", "Yale", "Zack"
      ],
      "female": [
        "Allison", "Betty", "Cindy", "Danna", "Elvira", "Fara", "Gayle",
        "Hana", "Iola", "Jenny", "Kristen", "Lana", "Mary", "Nancy",
        "Odette", "Pam", "Quisha", "Rachael", "Sally", "Tammy",
        "Ulga", "Vicky", "Wendy", "Xena", "Yolanda", "Zena"
      ],
      "last": [
        "Allen", "Babcock", "Clarke", "Davies", "Evans", "Fox", "Green",
        "Harris", "Ireland", "Jones", "King", "Lewis", "Martin", "Nicholson",
        "Osborne", "Phillips", "Quinn", "Roberts", "Smith", "Taylor",
        "Upton", "Valentine", "Williams", "Xanders", "Young", "Zaoui"
      ],
      "initials": [
        "A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z"
      ]
    },
    // return provided "male", "female" OTHERWISE choose random
    getType = function(gender) {
      if (gender === "male" || gender === "female") {
        return gender;
      } else {
        return choose(genders);
      }
    },
    inst = {
      "genders": genders,
      "create": function(gender) {
        var
          type = getType(gender),
          first = choose(names[type]),
          last = choose(names["last"]),
          initial = choose(names["initials"]),
          name = {
            "gender": gender,
            "first": first,
            "initial": initial,
            "last": last,
            "getName": function() {
              return [name.first, name.initial + ".", name.last].join(" ");
            }
          };
        return name;
      }
    };
  return inst;
});
