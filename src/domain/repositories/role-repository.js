const BaseRepository = require('../../infrastructure/repositories/base-repository');
const Role = require('../models/role');

class RoleRepository extends BaseRepository {
    constructor() {
        super(Role);
    }
}

module.exports = new RoleRepository;