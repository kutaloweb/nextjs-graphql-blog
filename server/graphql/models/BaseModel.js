class BaseModel {
    constructor(model, user = null) {
        this.Model = model
        this.user = user
    }
}

module.exports = BaseModel
