module.exports = {
    multialMongooseToObject(mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject())
    },
    mongooseToObject(mongoose) {
        return mongoose.toObject()
    },
}
