/**
 * This will be loaded before starting the simulator.
 * If you wish to add custom javascript, 
 * ** make sure to add this line to pxt.json**
 * 
 *      "disableTargetTemplateFiles": true
 * 
 * otherwise MakeCode will override your changes.
 * 
 * To register a constrol simmessages, use addSimMessageHandler
 */
addSimMessageHandler("rfid", (data) => {
    switch (data.action) {
        case "write":
            console.log("Writing to tag:", data.data)
            window.localStorage.setItem("rfid_data", data.data)
            break

        case "read":
            const stored = window.localStorage.getItem("rfid_data") || ""
            const msg = JSON.stringify({
                action: "readResult",
                data: stored
            })
            const buf = pxsim.BufferMethods.createBufferFromUTF8(msg)
            pxsim.control.simmessages.send("rfid", buf)
            break
    }
})
