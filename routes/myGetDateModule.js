
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
t = months[d.getMonth()]+(d.getFullYear()).toString();
module.exports = t;