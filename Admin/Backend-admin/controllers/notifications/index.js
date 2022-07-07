const { Types } = require("mongoose");
const { ObjectId } = Types;
const User = require("../../models/user");

module.exports = {
  async all(req, res) {
      try{
    let inActiveUsers = await User.find({isActive: false})
    
    if (!inActiveUsers || !inActiveUsers.length) {
        return res.status(200).json({ message: "No notifications" });
    }
    let notifications=inActiveUsers.map(u=>{return {id: u._id, type: 'users', message: `${u.firstName} ${u.lastName} joined and inactive.`, timeStamp: formatDateTime(u.creationDate), image: u.image ? u.image:'person.png'}});
    return res.status(200).json({ notifications });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ message: "ERROR Getting notifications", err });
      };
  },
}
function appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }
  
  function formatDateTime(current_datetime) {
  return current_datetime.getFullYear() + "-" + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate()) + " " + appendLeadingZeroes(current_datetime.getHours()) + ":" + appendLeadingZeroes(current_datetime.getMinutes()) + ":" + appendLeadingZeroes(current_datetime.getSeconds())
  }