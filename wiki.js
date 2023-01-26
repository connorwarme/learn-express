// learning about express.Router

const express = require('express')
const router = express.Router()

// home page route
router.get("/", (req, res) => {
    res.send("Wiki home page")
})

// about page route
router.get("/about", (req, res) => {
    res.send("About this wiki")
})

module.exports = router