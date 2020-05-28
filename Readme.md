`npm install`
`npm start`

# POST: /api/area:
    * it will create a area for parking
## body:
    {
        area: { type: String, required: true },
        available: { type: Number, default: 1 },
        lotName: { type: String, enum: { values: ["PVR", "INOX"], message: "lotName must be PVR,INOX" }, required: true },
        type: { type: String, enum: { values: ["SUV", "HatchBack", "TwoWheeler"], message: "type must be SUV, HatchBack,TwoWheeler" }, required: true }
    }
# POST: /api/parking:
    * to create a new parking of vehicle
## body:
    {
        vehicle_number: { type: String, required: true },
        type: { type: String, enum: { values: ["SUV", "HatchBack", "TwoWheeler"], message: "type must be SUV, HatchBack,TwoWheeler" }, required: true },
        lotName: { type: String, enum: { values: ["PVR", "INOX"], message: "lotName must be PVR,INOX" }, required: true },
        area: { type: Number, required: true }
    }

# GET: /api/end/:parking_id (parking_id is the id you get when you create a parking or you can fetch from vehicle details using /api/ vehicle/{vehicle_number})
    * return amount and time spent

# Get: /api/vehicle/:vehicle_id
    * return vehicle details