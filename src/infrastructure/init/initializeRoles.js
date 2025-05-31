const RoleRepository = require('../../domain/repositories/role-repository');

const initializeRoles = async function () {
    const defaultRoles = [
        { roleName: 'admin', description: 'Administration role' },
        { roleName: 'user', description: 'Default role' }
    ];
    for (let role of defaultRoles) {
        const existingRole = await RoleRepository.findOne({ roleName: role.roleName });
        if (!existingRole) {
            await RoleRepository.create(role);
            console.log(`Created role name: ${role.roleName}`);
        }
    }
};

module.exports = initializeRoles;