const Location = require('../models/locations');

const TYPE_OPTIONS = [
    'hall',
    'church',
    'park',
    'hotel',
    'conference center',
    'banquet hall',
    'other'
];

const RECOMMENDED_FOR_OPTIONS = [
    'wedding',
    'banquet',
    'dance',
    'conference',
    'meeting',
    'party',
    'other'
];

// validation
function validateLocation(body) {
    const errors = [];

    // name
    if (!body.name || body.name.trim().length < 3) {
        errors.push("Name is required and must be at least 3 characters");
    }

    // type
    if (!body.type || !TYPE_OPTIONS.includes(body.type.trim())) {
        errors.push(`Type must be one of: ${TYPE_OPTIONS.join(', ')}`);
    }

    // address
    if (!body.address || body.address.trim().length < 3) {
        errors.push("Address is required and must be at least 3 characters.");
    }

    // city
    if (!body.city || body.city.trim().length < 2) {
        errors.push("City is required.");
    }

    // state or province
    if (!body.stateOrProvince || body.stateOrProvince.trim().length < 2) {
        errors.push("stateOrProvince is required.");
    }

    // country
    if (!body.country || body.country.trim().length < 2) {
        errors.push("Country is required.");
    }
    
    if (Array.isArray(body.recommendedFor)) {
        const invalid = body.recommendedFor.filter(
            (item) => !RECOMMENDED_FOR_OPTIONS.includes(item)
        );
        if (invalid.length > 0) {
            errors.push(
                `recommendedFor contains invalid values: ${invalid.join(', ')}. Allowed: ${RECOMMENDED_FOR_OPTIONS.join(', ')}`
            );
        }
    }

    return errors;
}

// GET all locations
const getAll = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).send(locations);
    } catch (err) {
        console.error("Error in getAll:", err);
        res.status(500).send({ error: err.message });
    }
};

// GET one location by ID
const getOne = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) return res.status(404).send({ message: 'Location not found' });
        res.status(200).send(location);
    } catch (err) {        
        if (err.name === 'CastError') {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        
        console.error('Error in getOne:', err);
        res.status(500).send({ error: 'Server error' });
    }
};


// CREATE a location
const createOne = async (req, res) => {
    console.log('Incoming location body:', req.body); 

    // Custom validation
    const errors = validateLocation(req.body);
    if (errors.length > 0) {
        return res.status(400).send({ message: "Validation failed", errors });
    }

    try {
        const newLocation = await Location.create({
            name: req.body.name?.trim(),
            type: req.body.type?.trim(),
            address: req.body.address?.trim(),
            city: req.body.city?.trim(),
            stateOrProvince: req.body.stateOrProvince?.trim(),
            country: req.body.country?.trim(),
            recommendedFor: req.body.recommendedFor || []
        });

        res.status(201).send(newLocation);
    } catch (err) {
        console.error('Error creating location (DB validation):', err);

        if (err.name === "ValidationError") {
            return res.status(400).send({ message: "Database validation error", error: err.message });
        }

        res.status(500).send({ error: "Server error" });
    }
};

// UPDATE a location
const updateOne = async (req, res) => {
    // Run the same validation as POST
    const errors = validateLocation(req.body);
    if (errors.length > 0) {
        return res.status(400).send({ message: "Validation failed", errors });
    }

    try {
        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name?.trim(),
                type: req.body.type?.trim(),
                address: req.body.address?.trim(),
                city: req.body.city?.trim(),
                stateOrProvince: req.body.stateOrProvince?.trim(),
                country: req.body.country?.trim(),
                recommendedFor: req.body.recommendedFor || []
            },
            {
                new: true,
                runValidators: true, 
            }
        );

        if (!updatedLocation) {
            return res.status(404).send({ message: 'Location not found' });
        }

        res.status(200).send(updatedLocation);
    } catch (err) {
        console.error('Error updating location:', err);

        if (err.name === "ValidationError") {
            return res.status(400).send({ message: "Database validation error", error: err.message });
        }

        if (err.name === "CastError") {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        res.status(500).send({ error: "Server error" });
    }
};

// DELETE a location
const deleteOne = async (req, res) => {
    try {
        const result = await Location.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).send({ message: 'Location not found' });

        res.sendStatus(204);
    } catch (err) {
        console.error("Error deleting location:", err);

        if (err.name === "CastError") {
            return res.status(400).send({ message: "Invalid ID format" });
        }

        res.status(500).send({ error: "Server error" });
    }
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
};