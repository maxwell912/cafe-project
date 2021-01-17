const mongoose = require('mongoose');

const Schema = mongoose.Schema;

function getCode() {
    const chars = 'acdefhiklmnoqrstuvwxyz0123456789'.split('');
    let result = '';
    for(let i=0; i< 6; i++){
        const x = Math.floor(Math.random() * chars.length);
        result += chars[x];
    }
    return result;
}

const BookingSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        table: {type: Schema.Types.ObjectId, ref: 'Table', required: true},
        date: {type: Schema.Types.Date, required: true},
        code: {type: String, required: true, default: getCode}
    }
);

module.exports = mongoose.model('Booking', BookingSchema);