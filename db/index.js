var MongoClient = require('mongodb').MongoClient;
const app_config = require('config');

class DataBase {
    constructor(config) {
        if (!config){
            this.config = {
                username : 'root',
                password : '',
                host : 'localhost',
                port : 27017,
                database : 'default'
            }
        }else{
            this.config = config;
        }

        if (!config.username) this.config.username = 'root'
        if (!config.password) this.config.password = ''
        if (!config.host) this.config.host = 'localhost'
        if (!config.port) this.config.port = 27017
        if (!config.database) this.config.database = 'default'

        this.connection_url = "mongodb://"+this.config.host+":"+this.config.port;
        if(process.env.OPENSHIFT_MONGODB_DB_URL){
            this.connection_url = process.env.OPENSHIFT_MONGODB_DB_URL;
        }
        
        this.client = new  MongoClient(this.connection_url);
    }

    _checkCollectionExist(collection, cb){
        this.client.connect({ useNewUrlParser: true }, function(err) {
            if (err) return cb(err)
            var db = client.db(this.config.database);
            db.authenticate('username', 'password', function(err, result) {
                if (err) return cb(err)
                db.createCollection(collection , function(err, res) {
                    cb(db);
                });
            });
        });
    }

    save(collection, object, cb){
        this._checkCollectionExist(collection, function(db) {
            db.collection(collection).insertOne(object, function(err, res) {
                cb(err, res);
                db.close();
            });
        });
    }

    fetch(collection, query, cb){
        this._checkCollectionExist(collection, function(db) {
            db.collection(collection).find(query).toArray(function(err, res) {
                cb(err, res);
                db.close();
            });
        });
    }

    update(collection, query, newvalues,  cb){
        this._checkCollectionExist(collection, function(db) {
            db.collection(collection).updateOne(query, newvalues ,function(err, res) {
                cb(err, res);
                db.close();
            });
        });
    }


  }

module.exports = new DataBase(app_config.get('database.connection'))
