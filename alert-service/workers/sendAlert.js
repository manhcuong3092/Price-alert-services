const CronJob = require("cron").CronJob;

const alerts = require("../alerts");
const currentPrice = require("../helpers/currentPrice");
const axios = require("axios");
const NOTICE_HOST = process.env.NOTICE_HOST;

var sendAlert = new CronJob("*/5 * * * * *",   // Execute every 5 seconds
    async function () {
        const priceObj = await currentPrice();
        if (priceObj.error) return;
        const pairs = priceObj.data;
        console.log(priceObj)

        alerts.forEach((alert, index) => {
            let message, title, recipient;
            if (
                alert.type == "above" &&
                parseFloat(alert.price) <= parseFloat(pairs[alert.asset])
            ) {
                message = `Price of ${alert.asset} has just exceeded your alert price of ${alert.price} USD.
      Current price is ${pairs[alert.asset]} USD.`;
                title = `${alert.asset} is up!`;
                recipient = alert.email;

                console.log(message);
                axios.post(`${NOTICE_HOST}/notice-sender`, {
                    email: recipient, message, title
                });

                alerts.splice(index, 1)  // remove the alert once pushed to the queue.

            } else if (
                alert.type == "below" &&
                parseFloat(alert.price) > parseFloat(pairs[alert.asset])
            ) {
                message = `Price of ${alert.asset} fell below your alert price of ${alert.price}.
      Current price is ${pairs[alert.asset]} USD.`;

                recipient = alert.email;
                title = `${alert.asset} is down!`;

                console.log(message);
                axios.post(`${NOTICE_HOST}/notice-sender`, {
                    email: recipient, message, title
                });
                alerts.splice(index, 1)  // remove the alert once pushed to the queue.
            }
        });
    });

sendAlert.start();