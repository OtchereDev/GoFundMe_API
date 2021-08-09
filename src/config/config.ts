

export default {
    saltRounds:parseInt(process.env.saltRounds),
    jwtSecret:process.env.jwtSecret,
    clientId:process.env.ClientID,
    clientSecret:process.env.ClientSecret,
    socialAuthPassword:process.env.jwtSecret
}