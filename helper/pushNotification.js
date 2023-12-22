 const FCM =  require('fcm-node');
    var fcm = new FCM(process.env.FCM_SERVER_KEY);
const sendNotification = async (devicetoken, title, body) => {

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: devicetoken, 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: title, 
            body: body 
        },
        
        // data: {  //you can send only notification or only data(or include both)
        //     my_key: 'my value',
        //     my_another_key: 'my another value'
        // }
    };
   
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!", err);
            return err;
        } else {
            console.log("Successfully sent with response: ", response);
            return response ;
        }
    });
  
};

module.exports = {
    sendNotification,
 
}
