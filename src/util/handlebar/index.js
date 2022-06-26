module.exports = {
    multipleMongooseToObject(mongooses) {
        return Array.isArray(mongooses)
            ? mongooses.map((mongoose) => mongoose.toObject())
            : mongooses
    },
    mongooseToObject(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    },
}
