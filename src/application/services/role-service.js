const AppError = require('../../infrastructure/errors/app-error');
const RoleRepository = require('../../domain/repositories/role-repository');
const CreateRoleDTO = require('../dtos/roles/create-role-dto');
const UpdateRoleDTO = require('../dtos/roles/update-role-dto');
const RoleDTO = require('../dtos/roles/role-dto');

class RoleService {
    async findAllRoles() {
        const roles = await RoleRepository.findAll();
        const roleDTOs = roles.map(role => new RoleDTO(role));
        return roleDTOs;
    }

    async findRoleById(id) {
        const role = await this.findRoleOrThrow(id);
        return new RoleDTO(role);
    }

    async createRole(roleData) {
        const roleDTO = new CreateRoleDTO(roleData);
        const newRole = await RoleRepository.create(roleDTO);
        return new RoleDTO(newRole);
    }

    async findByIdAndUpdateRole(id, roleData) {
        await this.findRoleOrThrow(id);
        const roleDTO = new UpdateRoleDTO(roleData);
        const role = await RoleRepository.findByIdAndUpdate(id, roleDTO);
        return new RoleDTO(role);
    }

    async findByIdAndSoftDeleteRole(id) {
        await this.findRoleOrThrow(id);
        return await RoleRepository.findByIdAndSoftDelete(id);
    }

    async findByIdAndRestoreRole(id) {
        await this.findRoleOrThrow(id);
        return await RoleRepository.findByIdAndRestore(id);
    }

    async findRoleOrThrow(id) {
        const role = await RoleRepository.findById(id);
        if (!role)
            throw new AppError('Role not found!', 404);
        return role;
    }
}

module.exports = new RoleService;