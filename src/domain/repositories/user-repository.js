const BaseRepository = require('../../infrastructure/repositories/base-repository');
const User = require('../models/user');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
}

module.exports = new UserRepository;