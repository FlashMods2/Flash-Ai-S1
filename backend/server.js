const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

let keys = JSON.parse(fs.readFileSync("data.json"));

app.post("/verify-key", (req, res) => {
    let { key, deviceId } = req.body;
    let user = keys.find(k => k.key === key);

    if (user) {
        if (user.deviceId && user.deviceId !== deviceId) {
            return res.json({ success: false, message: "Key already used on another device!" });
        }
        user.deviceId = deviceId;
        fs.writeFileSync("data.json", JSON.stringify(keys, null, 2));
        res.json({ success: true });
    } else {
        res.json({ success: false, message: "Invalid Key!" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
