class UpdateRoleDTO {
    constructor({
        roleName,
        description
    }) {
        this.roleName = roleName;
        this.description = description;
    }
}

module.exports = UpdateRoleDTO;