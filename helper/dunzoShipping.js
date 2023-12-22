const axios = require('axios')

const getToken = async (data) => {
    const client_id = process.env.DUNZO_API_KEY;
    const client_secret = process.env.DUNZO_API_SECRET;

    await axios({
        method: 'get',
        url: `https://api.dunzo.in/api/v1/token`,
        headers: { "Accept": 'application/json', "Content-Type": "application/json","client-id":client_id,"client-secret":client_secret }
    })
        .then(async function (response) {
             console.log(response)
        }
    ).catch(err => {
            console.log(err)
        })

}

const getDunzoFee = async (pickup, drop) => {
   
    const pickupinfo = [{
        lat: pickup.lat,
        lng: pickup.lng,
        refrence_id : 'random'
    }]
    const dropinfo = [{
           lat: drop.lat,
        lng: drop.lng,
        refrence_id : 'random'
    }]
     await axios({
        method: 'POST',
        url: `https://api.dunzo.in/api/v2/quote`,
        data: { pickup_details: pickupinfo, drop_details: dropinfo },
        headers: {"Authorization":client_secret , "Accept-Language": "en-US", "Accept": 'application/json', "Content-Type": "application/json","client-id":client_id,}
    })
        .then(async function (response) {
             console.log(response)
        }
    ).catch(err => {
            console.log(err)
    })
    
}

const createDunzoShipping = async (data) => {
    

}

const cancelDunzoShipping = async (data) => {
   
    await axios({
        method: 'post',
        url: 'https://api.dunzo.in/api/v1/tasks/' + task_id + '/_cancel',
        data : [{cancellation_reason:'change mind'}],
        headers: {"Authorization":client_secret , "Accept-Language": "en-US", "Accept": 'application/json', "Content-Type": "application/json","client-id":client_id,}
    })
        .then(async function (response) {
             console.log(response)
        }
    ).catch(err => {
            console.log(err)
    })
    
}
const getDunzoStatus = async (data) => {
    
     await axios({
        method: 'get',
        url: "https://api.dunzo.in/api/v1/tasks/"+task+"/status",
        headers: {"Authorization":client_secret , "Accept-Language": "en-US", "Accept": 'application/json', "Content-Type": "application/json","client-id":client_id,}
    })
        .then(async function (response) {
             console.log(response)
        }
    ).catch(err => {
            console.log(err)
    })
    
}

module.exports = {
    getToken,
    getDunzoFee,
    createDunzoShipping,
    cancelDunzoShipping,
    getDunzoStatus
}