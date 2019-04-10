/* eslint-disable no-console */
// ta truy cap vao mongoDB package
const mongodb = require("mongodb");

// Tach mongo client constructor
const MongoClient = mongodb.MongoClient;

// _ : chi duoc su dung trong this file
let _db;

// Uniform Resource Identifier, chuỗi ký tự để xác nhận
// test: database
// const uri = "mongodb+srv://node:<Vuong0935986100>@vuonglegend98-j2hfj.mongodb.net/test?retryWrites=true";
const uri = "mongodb+srv://nodejs:Vuong0935986100@cluster0-aecmg.mongodb.net/shop?retryWrites=true";

// Lay client ket noi den mongoDB
// tom tat ca vao trong 1 method
// callback: la 1 ham nhan tham so la client1 nen de tra ve app.js thi
// ta goi callback("THAM SO CAN GUI QUA").
const mongoConnect = (callback) => {
    // tao ket noi den mongoDB voi url dung voi MongoDB Atlas Cluster page
    // ket noi tra ve promise nen co .then().catch()
    MongoClient.connect(uri, {useNewUrlParser: true})
        .then((client) => {
            console.log("CONNECTED");

            // luu cac truy cap den db => no ket noi test database mac dinh
            // _db = client.db('test'); // viet chong database test len   
            _db = client.db("shop");

            callback(_db);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;