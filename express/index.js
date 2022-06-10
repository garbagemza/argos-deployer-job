const express = require('express')
const expressWrapper = require('./express')

module.exports = (options) => expressWrapper(express, options)
