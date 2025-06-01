const moment = require('moment');

class UpdateUserDTO {
    constructor(user) {
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dateOfBirth = moment(user.dateOfBirth, 'DD/MM/YYYY').toDate();
        this.gender = user.gender;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
    }
}

module.exports = UpdateUserDTO;