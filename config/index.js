var config = {};
config.devo = {
    "MongoDb": "mongodb+srv://root:12340000@cluster0-odyvt.mongodb.net/test?retryWrites=true&w=majority",
    "PriceList": {
        "PVR": {
            "SUV":
            {
                "Minute": 20,
                "Hour": 100,
                "Day": 500,
                "Month": 1000
            },
            "HatchBack": {
                "Minute": 15,
                "Hour": 80,
                "Day": 400,
                "Month": 800
            },
            "TwoWheeler": {
                "Minute": 10,
                "Hour": 50,
                "Day": 200,
                "Month": 500
            }
        },
        "INOX": {
            "SUV":
            {
                "Minute": 20,
                "Hour": 100,
                "Day": 500,
                "Month": 1000
            },
            "HatchBack": {
                "Minute": 15,
                "Hour": 80,
                "Day": 400,
                "Month": 800
            },
            "TwoWheeler": {
                "Minute": 10,
                "Hour": 50,
                "Day": 200,
                "Month": 500
            }
        }
    }
}

module.exports = config;