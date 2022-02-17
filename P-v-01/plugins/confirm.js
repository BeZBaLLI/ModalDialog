$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            titel: options.titel,
            closable: false,
            content: options.content,
            width: "400px",
            onClose() {
                modal.destroy()
            },
            footerBtn: [
                {
                    text: "Cancel",
                    type: "secondary",
                    handler() {
                        modal.close();
                        reject()
                    }
                },
                {
                    text: "Delete",
                    type: "danger",
                    handler() {
                        modal.close();
                        resolve()
                    }
                }
            ],
        })

        modal.open()
    })
}