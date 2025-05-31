const BaseRepository = require('../../infrastructure/repositories/base-repository');
const User = require('../models/user');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByIdAndRole(id) {
        return await User.findById(id).populate('role');
    }
}

module.exports = new UserRepository;