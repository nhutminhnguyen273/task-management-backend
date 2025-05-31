class RoleDTO {
    constructor(role) {
        this.id = role._id || role.id;
        this.roleName = role.roleName;
        this.description = role.description;
        this.isDeleted = role.isDeleted;
        this.createAt = role.createAt;
        this.updateAt = role.updateAt;
    }
}

module.exports = RoleDTO;