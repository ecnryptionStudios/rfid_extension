namespace rfid {
    const CHANNEL = "rfid"

    function sendJSON(json: any) {
        const msg = JSON.stringify(json)
        const buf = Buffer.fromUTF8(msg);
        control.simmessages.send(CHANNEL, buf)
    }

    let onTapHandler: () => void = () => {}

    control.simmessages.onReceived(CHANNEL, function(buf: Buffer) {
        const json = JSON.parse(buf.toString());
        if (json.action == "tap") {
            onTapHandler()
        } else if (json.action == "readResult") {
            lastReadData = json.data || "";
        }
    })

    let lastReadData = ""

    /**
     * Reads the last RFID data.
     */
    //% block
    export function read(): string {
        sendJSON({ action: "read" })
        return lastReadData
    }

    /**
     * Writes string data to the RFID tag.
     */
    //% block
    export function write(data: string) {
        sendJSON({ action: "write", data })
    }

    /**
     * Runs a function when an RFID tag is tapped.
     */
    //% block
    export function onTap(handler: () => void) {
        onTapHandler = handler
    }
}
