const Booking = require("../models/booking");
const Table = require("../models/tables");
const User = require("../models/users");


async function getFreeTable(date) {
    const tables = await Table.find();

    for (let table of tables) {
        let books = await Booking.find({"table": table.id, "date": date});
        if (books.length === 0)
            return table.id;
    }
    return null;
}

exports.add = async function(req, res) {
    console.log(req.body)

    let tableId = await getFreeTable(req.body.date);
    let userId = await User.addOrUpdate(req.body);
    if (!tableId) {
        res.status(400)
        res.send("No free tables")
        return
    }
    if (!userId) {
        res.status(400)
        res.send("No user data")
        return
    }

    if (!req.body.date) {
        res.status(400)
        res.send("No date")
        return
    }

    let newBook = new Booking(
        {
            user: userId,
            table: tableId,
            date: req.body.date
        }
    )
    newBook.save((err) => {
        if (err) {
            console.log(err);
        }
    });

    res.status(200)
    res.send(newBook.code)
}

exports.delete = async function(req, res) {
    var deleteInfo = await Booking.deleteOne({code: req.body.code});
    if (deleteInfo.deletedCount === 1) {
        res.status(200)
        res.send("OK")
    } else {
        res.status(400)
        res.send("Wrong code")
    }
}