var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
    {
        number: {type: Number, required: true, unique: true}
    }
);

var Table = mongoose.model('Table', TableSchema)

Table.find().exec((err, tables) => {
    if (tables.length === 0) {
        for (var i = 0; i < 5; i++) {
            (new Table({number: i})).save(function (err) {
                if (err) return console.info(err);
            });
        }
    }
})



module.exports = Table;