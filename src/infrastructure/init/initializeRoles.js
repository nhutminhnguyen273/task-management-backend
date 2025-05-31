const RoleRepository = require('../../domain/repositories/role-repository');

const initializeRoles = async function() {
    const existingAdmin = await RoleRepository.findOne({roleName: 'admin'});

    if (!existingAdmin) {
        await RoleRepository.create({
            roleName: 'admin',
            description: 'Administration role',
        });
        console.log('Role "admin" created');
    } else {
        console.log('Role "admin" already exists');
    }
};

module.exports = initializeRoles;