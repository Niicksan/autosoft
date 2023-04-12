const { getVehicleById } = require("../services/vehicleService");
const { parseError } = require("../utils/errorParser");


module.exports = () => async (req, res, next) => {
    try {
        res.locals.vehicle = await getVehicleById(req.params.vehicleId);

        if (global.vehicle === null) {
            throw new Error("Item doesn't exist");
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