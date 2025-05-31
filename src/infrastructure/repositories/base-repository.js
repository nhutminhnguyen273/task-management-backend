class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(filter = {}) {
        return await this.model.find(filter);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findOne(filter) {
        return await this.model.findOne({ ...filter, isDeleted: false });
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findByIdAndUpdate(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async findByIdAndSoftDelete(id) {
        return await this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }

    async findByIdAndRestore(id) {
        return await this.model.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
    }

    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = BaseRepository;