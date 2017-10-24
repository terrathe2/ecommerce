const User = require('../model/users')
const helper = require('../helper/helper')

module.exports = {
  findAll: (req, res) => {
    User.find().sort('username').then((rowsUser) => {
      res.json({
        message: "Tampil Semua Data User",
        data: rowsUser
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  findOne: (req, res) => {
    User.findOne({_id: req.params.id}).then((rowUser) => {
      if (rowUser) {
        res.json({
          message: "Tampil Satu Data User",
          data: rowUser
        })
      } else {
        res.json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    let secret = helper.secretGenerate()
    let password = helper.secretHash(secret, req.body.password)
    User(helper.dataUser(req.body, password)).save().then((rowUserInserted) => {
      res.json({
        message: "Berhasil Memasukan Data",
        data: rowUserInserted
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    let secret = helper.secretGenerate()
    let password = helper.secretHash(secret, req.body.password)
    User.update({_id: req.params.id}, {$set: helper.dataUser(req.body, password)}).then((rowUpdateUser) => {
      // console.log(rowUpdateCustomer);
      if (rowUpdateUser.n != 0) {
        res.json({
          message: "Berhasil Update",
          data: rowUpdateUser
        })
      } else {
        res.json({
          message: "Data tidak ditemukan"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  delete: (req, res) => {
    User.remove({_id: req.params.id}).then((rowDeleteUser) => {
      if (rowDeleteUser.result.n != 0) {
        res.json({
          message: "Berhasil Hapus",
          data: rowDeleteUser
        })
      } else {
        res.json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  }
}