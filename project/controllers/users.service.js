const pool = require('../mysqldb');

const create = async(data,callback) => {
        const {firstName,lastName,gender,email,password,number} = data
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
             values(?,?,?,?,?,?)`,
             [
                firstName,
                lastName,
                gender,
                email,
                password,
                number
             ],
             (err,result) => {
                if (err) {
                   return   callback(err);
                }
                else {
                    return callback(null, result);
                }
             }
        )
}

const getUser = callback => {
    pool.query(
        "select * from registration",
        [],
        (err,result) => {
            if (err) {
               return  callback(err);
            }
            else {
                return callback(null,result);
            }
        }
    )
}

const getUserByEmail = (email, callback) => {
    pool.query(
        "select * from resgistration where email = ?",
        [email],
        (err, result) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(null,result[0]);
            }
        }
    )
}

const getUserById = (id, callback) => {
    pool.query(
        "select * from registration where id = ?",
        [id],
        (err,result) => {
            if (err) {
               return  callback(err)
            }
            else {
                return (null, result[0]);
            }
        }
    )
}

const updateUser = (data,callback) => {
    const {firstName,lastName,gender,password,email,id,number} = data;

    pool.query(
        "update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?",
        [
            firstName,
            lastName,
            gender,
            email,
            password,
            number,
            id
        ],
        (err,result) => {
            if (err) {
               return  callback(err);
            }
            else {
                return callback(null,result[0]);
            }
        }
    )
}

const deleteUser = (id,callback) => {
    pool.query (
        `delete from registration where id = ?`,
        [id],
        (err,result) => {
            if (err) {
                return callback(err);
            }
            else {
                return callback(result[0]);
            }
        }
    )
}
module.exports = {
     create,
     getUser, 
     getUserById, 
     updateUser,
     deleteUser,
     getUserByEmail};