const {
    create,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
} = require("../controllers/users.service");

const {
    genSaltSync,
    hashSync,
    compareSync
} = require('bcrypt');
const {sign} = require('jsonwebtoken');

const createUser = async (req,res) => {
    const body = req.body;
    const salt = await  genSaltSync(10);
    body.password = await hashSync(body.password,salt);
    create (body,(err,result) => {
        if (err) {
            console.log(err);
            res.status(500).json({"msg" : "Mysql connection error"});
        }
        else {
            res.status(200).json({"success" : true, "data" : result});
        }
    });
}

const login = async (req,res) => {
    const body = req.body;

    getUserByEmail(body.email, async (err,results) => {
        if (err) {
            console.log(err);
            res.status(500).send({"msg" : "my sql connection error"});
        }
        else if (!result) {
            res.status(400).send({"msg" : "Invalid email or password"});
        }
        else {
            const result = await compareSync(body.password,result.password);

            if (result) {
                results.password = undefined;
                const jwt = await sign({results : results},"shubham", {expiresIn : "1d"});
                res.json({success : true,"msg" : "login successfully", token : jwt});
            }
            else {
                return res.status(400).json({
                    success: 0,
                    data: "Invalid email or password"
                  });
            }
        }
    })

}

const deleteUser = (req,res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      else if (!results) {
        return res.json({
          success: 0,
          message: "User not found"
        });
      }
      else {
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    }
    });
}

const updateUser = async (req,res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      else {
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    }
    });
}

const getUserById = (req,res) => {
    const {id} = req.body;

    getUserById(id, (err,results) => {
        if (err) {
            console.log(err);
            res.status(500).send({"msg" : "my sql connection error"});
        }
        if (!results) {
            return res.send({"msg" : "user not found"});
        }
        return res.json({"success" : true, "user" : results});
    })
}

const getUsers = (req,res) => {
    getUser((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results
        });
      });
}
module.exports = {
    createUser,
    login,
    deleteUser,
    updateUser,
    getUserById,
    getUsers
};