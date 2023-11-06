const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

//Ngoài jwt - còn check xem role có được phép truy cập route (api) đó hay không
//permission dưới dạng mảng các role được phép truy cập ['ADMIN', 'MOD']
const userAuth = (permission, autho) => {
  return async (req, res, next) => {
    //lấy token từ header - 'Bearer hjakjsjkdahshasdkjdsahjk'
    if (!req.get("Authorization")) {
      return res.status(401).json({ message: "Please login!" });
    }
    const token = req.get("Authorization").split(" ")[1];

    //dùng cấu trúc để decoded
    //jwt.verify(token, 'shhhhh', function(err, decoded) {})

    let decoded;
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, de) {
      //nếu có lỗi token thì return lỗi
      if (err) {
        return res.status(401).json({ message: err.message });
      }
      decoded = de;
    });
    //nếu decoded có thì thực hiện tiếp valid role
    if (decoded) {
      //tìm user theo jwt vừa gửi lên - để xác định có role hay không
      let userCurrent;
      //tìm trong admin
      userCurrent = await Admin.findById(decoded._id);
      //nếu không phải admin thì tìm trong user
      if (!userCurrent) {
        userCurrent = await User.findById(decoded._id);
      }

      if (!userCurrent) {
        return res.status(400).json({ message: "User Not Found!" });
      }
      //nếu role không nằm trong list thì báo lỗi
      if (!permission.includes(userCurrent.role)) {
        return res.status(401).json({ message: "Not Permission!" });
      }

      req.body._id = decoded._id;
      next();
    }
  };
};

module.exports = userAuth;
