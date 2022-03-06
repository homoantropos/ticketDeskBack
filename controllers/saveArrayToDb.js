const Auditorium_section = require("../models/AuditoriumSection");
const Seat = require("../models/Seat");

module.exports = async function saveArrayToDb(array, seats) {
    try {
        await array.map(
            async seat => {
                const section = await Auditorium_section.findOne({
                    where: {
                        sectionName: seat.sectionName
                    }
                });
                const newSeat = await Seat.scope('place').findOrCreate({
                    where: {
                        row: seat.row,
                        seatNumber: seat.seatNumber,
                        auditoriumSectionId: section.id
                    }
                });
                seats.push(newSeat[0]);
                console.log('newTry: ', seats);
            }
        )
    } catch(error) {
        console.log(error)
    }
}
