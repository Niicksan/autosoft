const { getVehicleById } = require("../services/vehicleService");
const { getServiceById } = require("../services/repairService");
const { parseError } = require("../utils/errorParser");


module.exports = (type) => async (req, res, next) => {
    try {
        if (type = 'vehicle') {
            res.locals.vehicle = await getVehicleById(req.params.id);

            if (res.locals.vehicle === null) {
                throw new Error("Item doesn't exist");
            }
        }

        if (type = 'service') {
            res.locals.service = await getServiceById(req.params.id);

            if (res.locals.service === null) {
                throw new Error("Item doesn't exist");
            }
        }
    } catch (error) {
        const message = parseError(error);
        console.log(message);
        res.status(404).json({
            messageEn: "Item doesn't exist",
            messageBg: "Несъществуващ елемент"
        });
    }

    next();
};