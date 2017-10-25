const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');
// const moment = require('moment');

module.exports = {
  // mongoDB role authenticate
  mongoAuth: {
    auth: {
      authdb: 'admin'
    }
  },

  dataProduct: (reqBody, quantity = 0) => {
    let Obj = {
      name: reqBody.name,
      url: reqBody.url,
      price: reqBody.price,
      stock: reqBody.stock,
      info: reqBody.info
    }

    return Obj
  },

  dataUser: (reqBody, password, secret) => {
    let Obj = {
      username: reqBody.username,
      password: password,
      role: "user",
      secret: secret,
      email: reqBody.email,
      phone: reqBody.phone
    }

    return Obj
  },

  dataTransaction: (reqBody, user) => {
    let Obj = {
      user: user,
      product: reqBody.product,
      quantity: reqBody.quantity,
      checkout_date: new Date(),
      totalprice: reqBody.totalprice
    }

    return Obj
  },

  secretGenerate: () => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let secret = ""
    for (let i = 0; i < 6; i++) {
      secret += str[Math.floor(Math.random()*62)]
    }

    return secret;
  },

  secretHash: (key, password) => {
    const hash = crypto.createHmac('md5', key).update(password).digest('hex');

    return hash;
  },

  authentication: (input) => {
    let token = jwt.sign({
      id: input._id,
      username: input.username
    }, 'hacktiv8');

    return token
  },

  getUserId: (input) => {
    let decode = jwtDecode(input)

    decode = decode.id

    return decode
  }

  // countFine: (in_date, due_date) => {
  //   let fine = 0
  //   let indateNum = moment(in_date).format('YYYYMMD')
  //   let duedateNum = moment(due_date).format('YYYYMMD')
  //   let hariDenda = indateNum - duedateNum
  //
  //   if (hariDenda > 0) {
  //     fine = hariDenda * 1000
  //   }
  //
  //   return fine
  // }
}
