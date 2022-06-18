export const validate = (data) => {

    const errors = {};

    if (!data.id.trim()) {
    errors.id = "userID required"
    } else {
        delete errors.id
    }

    if (!data.number) {
        errors.number = "number is required"
    } else if (!typeof data.number) {
        errors.number = "type number"
    } else {
        delete errors.number
    }

    return errors;
}