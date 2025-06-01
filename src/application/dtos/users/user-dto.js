class UserDTO {
    constructor(user) {
        this.id = user._id || user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dateOfBirth = user.dateOfBirth;
        this.gender = user.gender;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.role = user.role;
    }
}

module.exports = UserDTO;