var bcrypt = require("bcrypt");
var pass = '$2b$08$DWxBh.qdAW3OiNSJ8JwG/.ZWOF3oaMf8ieqkIXIySXQasY5w2Z49.';
var my = 'Vishw@123'
console.log(bcrypt.compareSync(my,bcrypt.hashSync(my,8)));